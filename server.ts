import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import helmet from 'helmet';

import ProjectResolver from './resolvers/ProjectResolver';
import config from './config';

async function main() {
  const app = express();
  const {
    PORT,
    serverPath,
  } = config;

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.get('*', (req, res, next) => {
    if (!req.path.includes('api')) {
      res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
          res.status(500).send(err);
        }
      });
    } else {
      next();
    }
  });

  await createConnection();
  const schema = await buildSchema({
    resolvers: [ProjectResolver],
  });
  const server = new ApolloServer({
    schema,
    playground: true,
  });
  server.applyMiddleware({
    app,
    path: serverPath,
  });
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 GraphQL Server ready at path ${server.graphqlPath} in port ${PORT}`);
  });
}

main();
