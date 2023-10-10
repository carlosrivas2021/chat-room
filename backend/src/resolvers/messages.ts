import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';

const resolvers = (pubSub) => {
  return {
    Query: {
      messages: async (parent, args, context) => {
        const { conversationId } = args;

        if (!conversationId) {
          throw new GraphQLError('You need a conversationId');
        }
        const conversation = await Conversation.findOne({
          _id: conversationId,
        });

        if (!conversation) {
          throw new GraphQLError('Conversation Not Found');
        }

        try {
          const messages = Message.find({
            conversation: conversation._id,
          })
            .sort({
              createdAt: 1,
            })
            .populate('sender');

          return messages;
        } catch (error: any) {
          console.log('messages error', error);
          throw new GraphQLError(error?.message);
        }
      },
    },
    Mutation: {
      sendMessage: async (parent, args) => {
        const { senderId, conversationId, body } = args;

        const sender = await User.findById(senderId);

        const message = new Message({
          conversation: conversationId,
          sender,
          body,
        });
        await message.save();

        pubSub.publish('MESSAGE_SENT', message);

        return true;
      },
    },
    Subscription: {
      messageSent: {
        subscribe: () => {
          return pubSub.subscribe('MESSAGE_SENT');
        },
        resolve: (payload, args) => {
          return payload.conversation.equals(new ObjectId(args.conversationId))
            ? payload
            : false;
        },
      },
    },
  };
};

export default resolvers;
