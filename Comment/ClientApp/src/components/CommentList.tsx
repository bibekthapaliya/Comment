
import * as React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState, useEffect } from 'react';
import { event } from 'jquery';





interface IcommentListProps {

}

interface ICommentListState {
  
    commentlist: any[];
   
}

 function  CommentList(IcommentListProps,ICommentListState) {

    const [commentlist, setCommentlist] = useState([]);
    

     useEffect(() => {
           populateCommentdata();
    }, []);

    const onDeleteData = async (event,commentid: String) => {
        event.preventDefault();
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
            populateCommentdata();

        })
            .catch((error) => {
                console.log(error)
            })

    }

     const populateCommentdata = async () => {
        const response = await fetch('/Comment');
        const data = await response.json();
        { setCommentlist(data.data) };
    }

    const renderCommentTable = (commentlist: any) => {

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

                        {commentlist.map((comment: any, index: any) => (
                            <><tr key={comment.commentGuid}>
                                <td>{count++}</td>
                                <td>{comment.firstName}</td>
                                <td>{comment.lastName}</td>
                                <td>{comment.comment}</td>
                                <>
                                    <div className='row md -4'>
                                        <Popup trigger={<button>Delete</button>}
                                            position="right center">
                                            <div>Are You sure to delete data</div>
                                            <button onClick={(event) => this.onDeleteData(comment.commentGuid,event)}>Yes</button>
                                        </Popup>

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


    return (
        <div>
            <h1 id="tabelLabel" >CommentList</h1>
            {renderCommentTable(commentlist)}
        </div>
    );


}


export default React.memo(CommentList);

