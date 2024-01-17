const { User, Book } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {

        user: async (parent, { userId }) => {
            return User.findOne({ _id:userId });
          },



    },

    Mutation: {

        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
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
      
            const token = signToken(profile);
            return { token, user };
          },

          saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
              return User.findOneAndUpdate(
                { _id: userId },
                {
                  $addToSet: { savedBooks: book },
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
            }
            throw AuthenticationError;
          },
    }

}

module.exports = resolvers;