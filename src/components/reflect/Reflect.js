import React, {Component} from 'react';
import firebase from "../../components/database/firebase";
import ReflectionBox from './ReflectionBox';

class Reflect extends Component {
  constructor() {
    super();
    this.state = {
      reflections: []
    }
  }

  /*******************************/
  //   componentDidMount method  //
  /*****************************/
  componentDidMount() {
    // Storing the databse reference for '/reflectApp'
    const dbRef = firebase.database().ref("/reflectApp");

    // Event listener for when data is added or removed from the dastabase
    dbRef.on("value", (response) => {
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
      dbRef.child(deleteItem[0].key).remove();
      }

      // Set the 'messages' state with the 'newState' data for the 'MessageBox' child component
      this.setState({
      reflections: newState,
      });
    });
  }

  /*******************************/
  //   render method            //
  /*****************************/
  render() {
    return(
      <div className="wrapper">

        <ul className="reflectMessages">
          {/* Iterating over the reflections from the database and displaying to screen */}
          {this.state.reflections.map((reflection) => {
            return (

            // Invoking the 'ReflectionBox' component
            <ReflectionBox
              key={reflection.key}
              quote={reflection.data.quote}
              author={reflection.data.author}
              messageText={reflection.data.reflect}
            />
            );
          })}
        </ul>

      </div>
    ) 
  }
}

export default Reflect;