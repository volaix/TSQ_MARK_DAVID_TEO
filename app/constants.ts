import { gql } from "@apollo/client"

// export const FETCH_POSTS = 

export const CREATE_POST = gql`
  mutation createUser($input: NewUserInput!) {
    createUser(input: $input) {
      active
      age
      email
      first_name
      id
      last_name
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      active
      age
      email
      id
      first_name
      last_name
    }
  }
`

export const DELETE_POST = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`
