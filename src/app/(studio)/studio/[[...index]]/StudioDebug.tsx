'use client';

import React from 'react';
import { NextStudio } from 'next-sanity/studio';
import studioConfig from '@/sanity.config';

class StudioErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { err?: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { err: undefined };
  }
  static getDerivedStateFromError(err: any) {
    return { err };
  }
  render() {
    if (this.state.err) {
      const err: any = this.state.err;
      const problems = Array.isArray(err?.problems) ? err.problems : null;
      return (
        <div style={{ padding: 16, color: '#fff', background: '#111', fontFamily: 'ui-monospace, Menlo, Monaco, Consolas, monospace' }}>
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>Sanity SchemaError</h1>
          {problems && (
            <>
              <h2 style={{ fontSize: 16 }}>problems[]</h2>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(problems, null, 2)}</pre>
            </>
          )}
          <h2 style={{ fontSize: 16, marginTop: 16 }}>error (safe)</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(err, Object.getOwnPropertyNames(err || {}), 2)}</pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}

export default function StudioDebug() {
  return (
    <StudioErrorBoundary>
      <NextStudio config={studioConfig} />
    </StudioErrorBoundary>
  );
}
