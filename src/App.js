import ApolloProviderWrapper from './context/ApolloProvider';
import Home from './pages/home';

function App() {
  return (
    <ApolloProviderWrapper>
      <Home />
    </ApolloProviderWrapper>
  );
}

export default App;
