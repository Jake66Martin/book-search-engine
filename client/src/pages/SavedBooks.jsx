// import { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

// import { deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({
        variables: {
          bookId: bookId,
        },
      });
      console.log(bookId);
      console.log(response);

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/* { !loading ? ( */}
      <div className="text-light bg-dark p-5 fluid">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedbooks?.length
            ? `Viewing ${userData.savedbooks.length} saved ${
                userData.savedbooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedbooks?.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Card.Link href={book.link}>Read more here</Card.Link>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
