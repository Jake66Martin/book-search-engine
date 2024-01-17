import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
    _id
    email
    password
    username
    savedbooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }`


  