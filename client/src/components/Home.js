import React from "react";
import '../App.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import Firebase from "../Firebase"
import Banner from './Banner'
import Search from './Search'
import Profile from './Profile'
import Book from './Book'

const firebaseAppAuth = Firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
var database = Firebase.database();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      childData: "",
      isFormFilledOut: "",
      infoFromUser: ""
    };
  }
  componentDidMount = () => {
    this.getInfoFromUser(this.props.thisUser)
  }

  getInfoFromUser = (userId) => {
    let data;
    var ref = database.ref('users/' + userId);
    ref.on('value', snapshot => {
      data = snapshot.val();
      this.setState({
        infoFromUser: data
      })
    });
  }

  savingUsers = (userData) => {
    database.ref('users/' + userData.userId).set({
      username: userData.name,
      email: userData.email,
      profile_picture: userData.imageUrl,
      userId: userData.userId,
      isFormFilledOut: false
    });
  }

  updateState = (userData) => {
    this.setState({
      userId: userData.userId,
    })
  }

  realSignIn = () => {
    this.props.signInWithGoogle().then((res) => {
      const userData = {
        userId: res.user.uid,
        name: res.additionalUserInfo.profile.name,
        email: res.additionalUserInfo.profile.email,
        imageUrl: res.additionalUserInfo.profile.picture
      }

      this.updateState(userData)
      this.getInfoFromUser(userData.userId)
      this.props.whoIsThisUser(this.state.userId)

      if (res.additionalUserInfo.isNewUser === true) {
        this.savingUsers(userData)
      }
    })
  }
  render() {
    const {
      user,
      signOut,
    } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          {
            user
              ?
              <div>
                <br />
                <br />
                <br />
                <br />

                <p className="white-text text-lighten-3">Hey, {user.displayName} !</p>
                <img src={user.photoURL} className="profile-image" />
              </div>
              :
              <div>
                < Banner />
              </div>
          }
          {
            user
              ?
              <div>
                <button onClick={signOut} className="sign-out blue-grey darken-4 waves-effect waves-light btn btn-small"><i class="material-icons left">power_settings_new</i>Sign Out</button>
                {this.state.infoFromUser.isFormFilledOut ? <Book username={user.displayName} /> : <Search isFormFilledOut={this.state.infoFromUser.isFormFilledOut} userId={user.uid} />}
                {/* <Profile name={this.state.name}/> */}
                {/* <Book name={user.displayName}/> */}
              </div>
              : <button id="sign-in" className="btn light-blue darken-3 waves-effect waves-light" onClick={this.realSignIn}><i className="material-icons right">perm_identity</i>Sign in with Google</button>
          }
        </header>
      </div>
    )
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Home);