import * as React from 'react';
import { Component } from 'react';


interface IcommentListProps {
    handleCancelClick: Function,
    onEditFormChange:Function,
    editFormData:object,
}


interface ICommentListState {
    

}


export class EditCommentRow extends Component<IcommentListProps, ICommentListState>{




  
    render() {
        return (


            <div>
                <tr>
                    <td><input
                        type="text"
                        required={true}
                        name="firstName"
                        value={this.props.editFormData.firstName}
                        onChange={this.props.onEditFormChange()}
                    ></input>
                    </td>


                    <td>
                        <input
                            type="text"
                            required={true}
                            name="lastName"
                            value={this.props.editFormData.lastName}
                            onChange={ this.props.onEditFormChange()}
                        ></input>

                    </td>
                    <td>
                        <input  
                            type="textarea"
                            required={true}
                            name="comment"
                            value={this.props.editFormData.comment}
                            onChange={this.props.onEditFormChange()}
                        ></input>

                    </td>
                    <td>
                        <button type="submit">save
                        </button>
                        <button type="button" onClick={() => this.props.handleCancelClick()}>cancel
                        </button>
                    </td>
                </tr>



            </div>
        )

    }
    


}