import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../grqphql/query';
import styled from 'styled-components';

const BookDetailContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: var(--primary-color);
  h3 {
    color: white;
  }
  p {
    color: white;
    margin: 1rem 0;
  }
`;

function BookDetail(props) {
  const { data, loading } = useQuery(GET_BOOK, {
    variables: { id: props.bookId },
  });

  return (
    <BookDetailContainer>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <h3>Name : {data.book.name}</h3>
          <p>Genre : {data.book.genre}</p>
          <p>Author : {data.book.author.name}</p>
        </div>
      ) : (
        <h3>No Book Selected</h3>
      )}
    </BookDetailContainer>
  );
}

export default BookDetail;
