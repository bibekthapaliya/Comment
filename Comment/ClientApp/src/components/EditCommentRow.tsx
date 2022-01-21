
import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { Component } from 'react';
import axios from 'axios'
import { match } from 'react-router-dom';


type CommentParams = {
    id: string; // parameters will always be a string (even if they are numerical)
    
};



interface IcommentBoxProps {
   
    

}


interface ICommentBoxState {
    Id:string;
    comment: string;
    firstName: string;
    lastName: string;
    //commentlist: any[];

}


export class EditCommentRow extends Component<IcommentBoxProps & RouteComponentProps<CommentParams>, ICommentBoxState> {


   
    
    constructor(props: any) {
        super(props);
        
        this.state = {
            Id:this.props.match.params.id,
            comment: '',
            firstName: '',
            lastName: '',
            //commentlist:[],

        }

        this.formPost = this.formPost.bind(this)
        this.onCancelComment = this.onCancelComment.bind(this)
        this.onChangeComment = this.onChangeComment.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        
    }



    componentDidMount() {
        console.log(this.props)
        this.loadUser();
        
    }



    public async loadUser() {
        let result = await fetch(`/Comment/${this.state.Id}`)
        console.log(result);
        if (result.ok) {
            let json = await result.json();
            this.setState({
                firstName: json.data.firstName,
                lastName: json.data.lastName,
                comment: json.data.comment

            })
        }
        console.log(this.state.firstName)   
        
    }

    public async onChangeComment(e: any) {
        let value = e.target.value;
        this.setState({ comment: value });
    }
    public async onChangeFirstName(e: any) {
        let value = e.target.value;
        this.setState({ firstName: value });
    }
    public async onChangeLastName(e: any) {
        let value = e.target.value;
        this.setState({ lastName: value });
    }

    public async onCancelComment() {
        this.setState({ comment: "" })
    }



    public async formPost(e: any) {
        e.preventDefault();
        let model = {
            commentId:this.state.Id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            comment: this.state.comment
        };
        console.log(model);

        let response = await axios({
            method: "PUT",
            url: "/Comment",
            data: model,
            headers: { "Content-type": "application/json" },
        }).then((response) => {
            this.setState({ comment: "" })
            this.setState({ firstName: "" })
            this.setState({ lastName: "" })
            alert("Comment posted");
        })
            .catch((error) => {
                console.log(error)
            })








    }









    render() {
        return (

            
            <>
                
                <form onSubmit={this.formPost}>
                    
                    <div className='row'>
                        <div className="form-group md-8">
                              <div className="from-group">
                                <label>FirstName</label>
                                <input type="text" className="form-control" value={this.state.firstName} onChange={this.onChangeFirstName} placeholder="firstname" />
                               </div>
                               <div className="from-group">
                                <label>lastName</label>
                                <input type="text" className="form-control" value={this.state.lastName} onChange={this.onChangeLastName} placeholder="lastname" />
                                </div>
                                <div className="from-group">
                                <label className="exampleFormControlTextarea1">Comment Box</label>
                                    <textarea 
                                      className="form-control"
                                      id="exampleFormControlTextarea1"
                                        value={this.state.comment}
                                        name="comment"
                                        placeholder="Write a comment"
                                        rows={5}
                                        onChange={this.onChangeComment}
                                        required={true}
                                       />

                                  </div>
                                                                                         
                                    <input
                                        type="button"
                                        name="reset"
                                        onClick={this.onCancelComment}
                                        className="btn btn-secondary"
                                        value="Reset"
                                    />
                                 <input
                                    type="submit"
                                    name="submit"
                                    className="btn btn-primary ml-2"
                                    value="Update"
                                  />
                                   
                                
                                
                                        
                        </div>
                       
                        </div>
                        
                    </form>
                   

            </>





        )
    }


}
