export const typeDefs = `#graphql
  type Query {
    placeholder: String
  }

  type Mutation {
    kunUzAdmin(input: NewsInput!): String
  }

  type Subscription {
    kunUz: News
  }

  input NewsInput {
    title: String
    desc: String
  }

  type News {
    title: String
    desc: String
  }

`;