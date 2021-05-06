const mongoose = require('mongoose');
const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const path = require('path');

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  server.applyMiddleware({ app });
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }
  
  const port = process.env.PORT || 5000;
  
  const users = require("./routes/api/users");
  const thoughts = require("./routes/api/thoughts");
  
  
  mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
  
  app.use(passport.initialize());
  require('./config/passport')(passport);
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use("/api/users", users);
  app.use("/api/thoughts", thoughts);
  
  // app.listen(port, () => console.log(`Server is running on port ${port}`));
  await new Promise(resolve => app.listen({ port: port}, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return { server, app };
}