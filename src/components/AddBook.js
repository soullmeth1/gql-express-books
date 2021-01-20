import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { FETCH_AUTHOR, ADD_BOOK, FETCH_BOOK } from '../grqphql/query';
import styled from 'styled-components';

const FormContain = styled.form`
  position: absolute;
  bottom: 0;
  padding: 50px;
  max-width: 400px;
  box-shadow: 1px 1px 5px var(--shadow-color);
  background-color: white;
  @media (max-width: 550px) {
    position: static;
  }
  > * + * {
    margin-top: 10px;
  }
  div {
    display: flex;
    justify-content: space-between;
    label {
      margin-right: 50px;
    }
    input {
      padding: 10px;
      border: 1px solid var(--shadow-color);
    }
    select {
      border: 1px solid var(--shadow-color);
      padding: 10px;
    }
  }
  button {
    padding: 1rem 1.5rem;
    background-color: var(--primary-color);
    border: none;
    color: white;
  }
`;

function AddBook() {
  const [input, setInput] = useState({
    name: '',
    genre: '',
    authorname: '',
  });

  const { loading, data } = useQuery(FETCH_AUTHOR);
  const [AddBook] = useMutation(ADD_BOOK);

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddBook({
      variables: input,
      update(cache, result) {
        const data = cache.readQuery({
          query: FETCH_BOOK,
        });
        cache.writeQuery({
          query: FETCH_BOOK,
          data: { books: [...data.books, result.data.addBook] },
        });
        setInput({
          name: '',
          genre: '',
          authorname: '',
        });
      },
    }).catch((err) => console.log(err));
  };

  return (
    <FormContain onSubmit={handleSubmit}>
      <div>
        <label htmlFor="book">Book Name</label>
        <input
          id="book"
          type="text"
          name="name"
          value={input.name}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          name="genre"
          value={input.genre}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="book">Author</label>
        <select name="authorname" value={input.authorname} onChange={onChange}>
          <option>Select Author</option>
          {!loading &&
            data &&
            data.authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
        </select>
      </div>
      <button type="submit">Add Book</button>
    </FormContain>
  );
}

export default AddBook;
