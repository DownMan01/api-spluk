// app/docs/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Redoc with no SSR
const RedocStandalone = dynamic(() => import('redoc').then(mod => mod.RedocStandalone), {
  ssr: false,
  loading: () => <p>Loading API documentation...</p>,
});

export default function ApiDocs() {
  const [specUrl] = useState('/openapi.yaml'); 
  return (
    <div style={{ height: '100vh' }}>
      <RedocStandalone
        specUrl={specUrl}
        options={{
          theme: { colors: { primary: { main: '#8b5cf6' } } },
          hideDownloadButton: false,
          expandResponses: '200,201',
        }}
      />
    </div>
  );
}