const { User } = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {

    Query: {

        getSingleUser: async (parent, { user, params }) => {
            const foundUser = await User.findOne({
              $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
            });
      
            if (!foundUser) {
              throw new Error('Cannot find a user with this id!');
            }
      
            return foundUser;
          },

    },

    Mutation: {

    }

}

module.exports = resolvers;