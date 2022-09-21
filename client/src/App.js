import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'firebase/auth';
import Users from '../src/components/Users';
import Home from '../src/components/Home';
import Chat from "../src/components/Chat/Chat";
import Message from "../src/components/Message"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisIsUser: ""
    };
  }

  whoIsThisUser = (data) => {
    this.setState({ thisIsUser: data });
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to={`/${this.state.thisIsUser}`}>Users</Link>
                </li>
                {/* <li>
              <Link to="/message">Message</Link>
            </li> */}
                <li>
                  <Link to="/chat">Chat</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              <Route
                exact
                path="/chat"
                render={props => <Chat user={this.state.thisIsUser} {...props} />}
              />

              <Route path='/message/:handle' component={Message} />


              <Route path='/:handle' component={Users}>
                {/* <Users thisUser={this.state.thisIsUser}/> */}
              </Route>

              <Route path="/">
                <Home thisUser={this.state.thisIsUser} whoIsThisUser={this.whoIsThisUser} />
              </Route>

            </Switch>
          </div>
        </Router>

      </div>
    );

    function About() {
      return (
        <div class="wrapper">
  <span>HEY!</span>
  <div class="outside-block">
    <div class="inside-block">
      <p>Sorry about the look of the page...it's still under construction 🚧 But while you're here, here is some info: Loneliness is more dangerous than smoking 15 cigarettes a day, and more closely linked to our mortality than heart disease and obesity. This app is a space for people to connect. By allowing the user to filter possible friendship connections, they are able to find friends in their area who share similar interests. The app’s friend requesting, messaging and chatting features will increase the likelihood for newly-found friends to meet and hang out.
        {/* <a href="#"></a> */}
      </p>
    </div>
  </div>
</div>
      )
      // <div className="container userText"><h2 >About</h2><h4>Loneliness is more dangerous than smoking 15 cigarettes a day, and more closely linked to our mortality than heart disease and obesity. This app is a space for people to connect. By allowing the user to filter possible friendship connections, they are able to find friends in their area who share similar interests. The app’s friend requesting, messaging and chatting features will increase the likelihood for newly-found friends to meet and hang out.</h4></div>;
    }
  }
}

export default App;



