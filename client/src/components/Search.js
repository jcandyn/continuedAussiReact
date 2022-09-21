import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import '../App.css';
import Firebase from "../Firebase"
import Book from "./Book"


var database = Firebase.database();
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isFormFilledOut: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMultiple = this.handleMultiple.bind(this);
  }

  componentDidMount = () => {
    console.log(M);
    M.AutoInit();

    let childData;
    var leadsRef = database.ref('users/' + this.props.userId);
    leadsRef.on('value', snapshot => {
      childData = snapshot.val();

    });

  }

  //   showPosition = (position) => {
  //     const location = "Latitude: " + position.coords.latitude +
  //     "<br>Longitude: " + position.coords.longitude;
  //     console.log(location)
  //     database.ref('users/' + this.props.userId).update({
  //       "location" : location
  //     });
  //    }

  //   getLocation = (e) => {
  //    e.preventDefault()

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(this.showPosition);
  // } else {
  //   alert("Geolocation is not supported by this browser.");
  // }
  //   }

  handleMultiple(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    database.ref('users/' + this.props.userId).update({
      "hobbies": value
    });
  }

  toggleState = () => {

    this.setState({
      isFormFilledOut: !this.props.isFormFilledOut
    })

  }

  handleChange(event) {
    let value = event.target.value
    const name = event.target.name
    this.setState({ value: event.target.value });
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const answer = {
      bio: this.state.bio,
      occupation: this.state.occupation,
      location: this.state.location
    }

    this.updateUserObject()
    database.ref('users/' + this.props.userId).update({
      "isFormFilledOut": (!this.props.isFormFilledOut)

    });

    this.toggleState()
  }

  updateUserObject() {
    // alert("it's updating")
    database.ref('users/' + this.props.userId).update({
      "bio": this.state.bio,
      "occupation": this.state.occupation,
      "location": this.state.location
    });

    this.setState({
      bio: "",
      occupation: "",
      location: ""
    })
  }




  render() {

    return (
      <div>
        {this.props.isFormFilledOut ? < Book username={this.props.username} /> :
          <div className="search">
            <div class="section no-pad-bot" id="index-banner">
              <div class="container">
                {/* <h1 class="header center pink-text text-lighten-3">Hey!</h1> */}
                <div class="row center">
                  <h5 class="header col s12 light grey-text text-lighten-1">let's answer a few questions</h5>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">

                <form onSubmit={this.handleSubmit}>
                  {/* <i class="material-icons prefix">search</i> */}
                  <div class="row">
                    <div class="row">
                      <div class="row">
                        <div class="input-field">
                          <i class="material-icons prefix">mode_edit</i>
                          <textarea type="submit" name="bio" value={this.state.bio} onChange={this.handleChange} id="icon_prefix" class="materialize-textarea" data-length="120"></textarea>
                          <label for="icon_prefix">Tell your future friend about yourself</label>
                        </div>
                        <div class="row">
                          <div class="input-field">
                            <i class="material-icons prefix">work</i>
                            <input type="text" value={this.state.occupation} onChange={this.handleChange} id="icon_prefix" name="occupation" />
                            <label for="icon_prefix">What's your occupation?</label>
                          </div>
                        </div>
                        <div class="row">
                          <div class="input-field">
                            <i class="material-icons prefix">edit_location</i>
                            <input type="text" value={this.state.location} onChange={this.handleChange} id="icon_prefix" name="location" />
                            <label for="icon_prefix">Where do you live?</label>
                            <span class="helper-text" data-error="wrong" data-success="right">Please write city, state, and country. For example, Philadelphia, PA USA</span>
                          </div>
                        </div>
                        <div class="row">
                          <i class="material-icons prefix">local_pizza</i>
                          <div class="input-field col s12">
                            <select value={this.state.hobbies} onChange={this.handleMultiple} name="hobbies" ref="dropdown" multiple>
                              <option value="Listening to Podcasts" name="Listening to Podcasts">Listening to Podcasts</option>
                              <option value="Reading" name="Reading">Reading</option>
                              <option value="Going to the Gym">Going to the gym</option>
                              <option value="Watching Shows">Watching shows</option>
                              <option value="Clubbing">Clubbing</option>
                              <option value="Shopping">Shopping</option>
                              <option value="Eating Out">Eating Out</option>
                              <option value="Outdoors/Hiking/Camping">Outdoors/Hiking/Camping</option>
                            </select>
                            <label>Hobbies</label>
                            {/* <button onClick={this.getLocation} className="btn">
     <i className="material-icons right">edit_location</i>
    What's your location?</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>



            <button onClick={this.handleSubmit} className="btn waves-effect waves-light">
              <i class="material-icons left">thumb_up</i>
              Find Friend
  </button>
          </div>
        }
      </div>
    )
  }
}



export default Search;