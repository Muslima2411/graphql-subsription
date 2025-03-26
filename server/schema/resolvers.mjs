import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
    Query: {
      placeholder: () => 
        'This is a placeholder query that returns a string.',
    },


    Mutation:{
      kunUzAdmin: (_, args)=>{
        pubsub.publish("NEWS_CREATED", {kunUz:{title: args.title, desc: args.desc}});
        return "successfully created";
      }
    },


    Subscription: {
      kunUz: {
        subscribe: () => pubsub.asyncIterator("NEWS_CREATED"),
      },
  
    },
  };