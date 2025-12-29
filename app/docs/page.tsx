import { RedocStandalone } from 'redoc';

export default function Docs() {
  return <RedocStandalone specUrl="https://api.spluk.app/openapi.yaml" />;
}
