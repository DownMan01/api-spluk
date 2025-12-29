// app/docs/page.tsx
import { RedocStandalone } from 'redoc';

export default function ApiDocs() {
  return (
    <RedocStandalone
      specUrl="/openapi.yaml"
      options={{
        theme: { colors: { primary: { main: '#8b5cf6' } } },
        hideDownloadButton: false,
        expandResponses: "200,201",
      }}
    />
  );
}