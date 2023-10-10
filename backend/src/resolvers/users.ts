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
        const newUser = new User(args);
        const user = await User.findOne({ username: args.username });
        if (user) {
          return user;
        }

        return newUser.save();
      },
    },
    // Subscription: {
    //   userNew: {
    //     // subscribe to the randomNumber event
    //     subscribe: () => pubSub.subscribe('userNew'),
    //     resolve: (payload) => payload,
    //   },
    // },
  };
};

export default resolvers;
