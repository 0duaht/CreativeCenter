import Reactotron, { trackGlobalErrors, openInEditor } from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';

Reactotron
  .configure()
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(apisaucePlugin())
  .connect();

Reactotron.clear();