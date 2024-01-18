import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me{
    me {
    _id
    username
    email
    password
    savedbooks {
      _id
      authors
      bookId
      description
      image
      link
      title
      }
    }
  }`


  