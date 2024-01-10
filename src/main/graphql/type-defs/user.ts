import { gql } from "apollo-server-express";

export default gql`
scalar DateTime

  extend type Query {
    AllUsers: [User!]!
  }
  extend type Mutation {
    CreateUser(input: CreateUserInput!): User!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    account: Account
    createdAt: DateTime
  }
  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }
  type Account {
    id: ID!
    user: User!
    userId: String!
    balance: Int!
    creditedTransactions: [Transaction!]!
    debitedTransactions: [Transaction!]!
  }
  
  type Transaction {
    id: ID!
    debitedAccount: Account!
    debitedAccountId: String!
    creditedAccount: Account!
    creditedAccountId: String!
    value: Int!
  }
`;
