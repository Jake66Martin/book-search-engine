import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
    _id
    email
    username
    savedbooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }`


  