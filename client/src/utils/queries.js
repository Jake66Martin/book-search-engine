import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me{
    me {
    _id
    email
    username
    password
    savedbooks {
      authors
      bookId
      description
      image
      link
      title
      }
    }
  }`


  