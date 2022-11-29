import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export function Edit(props) {
// The useParams hook returns an object of key/value pairs of
// the dynamic params from the current URL that were matched by
//the <Route path>.
let { id } = useParams();
// update arrays using the React useState()
// and without the Array object's push() method
const [title, setTitle] = useState("");
const [cover, setCover] = useState("");
const [author, setAuthor] = useState("");
// useNavigate return a function that we can use to navigate
const navigate = useNavigate();
//useEffect Hook is similar componentDidMount
useEffect(() => {
//axios is a promised based web client
//make a HTTP Request with GET method and pass as part of the url.
// .get get the data or record from the database
axios.get('http://localhost:4000/api/books/' + id)
.then((response) => {
// Assign Response data to the arrays using useState.
setTitle(response.data.title);
setCover(response.data.cover);
setAuthor(response.data.author);
})
.catch(function (error) {
console.log(error);
})
}, []);

// in handleSubmit event assigning values
const handleSubmit = (event) => {
event.preventDefault();
const newBook = {
id: id,
title: title,
cover: cover,
author: author
};

// .put is HTTP req. it goes to server and server send it to the database
// .put overwrite the data or record in the database
axios.put('http://localhost:4000/api/books/' + id, newBook)
.then((res) => {
console.log(res.data);
navigate('/read');
});
}
return (
<div>
{/* form get the value for edit with onSubmit method */}
<form onSubmit={handleSubmit}>
<div className="form-group">
<label>Edit Book Title: </label>
<input type="text"
className="form-control"
//getting original value here from the database and show here
value={title}
//setting new value here using onChange
onChange={(e) => setTitle(e.target.value)}
/>
</div>
<div className="form-group">
<label>Edit Cover: </label>
<input type="text"
className="form-control"
//getting original value here from the database and show here
value={cover}
//setting new value here using onChange
onChange={(e) => setCover(e.target.value)}
/>
</div>
<div className="form-group">
<label>Edit Author: </label>
<input type="text"
className="form-control"
//getting original value here from the database and show here
value={author}
//setting new value here using onChange
onChange={(e) => setAuthor(e.target.value)}
/>
</div>
<div className="form-group">
<input type="submit" value="Edit Book" className="btn btn-primary"></input> </div>
</form>
</div>
);
}