import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(), // Caching for optimized performance
});

export default client;
