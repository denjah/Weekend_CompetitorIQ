import React from 'react';
import fs from 'fs';
import path from 'path';
import KnotClient from './KnotClient';

// This is a Server Component. It runs on the server and reads the file using fs,
// completely bypassing Turbopack/Webpack's module resolution for external directories.
export default async function KnotPage() {
  const dataPath = path.join(process.cwd(), '../data/mock/graph.json');
  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  const graphData = JSON.parse(fileContents);

  return <KnotClient graphData={graphData} />;
}
