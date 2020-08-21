import React, { Component} from 'react';
import './App.css';
import Inspire from './components/inspire/Inspire';
import Header from './components/header/Header';
import AboutCohort from './components/about/AboutCohort';
import Collaborate from './components/collaborate/Collaborate';
import Reflect from './components/reflect/Reflect';
import { HashRouter, Route, NavLink, Redirect } from "react-router-dom";
import DisplayName from './components/collaborate/DisplayName';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "Anonymous",
      open: true
    };
  }

  /********************************************/
  // componentDidMount/WillUnmount methods   //
  /******************************************/
  componentDidMount() {
    this.handleWindowSize();

    window.addEventListener("resize", this.handleWindowSize);
  }

  comonentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSize);
  }

  /*******************************/
  //       Event listeners      //
  /*****************************/

  // Close the nav bar when the screen width is 1100 or less
  handleWindowSize = () => {
    const windowSize = window.innerWidth;
    if (windowSize < 1101) {
      this.setState({
        open: false
      })
    }
  } 

  // Display Name input value listener
  handleNameChange = (event) => {
    this.setState({
      displayName: event.target.value,
    });
  };

  // Set name to 'Anonymous' if name field is empty when leaving the field
  handleNameBlur = (event) => {
    if (event.target.value.trim() === "") {
      // Set 'displayName' back to anonymous
      this.setState({
        displayName: "Anonymous",
      });
      // Set input back to empty
      event.target.value = "";
    }
  };

  // Display name listener to prevent default
  handleNamePreventDefault = (event) => {
    event.preventDefault();
  };

  handleMenuClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  /*****************************/
  //       Render method      //
  /***************************/
  render() {
    return (
      <HashRouter basename="/">
        <div className="App">
          {/*Beginning of the header */}
          <Header
            handleMenuClick={this.handleMenuClick}
            isOpen={this.state.open}
          />

          <main>
              <nav className={this.state.open === true ? "sideBar sideBarShow" : "sideBar sideBarHide"}>

                <ul onClick={this.handleMenuClick}>
                  <li>
                    <NavLink to="/inspire" activeClassName="sideBarActive">Inspire</NavLink>
                  </li>

                  <li>
                    <NavLink to="/reflect" activeClassName="sideBarActive">Reflect</NavLink>
                  </li>

                  <li>
                    <NavLink to="/collaborate" activeClassName="sideBarActive">Collaborate</NavLink>
                  </li>
                </ul>

                <ul>
                  <li className="displayNameNav">
                    <DisplayName
                      displayName={this.state.displayName}
                      handleNameChange={this.handleNameChange}
                      handleNamePrevbentDefault={this.handleNamePreventDefault}
                      handleNameBlur={this.handleNameBlur}
                    />
                  </li>

                  <li onClick={this.handleMenuClick}>
                    <NavLink to="/about" activeClassName="sideBarActive">About</NavLink>
                  </li>
                </ul>
              </nav>

              <div className="routerWindow">
                <Route exact path="/">
                  <Redirect to="/about"/>
                </Route>

                <Route path="/inspire">
                  <Inspire displayName={this.state.displayName} />
                </Route>

                <Route path="/reflect" component={Reflect} />

                <Route path="/collaborate">
                  <Collaborate displayName={this.state.displayName} />
                </Route>

                <Route path="/about" component={AboutCohort} />
              </div>

          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
