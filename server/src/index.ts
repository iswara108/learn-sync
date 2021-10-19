import "reflect-metadata";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
// import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { MyResolver } from "./graphql";
import { buildSchema } from "type-graphql";

(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = await buildSchema({ resolvers: [MyResolver] });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app, cors: { origin: "*" } });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();
