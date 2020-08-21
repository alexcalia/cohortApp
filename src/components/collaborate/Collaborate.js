import React, { Component } from 'react';
import firebase from "../../components/database/firebase";
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';

class Collaborate extends Component {
  constructor() {
    super();
    this.dbRef = firebase.database().ref("/messageApp");
    this.state = {
      messages: [],
      userInput: "",
    }
  }

  /*******************************/
  //  componentDidMount method   //
  /*****************************/
  componentDidMount() {
  // Get the date
    const currentDate = new Date();

    // Convert the date to just the date and no time
    const todaysDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;

    // Set the 'timestamp' state to be used in new messages
    this.setState({
      timestamp: todaysDate,
    });

    // Listener for when the Firebase DB updates
    this.dbRef.on("value", (response) => {
      // Array to hold data from Firebase database
      const newState = [];

      // Storing the objects from Firebase
      const data = response.val();

      // Looping over the Firebase data object to push to 'newState' array
      for (let key in data) {
      newState.push({ key: key, data: data[key] });
      }

      // If the data from Firebase is more than 25 messages, delete the oldest message
      if (newState.length > 25) {
      // Remove oldest message from the array and store in a new array
      const deleteItem = newState.splice(0, 1);

      // Using the new array, get the key and remove it from the object from the database
      this.dbRef.child(deleteItem[0].key).remove();
      }

      // Set the 'messages' state with the 'newState' data for the 'MessageBox' child component
      this.setState({
      messages: newState,
      });
    });
  }

  /*******************************/
  //       Event listeners      //
  /*****************************/
  // Text message input value listener
  handleTextChange = (event) => {
  // As user is typing in the message input, update the 'userInput' state
    this.setState({
      userInput: event.target.value,
    });
  };

  // Text message input submit listener
  handleTextSubmit = (event) => {
    // Prevent default on submit
    event.preventDefault();

    // Error handling for when user enters only whitespace in the input field for sending a message
    if (this.state.userInput.trim() !== "") {
      // Grabbing required data from the state to push to Firebase database
      const messageObject = {
        displayName: this.props.displayName,
        messageText: this.state.userInput,
        timestamp: this.state.timestamp,
      };

      // Push data to Firebase database
      this.dbRef.push(messageObject);
    }

    // Reset 'userInput' state
    this.setState({
      userInput: "",
    });
  };

  /*******************************/
  //       render method        //
  /*****************************/
  render() {
    return (
      <div className="wrapper">

        {/* Invoking the 'MessageBox' component and passing props from 'messages' state */}
        <ul className="messagesComponent">
          {this.state.messages.map((message) => {
            return (
              <MessageBox
              key={message.key}
              displayName={message.data.displayName}
              messageText={message.data.messageText}
              timestamp={message.data.timestamp}
              deleteMessage={() => {
                this.handleDeleteMessage(message.key);
              }}
              />
            );
          })}
        </ul>
        {/*End of 'MessageBox' invoke */}

        {/* Invoking the 'MessageInput' component for the user to enter and submit their message to the board */}
        <MessageInput
          className="messageInput"
          form="messageInputForm"
          value={this.state.userInput}
          onClick={this.handleTextSubmit}
          onChange={this.handleTextChange}
        />
      </div>
    )
  }
}

export default Collaborate;