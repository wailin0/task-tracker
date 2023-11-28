/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import createApolloClient from './src/graphql/apolloClient';
import {ApolloProvider} from '@apollo/client';

const apolloClient = createApolloClient();

const Index = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App/>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => Index);
