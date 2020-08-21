import React, {Component} from 'react';

class MessageBox extends Component {

    /******************************************/
    //   componentDidMount/DidUpdate methods //
    //   to control the scroll on update    //
    /****************************************/
    componentDidMount(){
        this.newMessage.scrollIntoView({ behavior: "smooth" })
    }
    
    componentDidUpdate(){
        this.newMessage.scrollIntoView({ behavior: "smooth" })
    }

    /**************************/
    //   render method       //
    /************************/
    render() {
        return(
            <li className="messageBox" ref={(ref) => this.newMessage = ref} key={this.props.messageKey}>

                <div className="displayNameBox">
                    <p>{this.props.displayName}</p>
                </div>

                <p>{this.props.messageText}</p>

                <div className="timestamp">
                    <p>{this.props.timestamp}</p>
                </div>
            </li>
        )
    }
}

export default MessageBox;