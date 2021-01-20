const Book = require('../../models/Book');
const Author = require('../../models/Author');

module.exports = {
  Query: {
    book: async ({ id }) => {
      const bookResult = await Book.findOne({ _id: id });
      const authorResult = await Author.findOne({
        name: bookResult.authorname,
      });

      return {
        id: bookResult._id,
        ...bookResult._doc,
        author: authorResult,
      };
    },
    books: async () => {
      const booksResult = await Book.find();
      // const authorResult = await Author.findOne({name: booksResult.name})

      const newRes = booksResult.map(async (book) => {
        const author = await Author.findOne({ name: book.authorname });
        return {
          id: book._id,
          ...book._doc,
          author,
        };
      });

      return [...newRes];
    },
  },
  Mutation: {
    addBook: async ({ name, genre, authorname }) => {
      const newBook = new Book({
        name,
        genre,
        authorname,
      });

      const author = await Author.findOne({ name: authorname });

      await newBook.save();

      return {
        id: newBook._id,
        ...newBook._doc,
        author: author || { name: authorname },
      };
    },
    deleteBook: async ({ id }) => {
      const data = await Book.findOne({ _id: id });
      // console.log(data);
      await data.delete();
      // console.log(data);
      return data;
    },
  },
};
