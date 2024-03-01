import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import storage from "../utils/storage";
import { onError } from "@apollo/client/link/error";
import * as RootNavigation from "../navigations/rootNavigation";

const httpLink = createHttpLink({
  uri: "http://52.74.41.188:8080/v1/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  //clear jwt if expired
  if (graphQLErrors) {
    console.log("[graphQLErrors]", graphQLErrors);
    graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === "invalid-jwt") {
          storage.clearToken();
          alert("Session Expired, Please Login With Your Credentials Again");
          RootNavigation.navigate("Sign Out");
        }
      },
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    alert("network connection problem");
  }
});

const createApolloClient = () => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await storage.getToken();
      if (accessToken) {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`
          },
        };
      } else return {
        headers,
      };
    } catch (e) {
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
