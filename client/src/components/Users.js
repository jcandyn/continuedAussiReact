import React from 'react'
import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig'
import Firebase from "../Firebase"
import UserCard from "./UserCard"
import FriendRequest from "./FriendRequest"
import Friends from "./Friends"

var database = Firebase.database();

class Users extends React.Component {
    state = {
        childData: "",
        userId: "",
        user: null,
        FriendRequests: "",
        Friends: "",
        ListofFriends: ""
    }

    updateFriendRequests = (userId) => {
        let FriendRequestData;
        var ref = database.ref('users/' + userId + '/friendRequests');
        ref.on('value', snapshot => {
            FriendRequestData = snapshot.val();
            this.setState({
                FriendRequests: FriendRequestData
            })
        });
    }

    getFriends = (userId) => {
        let FriendsData;

        var ref = database.ref('users/' + userId + '/acceptedFriends');
        ref.on('value', snapshot => {
            FriendsData = snapshot.val();

            let data = []
            if (FriendsData !== null) {
                Object.values(FriendsData).forEach(value => {

                    data.push(value)
                });
            }
            console.log("handle", data)
            this.setState({
                Friends: data
            })
            console.log("handle2", this.state.Friends[0])
            if (this.state.Friends) {

                this.getListofFriends(this.state.Friends[0])
            }
        });
    }

    updateUser = (userId) => {
        this.setState({
            userId: userId
        })
    }

    retrieve = () => {
        let childData;
        var leadsRef = database.ref('users');
        leadsRef.on('value', snapshot => {
            childData = snapshot.val();
            this.setState({
                childData: childData
            })
        });
    }

    getListofFriends = (friendIdArray) => {
        for (var i = 0; i < friendIdArray.length; i++) {
            let tempArray;
            if (this.state.ListofFriends) {
                tempArray = this.state.ListofFriends
            }
            else if (!this.state.ListofFriends) {
                tempArray = []
            }


            let childData;
            var leadsRef = database.ref('users/' + friendIdArray[i]);
            leadsRef.on('value', snapshot => {
                childData = snapshot.val();
                tempArray.push(childData)

            });
            console.log("how about this?", tempArray)
            this.setState({
                ListofFriends: tempArray

            })
        }
    }

    componentDidMount() {
        const { handle } = this.props.match.params
        this.setState({ userId: handle })
        this.getFriends(handle)
        this.retrieve()
    }

    render() {
        let data = []

        Object.values(this.state.childData).forEach(value => {
            data.push(value)
        });

        let friendData = []

        if (this.state.FriendRequests) {
            Object.keys(this.state.FriendRequests).forEach(key => {
                friendData.push(key)
            });
        }
        // friendData.push(this.state.FriendRequests)


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h3 className="userText">Let's find that friend!</h3>
                    </div>
                    <div className="row">
                        {data.map(item => <UserCard updateFriendRequests={this.updateFriendRequests} updateUser={this.updateUser} thisUser={this.state.userId} data={item} />)}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div class="row">
                            <div className="col">
                                <h3 className="userText">These are your <strong>FRIENDS</strong></h3>
                            </div>
                        </div>
                        <div className="row">
                            {console.log("this may solve it", this.state.ListofFriends)}
                            {this.state.ListofFriends !== null && this.state.ListofFriends.length >= 1 ? this.state.ListofFriends.map(item => <Friends thisUser={this.state.userId} friends={item} />) : console.log("nada")}
                        </div>

                        <div className="col">
                            <h4 className="userText">These are your friend requests</h4>
                            <div class="row">
                                {(friendData !== null && friendData.length) ? friendData.map(item => <FriendRequest getFriends={this.getFriends} thisUser={this.state.userId} data={item} />) : console.log("nada")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Users;