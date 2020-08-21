import React, { Component } from 'react';

class ReflectionBox extends Component {
  /****************************************** /
  //   componentDidMount/DidUpdate methods //
  //   to control the scroll on update    //
  /****************************************/
  componentDidMount() {
    this.newMessage.scrollIntoView({ behavior: "smooth" })
  }

  componentDidUpdate() {
    this.newMessage.scrollIntoView({ behavior: "smooth" })
  }

  /*******************************/
  //       render method        //
  /*****************************/
  render() {
    return (
      <li className="reflectionBox" ref={(ref) => this.newMessage = ref} key={this.props.messageKey}>

        <div className="quoteBox">
          <p className="quoteText">{this.props.quote}</p>
          <p className="quoteAuthor">{this.props.author}</p>
        </div>

        <p className="reflectMessage">{this.props.messageText}</p>

      </li>
    )
  }
}

export default ReflectionBox;