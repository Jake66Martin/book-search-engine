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
    authors: [String],
    description: String,
    bookId: String,
    image: String,
    title: String
}

type User {
    _id: ID,
    username: String,
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
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(input: bookArgs): User
    removeBook(bookId: String!): User

}

`;

module.exports = typeDefs;