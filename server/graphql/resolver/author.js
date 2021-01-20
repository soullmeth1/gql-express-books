const Book = require('../../models/Book');
const Author = require('../../models/Author');

module.exports = {
  Query: {
    author: async ({ id }) => {
      const result = await Author.findById(id);
      return {
        id: result._id,
        ...result._doc,
        books: async () => await Book.find({ authorname: result.name }),
      };
    },
    authors: async () => {
      const authors = await Author.find();

      const newAu = authors.map(async (val) => {
        const books = await Book.find({ authorname: val.name });
        return {
          id: val._id,
          ...val._doc,
          books,
        };
      });

      return newAu;
    },
  },
  Mutation: {
    addAuthor: async ({ name, age }) => {
      const newAuthor = new Author({
        name,
        age,
      });

      await newAuthor.save();

      const books = await Book.find({ authorname: name });

      return {
        id: newAuthor._id,
        ...newAuthor._doc,
        books: books.length > 0 ? books : [],
      };
    },
  },
};
