/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from '@/styles/knot.module.css';

interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  color: string;
  size: number;
  rating?: number;
  price?: number;
  group: number;
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
  type: string;
  strength: number;
  label?: string;
}

interface KnotGraphProps {
  data: {
    nodes: NodeData[];
    links: LinkData[];
  };
  onNodeSelect: (node: NodeData | null) => void;
}

export default function KnotGraph({ data, onNodeSelect }: KnotGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !data || data.nodes.length === 0) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width)
       .attr("height", height)
       .attr("viewBox", [0, 0, width, height]);

    // Zoom setup
    const zoomGroup = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, any>()
      .scaleExtent([0.2, 4])
      .on("zoom", (e) => {
        zoomGroup.attr("transform", e.transform);
      });
    svg.call(zoom);

    // Initial zoom configuration (center)
    const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8);
    svg.call(zoom.transform, initialTransform);

    // Deep copy data for simulation
    const nodes = data.nodes.map(d => ({ ...d })) as NodeData[];
    const links = data.links.map(d => ({ ...d })) as LinkData[];

    // Force Simulation
    const simulation = d3.forceSimulation<NodeData>(nodes)
      .force("link", d3.forceLink<NodeData, LinkData>(links)
        .id(d => d.id)
        .distance(120)
        .strength(d => d.strength)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("collide", d3.forceCollide<NodeData>().radius(d => d.size / 2 + 20).iterations(2))
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05));

    // Links
    const link = zoomGroup.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => {
        if (d.type === 'price_competition') return "var(--status-warning)";
        if (d.type === 'direct_substitution') return "var(--status-critical)";
        if (d.type === 'shared_platform') return "var(--border-subtle)";
        return "var(--border-default)";
      })
      .attr("stroke-width", d => {
        if (d.type === 'price_competition') return 3;
        if (d.type === 'direct_substitution') return 2;
        if (d.type === 'shared_platform') return 1;
        return 2;
      })
      .attr("stroke-dasharray", d => d.type === 'shared_platform' ? "4,4" : "none");

    // Nodes
    const node = zoomGroup.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, NodeData>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Node shapes based on type
    node.each(function(d) {
      const g = d3.select(this);
      
      if (d.type === 'platform') {
        g.append("rect")
          .attr("width", d.size)
          .attr("height", d.size)
          .attr("x", -d.size / 2)
          .attr("y", -d.size / 2)
          .attr("rx", 8)
          .attr("fill", "var(--bg-surface-alt)")
          .attr("stroke", d.color)
          .attr("stroke-width", 2);
      } else if (d.type === 'audience') {
        // Hexagon
        const hexSize = d.size / 2;
        const hexPoints = [
          [0, -hexSize],
          [hexSize * 0.866, -hexSize / 2],
          [hexSize * 0.866, hexSize / 2],
          [0, hexSize],
          [-hexSize * 0.866, hexSize / 2],
          [-hexSize * 0.866, -hexSize / 2]
        ].map(p => p.join(",")).join(" ");
        
        g.append("polygon")
          .attr("points", hexPoints)
          .attr("fill", "var(--bg-surface-alt)")
          .attr("stroke", d.color)
          .attr("stroke-width", 2);
      } else {
        // Circles for competitors/self
        g.append("circle")
          .attr("r", d.size / 2)
          .attr("fill", "var(--bg-surface-alt)")
          .attr("stroke", d.color)
          .attr("stroke-width", d.type === 'self' ? 3 : 2)
          .attr("stroke-dasharray", d.type === 'potential' ? "4,4" : "none")
          .style("filter", d.type === 'self' ? "drop-shadow(0 0 10px rgba(1, 87, 164, 0.6))" : "none");
      }

      // Add text label
      g.append("text")
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("y", d.size / 2 + 16)
        .attr("fill", "var(--text-primary)")
        .style("font-family", "Inter, sans-serif")
        .style("font-size", d.type === 'self' ? "14px" : "12px")
        .style("font-weight", d.type === 'self' ? "600" : "500")
        .style("pointer-events", "none");

      if (d.rating && d.price) {
        g.append("text")
          .text(`★ ${d.rating} · ${d.price}₽`)
          .attr("text-anchor", "middle")
          .attr("y", d.size / 2 + 30)
          .attr("fill", "var(--text-secondary)")
          .style("font-family", "IBM Plex Mono, monospace")
          .style("font-size", "10px")
          .style("pointer-events", "none");
      }
    });

    // Tooltip and interactions
    const tooltip = d3.select(tooltipRef.current);

    node.on("mouseover", function(event, d) {
      d3.select(this).style("cursor", "pointer");
      
      // Highlight connections
      link.attr("stroke-opacity", l => (l.source === d || l.target === d) ? 1 : 0.1);
      node.attr("opacity", n => {
        if (n === d) return 1;
        return links.some(l => (l.source === d && l.target === n) || (l.target === d && l.source === n)) ? 1 : 0.3;
      });

      tooltip.style("opacity", 1)
        .html(`
          <div class="${styles.tooltipTitle}">${d.name}</div>
          <div class="${styles.tooltipMeta}">${d.rating ? `★ ${d.rating}` : ''} ${d.price ? `· ${d.price}₽` : ''}</div>
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", function() {
      // Restore opacity if no node selected
      if (!selectedNodeId) {
        link.attr("stroke-opacity", 1);
        node.attr("opacity", 1);
      } else {
        // Keep selected node highlighted
        highlightNode(selectedNodeId);
      }
      tooltip.style("opacity", 0);
    })
    .on("click", function(event, d) {
      setSelectedNodeId(d.id);
      onNodeSelect(d);
      highlightNode(d.id);
    });

    // Background click to deselect
    svg.on("click", (event) => {
      if (event.target.tagName === 'svg') {
        setSelectedNodeId(null);
        onNodeSelect(null);
        link.attr("stroke-opacity", 1);
        node.attr("opacity", 1);
        node.selectAll("*").style("filter", n => (n as NodeData).type === 'self' ? "drop-shadow(0 0 10px rgba(1, 87, 164, 0.6))" : "none");
      }
    });

    function highlightNode(id: string) {
      const d = nodes.find(n => n.id === id);
      if (!d) return;

      node.selectAll("*").style("filter", "none");
      node.filter(n => n.id === id).selectAll("*")
          .style("filter", `drop-shadow(0 0 12px ${d.color})`);

      link.attr("stroke-opacity", l => ((l.source as NodeData).id === id || (l.target as NodeData).id === id) ? 1 : 0.15);
      node.attr("opacity", n => {
        if (n.id === id) return 1;
        return links.some(l => ((l.source as NodeData).id === id && (l.target as NodeData).id === n.id) || 
                               ((l.target as NodeData).id === id && (l.source as NodeData).id === n.id)) ? 1 : 0.15;
      });
    }

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as NodeData).x || 0)
        .attr("y1", d => (d.source as NodeData).y || 0)
        .attr("x2", d => (d.target as NodeData).x || 0)
        .attr("y2", d => (d.target as NodeData).y || 0);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: NodeData) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      svg.attr("width", width).attr("height", height);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      simulation.stop();
    };
  }, [data, onNodeSelect, selectedNodeId]);

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <svg ref={svgRef} className={styles.graphContainer} />
      <div ref={tooltipRef} className={styles.tooltip} />
      
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.toolbarBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Поиск узла
        </button>
        <button className={styles.toolbarBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button className={styles.toolbarBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <div style={{width: 1, height: 16, background: 'var(--border-subtle)', margin: '0 8px'}} />
        <button className={styles.toolbarBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Фильтр
        </button>
      </div>
    </div>
  );
}



