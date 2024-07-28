import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ClientPost = {
  __typename?: 'ClientPost';
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClientPost?: Maybe<ClientPost>;
  updateClientPost?: Maybe<ClientPost>;
};


export type MutationCreateClientPostArgs = {
  input: NewClientPost;
};


export type MutationUpdateClientPostArgs = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type NewClientPost = {
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  clientPosts?: Maybe<Array<Maybe<ClientPost>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  postUpdated?: Maybe<ClientPost>;
};

export type GetPostsHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsHomeQuery = { __typename?: 'Query', clientPosts?: Array<{ __typename?: 'ClientPost', id: string, title: string, order: number } | null> | null };

export type UpdateClientPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
}>;


export type UpdateClientPostMutation = { __typename?: 'Mutation', updateClientPost?: { __typename?: 'ClientPost', id: string, order: number } | null };


export const GetPostsHomeDocument = gql`
    query getPostsHome {
  clientPosts {
    id
    title
    order
  }
}
    `;

/**
 * __useGetPostsHomeQuery__
 *
 * To run a query within a React component, call `useGetPostsHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsHomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsHomeQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsHomeQuery, GetPostsHomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsHomeQuery, GetPostsHomeQueryVariables>(GetPostsHomeDocument, options);
      }
export function useGetPostsHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsHomeQuery, GetPostsHomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsHomeQuery, GetPostsHomeQueryVariables>(GetPostsHomeDocument, options);
        }
export function useGetPostsHomeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPostsHomeQuery, GetPostsHomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsHomeQuery, GetPostsHomeQueryVariables>(GetPostsHomeDocument, options);
        }
export type GetPostsHomeQueryHookResult = ReturnType<typeof useGetPostsHomeQuery>;
export type GetPostsHomeLazyQueryHookResult = ReturnType<typeof useGetPostsHomeLazyQuery>;
export type GetPostsHomeSuspenseQueryHookResult = ReturnType<typeof useGetPostsHomeSuspenseQuery>;
export type GetPostsHomeQueryResult = Apollo.QueryResult<GetPostsHomeQuery, GetPostsHomeQueryVariables>;
export const UpdateClientPostDocument = gql`
    mutation UpdateClientPost($id: ID!, $order: Int!) {
  updateClientPost(id: $id, order: $order) {
    id
    order
  }
}
    `;
export type UpdateClientPostMutationFn = Apollo.MutationFunction<UpdateClientPostMutation, UpdateClientPostMutationVariables>;

/**
 * __useUpdateClientPostMutation__
 *
 * To run a mutation, you first call `useUpdateClientPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientPostMutation, { data, loading, error }] = useUpdateClientPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useUpdateClientPostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientPostMutation, UpdateClientPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientPostMutation, UpdateClientPostMutationVariables>(UpdateClientPostDocument, options);
      }
export type UpdateClientPostMutationHookResult = ReturnType<typeof useUpdateClientPostMutation>;
export type UpdateClientPostMutationResult = Apollo.MutationResult<UpdateClientPostMutation>;
export type UpdateClientPostMutationOptions = Apollo.BaseMutationOptions<UpdateClientPostMutation, UpdateClientPostMutationVariables>;