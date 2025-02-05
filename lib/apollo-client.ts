import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const isTest = process.env.NODE_ENV === "test"; // Detect test mode

const client = new ApolloClient({
  uri: isTest ? undefined : "https://countries.trevorblades.com/", // Disable URI in tests
  cache: new InMemoryCache(),
  link: isTest
    ? undefined
    : new HttpLink({
        uri: "https://countries.trevorblades.com/",
        credentials: "same-origin",
      }),
});

export default client;
