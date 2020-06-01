import gql from 'graphql-tag';
// import { ApolloCache } from 'apollo-cache';
// import { Resolvers } from 'apollo-client'

export const typeDefs = gql`
  extend type ArticleTreeType {
    is_open: Boolean,
    is_active: Boolean
  }
`;

// type ResolverFn = (
//   parent: any, 
//   args: any, 
//   { cache } : { cache: ApolloCache<any> }
// ) => any;

// interface ResolverMap {
//   [field: string]: ResolverFn;
// }

// interface AppResolvers extends Resolvers {
//   Launch: ResolverMap;
//   Mutation: ResolverMap;
// }

export const resolvers = {
  ArticleTreeType: {
    is_open: (articleTree, _, { cache }): boolean => {
      return false;
    },
    is_active: (articleTree, _, { cache }): boolean => {
      return false;
    }
  }
};
