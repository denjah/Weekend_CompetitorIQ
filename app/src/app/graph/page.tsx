import React from 'react';
import KnotClient from './KnotClient';
import graphData from '@/data/graph.json';

export default function KnotPage() {
  return <KnotClient graphData={graphData} />;
}
