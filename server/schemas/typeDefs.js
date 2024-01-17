const typeDefs = `

type Book {
    _id: ID,
    authors: String,
    description: String,
    bookId: String,
    image: String,
    link: String,
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
    profile: Profile
  }

type Query {
    user: User
}

type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(userId: ID!, book: String!): User
    removeBook(book: String!): User

}

`;

module.exports = typeDefs;