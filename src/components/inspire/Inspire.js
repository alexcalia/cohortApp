import React, {Component} from 'react';
import firebase from "../../components/database/firebase";
import axios from 'axios';
import InspireInput from './InspireInput';
import ErrorMessage from './ErrorMessage';

class Inspire extends Component {
  constructor(){
    super();
    this.state = {
      quote: '',
      author: '',
      reflect: '',
      error: false,
      apiError: false
    }
  }

  /*******************************/
  //  componentDidMount method   //
  /*****************************/
  componentDidMount() {
    axios.get("https://api.quotable.io/random")
    .then((res)=>{
      this.setState({
        quote: res.data.content,
        author: res.data.author,
      })
    }).catch(() => {
      this.setState({
        apiError: true,
        quote: 'If you are seeing this, the quote could not be retrieved. Please refresh the app!',
        author: 'Error!'
      })
    });
  }

  /*******************************/
  //       Event listeners      //
  /*****************************/
  // Event handler for when the user submits the reflection
  handleReflectSubmit = (event) => {
    // Prevent default on submit
    event.preventDefault();

    // Store the firebase database reference for 'reflectApp'
    const dbRef = firebase.database().ref("/reflectApp");

    // Error handler for when t he user tries to submit an emtpy message
    if (this.state.reflect.trim() === "") {
      // Set 'error' state to 'true' to trigger the error message
      this.setState({
        error: true
      })
    } else {
      // Save all info required to object to be pushed to firebase
      const reflectObject = {
        quote: this.state.quote,
        author: this.state.author,
        reflect: this.state.reflect
      }

      // Push object to firebase
      dbRef.push(reflectObject);

      // Set 'error' state back to false to hide the error text
      this.setState({
        error: false
      })
    }

    // Reset the 'reflect' state to empty the textarea
    this.setState({
      reflect: ''
    })
  }

  // Event handler from when the user types in the textarea
  handleReflectChange = (event) => {
    // As user is typing in the reflection input, update the 'reflect' state
    this.setState({
    reflect: event.target.value,
    });
  };

  /*******************************/
  //       render method        //
  /*****************************/
  render(){
    return(
      <div className="inspirationComponent">
        <article className="inspiration">
            <p className="inspireQuote">{this.state.quote}</p>
            <p className="inspireAuthor">{this.state.author}</p>
        </article>

        {/*Invoking the 'ReflectInput' component */}
        <InspireInput
          form={this.state.apiError === false ? "inspireForm" : "hide"}
          value={this.state.reflect}
          className="inspireInput"
          onChange={this.handleReflectChange}
          onClick={this.handleReflectSubmit} />

        {/* Invoking the error message */}
        <ErrorMessage errorClasses={this.state.error === true ? "errorMessage errorMessageShow" : "errorMessage"}/>
      </div>
    )
  }
}

export default Inspire;