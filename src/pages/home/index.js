import AddBook from '../../components/AddBook';
import BookList from '../../components/BookList';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  @media (max-width: 550px) {
    display: grid;
  }
`;

function index() {
  return (
    <AppContainer>
      <BookList />
      <AddBook />
    </AppContainer>
  );
}

export default index;
