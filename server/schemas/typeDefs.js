const typeDefs = `

type Book {
    _id: ID,
    authors: [String],
    description: String,
    bookId: String,
    image: String,
    link: String,
    title: String
}

input bookArgs {
    userId: ID,
    authors: [String],
    description: String,
    bookId: String,
    image: String,
    link: String,
    title: String
}

type User {
    _id: ID,
    userName: String,
    email: String,
    password: String,
    savedbooks: [Book]

}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
}

type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(input: bookArgs): User
    removeBook(bookId: String!): User

}

`;

module.exports = typeDefs;