
import * as React from 'react';
import { Component } from 'react';
import { Fragment } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { CommentBox } from './CommentBox';
import {EditCommentRow} from './EditCommentRow'





interface IcommentListProps {

}


interface ICommentListState {
   // loading: boolean;
    commentlist: any[];
    editCommentId: string;
    editFormData: object;
}
export class CommentList extends Component<IcommentListProps, ICommentListState>{



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
     this.onEditData = this.onEditData.bind(this);
     this.handleCancelClick = this.handleCancelClick.bind(this);
     this.onEditFormChange = this.onEditFormChange.bind(this);
    
    

    }
    componentDidMount() {
        this.populateCommentdata();
    }





    async onEditData(commentid: string, comment:any) {

        this.setState({ editCommentId: commentid });
         const formValues = {
            firstName: comment.firstName,
             lastName: comment.lastName,
             comment:comment.comment

        };
        this.setState({ editFormData: formValues });
       

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
             console.log(response);

         })
             .catch((error) => {
                 console.log(error)
             })

    }





    async handleCancelClick(){
        this.setState({ editCommentId: '' });

    };

    async onEditFormChange(event: any) {

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const  newFormData:any = { ...this.state.editFormData };
        newFormData[fieldName] = fieldValue;

        this.setState({ editFormData: newFormData });
        

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
                        <><Fragment>
                            {this.state.editCommentId === comment.commentGuid &&
                                <EditCommentRow editFormData={this.state.editFormData} onEditFormChange={this.onEditFormChange} handleCancelClick={this.handleCancelClick}  />

                                }
                            

                        </Fragment><tr key={comment.commentGuid}>
                                <td>{count++}</td>
                                <td>{comment.firstName}</td>
                                <td>{comment.lastName}</td>
                                <td>{comment.comment}</td>
                                <>
                                    <div className='row'>
                                     <button className="btn-secondary" onClick={() => this.onDeleteData(comment.commentGuid)}>Delete
                                     </button>
                                
                                    <td>&nbsp;</td>
                                    <button className="btn-secondary" onClick={() => this.onEditData(comment.commentGuid, comment)}>Edit
                                        </button>
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
