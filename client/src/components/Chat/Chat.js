
import React from 'react'
import '../Chat/Chat.css';
import $ from 'jquery'; 
import Firebase from "../../Firebase"

var database = Firebase.database();

var data = {
  baseURL: "https://day-7-messaging.firebaseio.com/",
  profileImage: "https://pbs.twimg.com/media/Diz0a9BWAAEol5v.jpg",
  messages: {},
  prevChats: [
    {
      lastText: "",
      sender: {
        name: "Public Chatroom",
        profileImage: "https://zephyo.github.io/22Days/code/7/graphics/users.svg"
      }
    },
    {
      lastText: "Hey, wanna get boba? 😊 I found a really cool place that u might like",
      sender: {
        name: "Madie 💗",
        profileImage: "https://pbs.twimg.com/media/DiPs3H7V4AAvnmT.jpg"
      }
    },
    {
      lastText: "k I'm off to procure sustenance",
      sender: {
        name: "best bench",
        profileImage: "https://pbs.twimg.com/media/Ds89x98UUAA_7xY.jpg"
      }
    },
    {
      lastText: "Lia sent a photo.",
      sender: {
        name: "Lia",
        profileImage: "https://pbs.twimg.com/media/DupPZcMXgAY339e.jpg"
      }
    }
  ]
}
var msgName = "messages"



//App Container
class Chat extends React.Component {
constructor(props) {
  super(props);
  this.state = data;
}

componentWillMount() {
  if (this.props.user) {
  this.login()
  this.setState({
    firebaseRef: database.ref(msgName),
  }, this.update);
  }
}

update = () =>
{    

  this.state.firebaseRef.on("value", 
                            (snapshot) => {
    this.setState({
      messages: snapshot.val()
    }, ()=>{
      if (this.state.messages)
     {
         var last = Object.keys(this.state.messages)[Object.keys(this.state.messages).length-1];
        var prev = this.state.prevChats;
        prev[0].lastText =  this.state.messages[last].message;
       this.setState({
         prevChats: prev
       });
        this.scrollWindow();
     }
    });
  });
}

login = () => {
  let userName;
  let photo;
  var leadsRef = database.ref('users/' + this.props.user);
  leadsRef.on('value', snapshot => {
    let childData = snapshot.val();
   console.log("tempArray",childData)
  userName = childData.username
  photo = childData.profile_picture
});


  var user = {
    name: userName,
    photo: photo
  };
  if (user.name) {
    this.setState({ thisUser: user });
  }
};

handleSubmit = () => {
  var value = $(".messageInput").val();
  if (value.length === 0) {
    
    return;
  }
  var message = {
    sender: this.state.thisUser,
    message: value
  };

  this.postMessage(message);
  $(".messageInput").val("");
};

postMessage(message) {
  // Get a key for a new Post.
  var newPostRef = this.state.firebaseRef.push();

  newPostRef.set(message, this.scrollWindow);
}

scrollWindow = () => {
  var windowHeight = $(".Messages").height();
  $(".container").animate(
    { scrollTop: $(".container")[0].scrollHeight },
    500
  );
}

render() {
  return (
    <div>
    {this.state.thisUser ?  <div className="Chat">
    <Conversation
      messages={this.state.messages}
      recipient={this.state.recipient}
      onSubmit={this.handleSubmit}
      thisUser={this.state.thisUser}
    />
    <Profile
      thisUser={this.state.thisUser}
      prevChats={this.state.prevChats}
      profileImage={this.state.thisUser.photo}
    />
   {/* {!this.state.thisUser ? <LoginForm login={this.login} /> : null} */}
  </div> : <h3>Sign in to use the app</h3>}
   </div>
  );
}
}


//Conversation
class Conversation extends React.Component {
 constructor(props) {
  super(props);
}

onChange = () => {
  if ($('.messageInput').val().length > 0){
    $('#send-button').css({
      "background":"#fad0c4" });
  }else{
     $('#send-button').css({
      "background":"white" });
  }
}

render ()
 { return (
    <div className="Conversation">
      <Header name="Public Chatroom" />
      <div className="container">
        <Messages messages={this.props.messages} thisUser={this.props.thisUser} />
      </div>
      <input
        className="messageInput"
        name="message"
        type="text"
        placeholder="type something"
        onChange={this.onChange}
      />
      <button className="btn send-button" id="send-button" onClick={this.props.onSubmit}>
        <i data-feather="send" />
      </button>
    </div>
  );
}
}

//Profile
var Profile = props => {
var prevchats = props.prevChats.map(function(chat, i) {
  return <PastChat lastText={chat.lastText} sender={chat.sender} />;
});
return (
  <div className="Profile">
    <div className="top-half">
    <h1>{props.thisUser ? props.thisUser.name : ""} </h1>
    {/* <p className="email">{props.thisUser ? props.thisUser.email : ""}</p> */}
    <img className="profileImage main" src={props.profileImage} />
    <div className="icons">
      <a href="#"><i data-feather="alert-circle" /></a>
       <a href="#" className="active"><i data-feather="message-circle" /></a>
       <a href="#"><i data-feather="home" /></a>
       <a href="#"><i data-feather="activity" /></a>
    </div>
    </div>
    <div className="prev-chats">{prevchats}</div>
  </div>
);
};

var PastChat = props => {
return (
  <div className="prev-chat">
    <img className="profileImage" src={props.sender.profileImage} />
    <h2>{props.sender.name}</h2>
    <p>{props.lastText}</p>
  </div>
);
};

//Header
var Header = props => {
return (
  <header>
    <i data-feather="chevron-left" />
    <div className="name">{props.name}</div>
  </header>
);
};


//Messages
var Messages = props => {
let messages=[];
for (var key in props.messages){
  var message = props.messages[key];
  messages.push(
     <Message
      message={message.message}
      sender={message.sender}
      thisUser={props.thisUser}
    />
  );
}

return <div className="Messages">{messages}</div>;
};

//Message
var Message = props => {
var classNames = "";
if (props.thisUser && props.sender.name == props.thisUser.name) {
  classNames = "Message you";
} else {
  classNames = "Message them";
}

return (
    <div className={classNames}>
    <span>{props.message}</span>
    <p>{props.sender.name}</p>
  </div>
);
};

//Render
// ReactDOM.render(<App />, document.getElementById("app"));
export default Chat;
// feather.replace();


