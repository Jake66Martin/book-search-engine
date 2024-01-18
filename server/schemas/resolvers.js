const { User } = require("../models/index");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      const { authors, description, bookId, image, title } = input;
      if (context.user) {
        const bookSaved = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedbooks: {authors, description, bookId, image, title} },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return bookSaved
      }
      throw AuthenticationError;
    },


    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const bookRemoved = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedbooks: {bookId} } },
          { new: true }
        );

        return bookRemoved
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
