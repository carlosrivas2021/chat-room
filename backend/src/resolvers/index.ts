import { merge } from 'lodash';
import userResolvers from './users';
import messagesResolvers from './messages';
import conversationsResolvers from './conversations';

const resolvers = (pubSub) => {
  return merge(
    {},
    userResolvers(pubSub),
    messagesResolvers(pubSub),
    conversationsResolvers(pubSub)
  );
};

export default resolvers;
