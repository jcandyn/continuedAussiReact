import React from 'react';
import '../App.css';
import Firebase from "../Firebase";

var database = Firebase.database();

class List extends React.Component {
  state = {
    userId: ""
  }

  updateCurrentUser = () => {
    this.setState({
      userId: this.props.thisUser
    })

    console.log("is this user?", this.props.thisUser)
    this.props.updateUser(this.props.thisUser)
  }

  getFriends = () => {
    this.props.updateFriendRequests(this.props.thisUser)
  }

  componentDidMount() {
    this.updateCurrentUser()
    this.getFriends()
  }

  selfFriend = () => {
    alert("sorry, you are REALLY cool and everything, but you can't be your own friend!")
  }

  render() {
    return (
      <div className="container">
        <div className="row">

          <img imageSrc={this.props.data.profile_picture} />
          <h5><em>{this.props.data.username}</em></h5>
          <p>{this.props.data.bio}</p>
          <p>{this.props.data.location}</p>
          {/* {this.props.data.hobbies.map(item => <p>Hobbies: {item}</p>)} */}
          <p>{this.props.data.hobbies}</p>
          <p><strong>{this.props.data.occupation}</strong></p>


        </div>
      </div>
    )
  }

}

export default List;
