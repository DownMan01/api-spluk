
import { RedocStandalone } from 'redoc';

export default function ApiDocs() {
  return (
    <RedocStandalone
      specUrl="https://api.spluk.app/openapi.yaml"
      options={{
        theme: { colors: { primary: { main: '#2563eb' } } },
        hideDownloadButton: false,
        expandResponses: '200,201',
      }}
    />
  );
}