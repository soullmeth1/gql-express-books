import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { DELETE_BOOK, FETCH_BOOK } from '../grqphql/query';
import BookDetail from './BookDetail';
import styled from 'styled-components';
import { GrFormClose } from 'react-icons/gr';

const BookListContainer = styled.div`
  flex: 1;
  padding: 2rem;
  h1 {
    margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    li {
      padding: 1rem;
      border: 1px solid var(--primary-color);
      position: relative;
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
      &:hover span {
        display: block;
      }
      span {
        background-color: white;
        border: 1px solid red;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        position: absolute;
        border-radius: 50%;
        top: -15px;
        right: -15px;
        display: none;
        &:hover {
          background-color: red;
        }
        &:hover svg > path {
          stroke: white !important;
        }
      }
    }
  }
`;

function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, data } = useQuery(FETCH_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);

  function handleDelete(id) {
    deleteBook({
      variables: { id: selected || id },
      refetchQueries: [{ query: FETCH_BOOK }],
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <BookListContainer>
        <h1>Books Collection</h1>
        <ul>
          {loading && !data ? (
            <li>Loading...</li>
          ) : (
            data.books.map((book) => (
              <li
                key={book.id}
                onClick={() => setSelected(book.id)}
                style={{ cursor: 'pointer' }}
              >
                {book.name}
                <span onClick={() => handleDelete(book.id)}>
                  <GrFormClose />
                </span>
              </li>
            ))
          )}
        </ul>
      </BookListContainer>
      <BookDetail bookId={selected} />
    </>
  );
}

export default BookList;
