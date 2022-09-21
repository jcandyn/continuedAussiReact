import React from 'react'

class Profile extends React.Component {
    render() {
        return (
            <div>
                {console.log("user info", this.props.userData)}
                <h1>Hi, {this.props.name}! </h1>
                <img src={this.props.profile_picture}></img>
            </div>
        )
    }
}

export default Profile