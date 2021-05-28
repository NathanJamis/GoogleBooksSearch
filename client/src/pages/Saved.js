import React, { Component } from "react";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Book from "../components/Book";
import { List } from "../components/List";

import API from "../utils/API";
import Form from "../components/Form";

class Saved extends Component {
    state = {
        savedBooks: []
    };

    componentDidMount = () => {
        this.getSavedBooks();
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => {
                console.log("Book removed!", res);
                this.getSavedBooks();
            })
            .catch(err => {
                console.log(err);
            })
    };

    getSavedBooks = () => {
        API.getBooks()
            .then(res => {
                this.setState({
                    savedBooks: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div>
                <Nav />
                <Container fluid>
                    <Jumbotron />
                    <Card title="Saved">
                        {this.state.savedBooks.length ? (
                            <List>
                                {this.state.savedBooks.map(book => (
                                    <Book
                                        key={book._id}
                                        title={book.title}
                                        authors={book.authors}
                                        description={book.description}
                                        image={book.image}
                                        link={book.link}
                                        Button={() => (
                                            <button className="btn btn-warning ml-1"
                                            onClick={() => this.deleteBook(book._id)}>Remove</button>
                                        )}
                                    />
                                ))}
                            </List>
                        ) : (
                            <div>
                                <hr />
                                <p className="text-center">Nothing to display...</p>
                                <hr />
                            </div>
                        )}
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Saved;