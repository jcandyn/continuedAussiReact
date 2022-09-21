import React from "react";
import '../App.css';
import firebaseConfig from '../firebaseConfig';
import Firebase from "../Firebase"
import { Card, ImageHeader, CardBody, CardFooter } from 'react-simple-card';

var database = Firebase.database()
class FriendRequest extends React.Component {
    constructor(props) {
        super(props);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.declineRequest = this.declineRequest.bind(this);
        this.state = {
            FriendRequestsData: []
        };
    }

    acceptRequest = (friendId, userId, e) => {
        e.preventDefault()
        // alert('accepting request')
        // alert(userId)
        // alert(friendId)
        database.ref('users/' + userId + "/friendRequests/" + friendId).set({
            "accepted": true
        });

        let tempArray = []
        let childData;
        var leadsRef = database.ref('users/' + userId + "/acceptedFriends");

        leadsRef.on('value', snapshot => {
            childData = snapshot.val();
            console.log("tempArray", childData)
            if (childData) {
                tempArray = childData.friendId
            }

        });
        if (!tempArray.includes(friendId)) {
            tempArray.push(friendId)
        }

        //   for now this method will make a node for friends accepted
        database.ref('users/' + userId + "/acceptedFriends/").set({
            "friendId": tempArray
        });
        this.props.getFriends(friendId)
    }

    declineRequest(friendId, userId, e) {
        e.preventDefault()
        // alert('declining request')
        // alert(userId)
        // alert(friendId)
        database.ref('users/' + userId + "/friendRequests/" + friendId).update({
            accepted: null
        });
    }

    componentDidMount = () => {
        // var friendRequests = this.props.data;
        // this.setState({
        //     FriendRequestsIds: friendRequests
        // })
        this.friendRequests()
    }

    friendRequests = () => {
        let data = this.props.data
        if (data === 0)
            return null
        else {
            let childData;
            let friendsRequests = this.state.FriendRequestsData
            var leadsRef = database.ref('users/' + data);
            leadsRef.on('value', snapshot => {
                childData = snapshot.val();
                friendsRequests.push(childData)
            })
            this.setState({
                FriendRequestsData: friendsRequests
            })
        }
    }

    render() {
        let isAccepted;
        var leadsRef = database.ref('users/' + this.props.thisUser + "/friendRequests/" + this.props.data + "/accepted");
        leadsRef.on('value', snapshot => {
            isAccepted = snapshot.val();
        })

        return (
            <div>
                {console.log("hi", this.props.data)}
                {console.log("hey", this.state.FriendRequestsData[0])}


                {this.state.FriendRequestsData[0] && isAccepted !== true ?
                    <div className='UserCard'>
                        <div className='UserCardTop'>
                            <img src={this.state.FriendRequestsData[0].profile_picture} />
                        </div>
                        <div className='UserCardBottom userText'>
                            <p>{this.state.FriendRequestsData[0].username}</p>
                            <p>{this.state.FriendRequestsData[0].occupation}</p>
                            <p>{this.state.FriendRequestsData[0].bio}</p>
                            <p>{this.state.FriendRequestsData[0].location}</p>
                            <p>{this.state.FriendRequestsData[0].bio}</p>
                            <div class="row">
                                <div class="col">
                                    <button onClick={e => { this.acceptRequest(this.state.FriendRequestsData[0].userId, this.props.thisUser, e) }} className="btn">Accept</button>
                                </div>
                                <div class="col">
                                    <button className="btn red darken-1" onClick={e => { this.declineRequest(this.state.FriendRequestsData[0].userId, this.props.thisUser, e) }}>Decline</button>
                                </div>
                            </div>
                        </div>
                    </div> : console.log("nada")}
            </div>
        )
    }

}
export default FriendRequest;
