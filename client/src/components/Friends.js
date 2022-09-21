import React from "react";
import '../App.css';
import firebaseConfig from '../firebaseConfig';
import Firebase from "../Firebase"
import { Card, ImageHeader, CardBody, CardFooter } from 'react-simple-card';

var database = Firebase.database();

class Friends extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            FriendRequestsData: []
        };
        this.message = this.message.bind(this);
    }

    componentDidMount = () => {

    }

    message = (friendId, userId, e) => {
        // alert(friendId)
        // alert(userId)
    }

    render() {
        return (
            <div>
                {console.log("what is this?", this.props.friends)}
                {this.props.friends ?

                    <div className='UserCard'>
                        <div className='UserCardTop'>
                            <img src={this.props.friends.profile_picture} />
                        </div>
                        <div className='UserCardBottom userText'>
                            <p>{this.props.friends.username}</p>
                            <p>{this.props.friends.occupation}</p>
                            <p>{this.props.friends.bio}</p>
                            <p>{this.props.friends.location}</p>
                            {/* <button  onClick={e => {this.message(this.props.friends.userId,this.props.thisUser,e)}}className="btn">Message</button> */}
                            <a href={`/message/${this.props.friends.userId + "&" + this.props.thisUser}`} className="btn">Message</a>
                        </div>
                    </div>

                    : console.log('nada')
                }
            </div>

        )
    }
}
export default Friends;
