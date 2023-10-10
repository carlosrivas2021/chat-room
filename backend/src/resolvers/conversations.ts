import { User } from '../models/User';
import { Conversation } from '../models/Conversation';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

const resolvers = (pubSub) => {
  return {
    Query: {
      conversations: async (parent, args) => {
        const { username: searchedUsername } = args;
        try {
          return Conversation.find({
            members: { $in: [searchedUsername] },
          }).populate('members');
        } catch (error: any) {
          console.log('error', error);
          throw new GraphQLError(error?.message);
        }
      },
    },
    Mutation: {
      createConversation: async (parent, args) => {
        const { participantIds } = args;

        const conversationGet = await Conversation.findOne({
          members: {
            $all: [
              new ObjectId(participantIds[0]),
              new ObjectId(participantIds[1]),
            ],
          },
        }).populate('members');

        if (conversationGet) {
          return conversationGet;
        }

        const member1 = await User.findById({ _id: participantIds[0] });
        const member2 = await User.findById({ _id: participantIds[1] });
        const conversation = new Conversation({
          members: [member1, member2],
        });
        conversation.save();
        return conversation;
      },
    },
  };
};

export default resolvers;
