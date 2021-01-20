import { gql } from '@apollo/client';

export const FETCH_AUTHOR = gql`
  query authors {
    authors {
      id
      name
      age
      books {
        id
        name
        genre
      }
    }
  }
`;

export const FETCH_BOOK = gql`
  query books {
    books {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;

export const GET_BOOK = gql`
  query book($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorname: String!) {
    addBook(name: $name, genre: $genre, authorname: $authorname) {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      name
      genre
    }
  }
`;
