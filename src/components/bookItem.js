import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";


export class BookItem extends React.Component {

    //constructor
    constructor(){
        super();
        //binding methods
        this.DeleteBook = this.DeleteBook.bind(this);
    }//end constructor

    //DeleteBook event
    DeleteBook(e){
        e.preventDefault();
        // .delete delete the data or record in the database
        axios.delete('http://localhost:4000/api/books/' + this.props.book._id)
        //Reload data
        .then(()=>{this.props.ReloadData()})
        .catch();
    }//End DeleteBook event

    render() {
        return (
            <div>
                <Card>
            <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Body>
       <blockquote className="blockquote mb-0">
            <img src={this.props.book.cover}></img>
            <footer >
                {this.props.book.author}
                    </footer>
                        </blockquote>
                    </Card.Body>
                    {/* <Button>Edit</Button> */}
                    <Link to = {"/edit/"+this.props.book._id} className = "btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button>
                </Card>
            </div>
        );
    }
}