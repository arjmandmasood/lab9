import React from "react";
import {BookItem} from './bookItem';

export class Books extends React.Component{

    //render method
    render(){
        //return method
        return this.props.books.map(
            (book)=>{
                return <BookItem book={book} key={book._id} ReloadData={this.props.ReloadData}></BookItem>
            }
        );//end return menthod
    }//end render method
}//end class