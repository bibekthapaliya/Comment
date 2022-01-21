
import * as React from 'react';
import { Component,PureComponent } from 'react';
import { Fragment } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { CommentBox } from './CommentBox';
//import {EditCommentRow} from './EditCommentRow'
import { Link } from 'react-router-dom';





interface IcommentListProps {

}


interface ICommentListState {
   // loading: boolean;
    commentlist: any[];
    editCommentId: string;
    editFormData: object;
  

}


export class CommentList extends PureComponent<IcommentListProps, ICommentListState>{



 constructor(props:any) {
        super(props);
     this.state = {
         commentlist: [],
         editCommentId:'',
         editFormData:{
             firstName: '',
             lastName: '',
             Comment:''
         }
           
         
     };

     //this.populateCommentdata = this.populateCommentdata.bind(this);
     this.renderCommentTable = this.renderCommentTable.bind(this);
     this.onDeleteData = this.onDeleteData.bind(this);
     //this.onEditData = this.onEditData.bind(this);
    // this.handleCancelClick = this.handleCancelClick.bind(this);
     //this.onEditFormChange = this.onEditFormChange.bind(this);
    
    

    }

    componentDidMount() {
        this.populateCommentdata();
    }

   



   
    
     async  onDeleteData(commentid:String) {

         let id = {
             CommentId: commentid,
                  };
         console.log(id);
         let response = await axios({
             method: "DELETE",
             url: "/Comment",
             data: id,
             headers: { "Content-type": "application/json" },
         }).then((response) => {
             this.populateCommentdata();
             
         })
             .catch((error) => {
                 console.log(error)
             })

    }

           
    async populateCommentdata() {
        const response = await fetch('/Comment');
        const data = await response.json();
        this.setState({ commentlist: data.data });
    }

    public  renderCommentTable(commentlist:any) {

        var count = 1 
        return (
            <form>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>S.n</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>Comment</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    
                    {commentlist.map((comment: any, index: any) =>(
                        <><tr key={comment.commentGuid}>
                                <td>{count++}</td>
                                <td>{comment.firstName}</td>
                                <td>{comment.lastName}</td>
                                <td>{comment.comment}</td>
                                <>
                                    <div className='row'>
                                     <button className="btn-secondary" onClick={() => this.onDeleteData(comment.commentGuid)}>Delete
                                     </button>
                                
                                    <td>&nbsp;</td>
                                     <Link
                                        className="btn btn-outline-primary mr-2"
                                        to={`/editComment/${comment.commentGuid}`}
                                    >
                                        Edit
                                    </Link>
                                    </div>
                                  </>
                            </tr></>
                        
                    ))}
                   
                </tbody>
                </table>
                </form>
             
        );
    }


    render() {

        let contents = this.renderCommentTable(this.state.commentlist);

        return (
            <div>
                <h1 id="tabelLabel" >CommentList</h1>
                 {contents}
            </div>
        );
    }

}
