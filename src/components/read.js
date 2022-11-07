import React from "react";
import { Books } from "./books";
import axios from "axios";

export class Read extends React.Component{
    
    //componentDidMount method
    componentDidMount() {
        axios.get('http://localhost:4000/api/books')
        .then((response)=>{
            //setting the state here
            this.setState({books:response.data.mybooks})
        })//end then method

        //catch method catch the error
        .catch((error)=>{
            //console.log() shows the error
            console.log(error);
        })//end catch method
    }//end componentDidMount method

    //state
    state = {
        books:[ ]
    }
    
    //render method
    render(){
        //return method
        return(
            <div>
                <h3>Hello from my Read component!</h3>
                <Books books={this.state.books}></Books>
            </div>
        );//end return method
    }//end render method
}//end class