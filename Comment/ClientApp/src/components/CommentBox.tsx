
import * as React from 'react';
import { Component } from 'react';
import axios from    'axios'

interface IcommentBoxProps {

}


interface ICommentBoxState {
    comment: string;
    firstName: string;
    lastName: string;
    
}


export class CommentBox extends Component<IcommentBoxProps,ICommentBoxState> {


    
    constructor(props:any) {
        super(props);
        this.state = {
            comment:'',
            firstName:'',
            lastName:'',
            
        }

        this.formPost = this.formPost.bind(this)
        this.onCancelComment = this.onCancelComment.bind(this)
        this.onChangeComment = this.onChangeComment.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
    }


    public async onChangeComment(e: any) {
        let value = e.target.value;
        this.setState({ comment: value});
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



    public async formPost(e:any) {
            e.preventDefault();
          let model = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
               comment:this.state.comment
               };
        console.log(model);

       let response= await axios({
            method: "POST",
            url: "/Comment",
            data: model,
            headers: { "Content-type": "application/json" },
       }).then((response) => {
           console.log(response);
           this.setState({ comment:"" })
           this.setState({ firstName:"" })
           this.setState({ lastName:"" })
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
                                value="Save"
                            />




                        </div>

                    </div>

                </form>

              </>




            
            )
    }


}
