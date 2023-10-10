import { createPubSub } from 'graphql-yoga';
// const pubSub = createPubSub();

export class PubSub {
  pubSub;

  initOrRecover() {
    if (!this?.pubSub) {
      this.pubSub = createPubSub();
    }
    return this.pubSub;
  }
}
