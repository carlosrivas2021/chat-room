import { User } from '../models/User';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

const resolvers = (pubSub) => {
  return {
    Query: {
      searchUsers: async (parent, args: { userId: string }) => {
        const { userId } = args;
        try {
          return User.find({ _id: { $ne: new ObjectId(userId) } });
        } catch (error: any) {
          console.log('error', error);
          throw new GraphQLError(error?.message);
        }
      },
    },
    Mutation: {
      createUsername: async (parent, args: { username: string }) => {
        const userNew = new User(args);
        const user = await User.findOne({ username: args.username });

        if (user) {
          return user;
        }

        pubSub.publish('USER_NEW', userNew);
        return userNew.save();
      },
    },
    Subscription: {
      userNew: {
        subscribe: () => pubSub.subscribe('USER_NEW'),
        resolve: (payload) => payload,
      },
    },
  };
};

export default resolvers;
