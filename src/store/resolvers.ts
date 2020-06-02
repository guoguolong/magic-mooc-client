import gql from 'graphql-tag';
// import { ApolloCache } from 'apollo-cache';
// import { Resolvers } from 'apollo-client'
import { FETCH_TOC } from './gql-def'
export const typeDefs = gql`
  type TOC {
    l: Int,
    n: String,
    c: [TOC]
  }

  extend type Query {
    toc: String,
    activeTocHash: String
  }
  extend type ArticleTreeType {
    is_open: Boolean,
    is_active: Boolean
  }

  extend type Mutation {
    updateTOCData(toc: TOC!): void
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
  },
  Mutation: {
    updateTOCData: (_, { toc }, { cache }): void => {
      cache.writeQuery({ query: FETCH_TOC, data: { toc } });
    },
  },
};
