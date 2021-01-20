const bookResolvers = require('./book');
const authorResolvers = require('./author');

module.exports = {
  ...bookResolvers.Query,
  ...bookResolvers.Mutation,
  ...authorResolvers.Query,
  ...authorResolvers.Mutation,
};
