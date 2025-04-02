import React, { ReactNode } from "react";
import {
  split,
  HttpLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

export default function ProviderApollo({ children }: { children: ReactNode }) {
  const wsLink = new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/subscriptions",
    })
  );

  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
