const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const schema = require('./graphql/schema');
const rootValue = require('./graphql/resolver');

app.use(cors());

app.use((req, res, next) => {
  //   console.log(req);
  next();
});

app.get('/', (req, res) => {
  return res.json({ data: 'hey' });
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log('Something went wrong with database!');
      throw new Error(err);
    }
    console.log('Connection to database succeeded');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
);
