import { registerRootComponent } from 'expo';
import Root from './app/index';
// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  return <Root />;
  // const ctx = require.context('./app');
  // return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
