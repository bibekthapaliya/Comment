
import * as React from 'react';
import { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

interface IcommentBoxProps {

}


interface ICommentBoxState {
    comment: string;
    firstName: string;
    lastName: string;
    message: string;
    userlist: any[],
    

}


export class CommentBox extends Component<IcommentBoxProps, ICommentBoxState> {



    constructor(props: any) {
        super(props);
        this.state = {
            comment: '',
            firstName: '',
            lastName: '',
            message: '',
           userlist:[],
        }

        this.formPost = this.formPost.bind(this)
        this.onCancelComment = this.onCancelComment.bind(this)
        this.onChangeComment = this.onChangeComment.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
    }

    componentDidMount() {
        this.populateUserData();
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

   public async populateUserData() {

        const response = await fetch('/User');
        const data = await response.json();
        this.setState({ userlist: data.data });


    }




    public async formPost(e: any) {
        e.preventDefault();
        let model = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            comment: this.state.comment
        };
        console.log(model);

        let response = await axios({
            method: "POST",
            url: "/Comment",
            data: model,
            headers: { "Content-type": "application/json" },
        }).then((response) => {
            console.log(response);
            this.setState({ comment: "" })
            this.setState({ firstName: "" })
            this.setState({ lastName: "" })
            // this.setState({ message: "Form submitted Succefully" })
            alert("Form data will be posted");
        })
            .catch((error) => {
                console.log(error)
            })








    }









    render() {
        return (

            <>
                                 
                <form onSubmit={this.formPost}>


                    <div className="col-8 col-md-8">


                           <div className="from-group">
                            <label className="col-md-2 col-form-label">First Name</label>
                            <div className="col-md-6">
                                <select className="col-md-8" value={this.state.firstName} onChange={this.onChangeFirstName}>
                                    <option data-id="1" >...Choose FirstName...</option>
                                    {this.state.userlist.map((user: any) => (
                                        <> key={user.userGuid}
                                            <option data-id="2" >{user.firstName}</option>
                                        </>))}

                                </select>
                            </div>
                        </div>
                        <div className="from-group">
                            <label className="col-md-2 col-form-label">Last Name</label>
                            <div className="col-md-6">
                                <select className="col-md-8" value={this.state.lastName} onChange={this.onChangeLastName}>
                                    <option data-id="1" >...Choose LastName...</option>
                                    {this.state.userlist.map((user: any) => (
                                        <> key={user.userGuid}
                                            <option data-id="2" >{user.lastName}</option>
                                        </>))}

                                </select>
                            </div>
                        </div>

                        <div className="from-group">
                            <label className="col-md-2 col-form-label">Comment</label>
                            <div className="col-md-6">
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
                        </div>
                        <div className="from-group">
                            <label className="col-md-2 col-form-label"></label>
                            <div className="col-md-6">
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
                                    value="Save"
                                />
                            </div>
                        </div>


                    </div>


                </form>

              
            

            </>





        )
    }


}
