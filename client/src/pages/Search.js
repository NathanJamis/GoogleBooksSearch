import React, { Component } from "react";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Book from "../components/Book";
import { List } from "../components/List";
import Form from "../components/Form";

import API from "../utils/API";

class Search extends Component {
    state = {
        books: [],
        search: ""
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    searchBooks = () => {
        API.googleBooks(this.state.search)
            .then(res => {
                this.setState({
                    books: res.data.items
                })
            })
            .catch(() => 
                this.setState({
                    books: []
                })
            );
    };

    handleFormSubmit = e => {
        e.preventDefault();
        this.searchBooks();
    };

    saveBook = id => {
        const book = this.state.books.find(book => book.id === id);
        console.log(book);
        API.saveBook({
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink
        })
        .then(() => this.searchBooks())
        .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Nav />
                <Container fluid>
                    <Jumbotron />
                    <Card title="Search">
                        <Form
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                            search={this.state.search}
                        />
                    </Card>
                    <Card title="Results">
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <Book 
                                        key={book.id}
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors}
                                        description={book.volumeInfo.description}
                                        image={book.volumeInfo.imageLinks.thumbnail}
                                        link={book.volumeInfo.infoLink}
                                        Button={() => (
                                            <button className="btn btn-success ml-1"
                                            onClick={() => this.saveBook(book.id)}>Save</button>
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

export default Search;