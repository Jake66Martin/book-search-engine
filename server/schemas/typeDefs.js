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



`;

module.exports = typeDefs;