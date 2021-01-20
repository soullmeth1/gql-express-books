import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql',
  uri: 'https://gql-express-books.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderWrapper;
