import React from 'react';
import '../App.css';

class Banner extends React.Component {
  render() {
    return (
      <div>
        {/* <div class="jumbotron">
          <h1 class="display-3">The Friendship Cure</h1>
          <p class="lead">This site was inspired by The Friendship Cure, a book written by the journalist, Kate Leaver.</p>
          <hr class="my-4" />
        </div>

  <div class="lined-paper">
    <div class="top-margin">
    </div>
    <div class="left-margin">
      </div><p>Hello, there! If you try this app and still can't even get close to making one good, lasting friendship, then don't give up...but know your problems are bigger than you thought Lol jk, then send suggestions and invite me to a cup of coffee. <br />-Joscandy</p>
    </div> */}
     <div class="row">
      <div class="col s6 push-s6">
         <div class="jumbotron">
          <h1 class="display-3">The Friendship Cure</h1>
          <p class="lead">This site was inspired by The Friendship Cure, a book written by the journalist, Kate Leaver.</p>
          <hr class="my-4" />
        </div>
      </div>
      <div class="col s6 pull-s6">
      <div class="lined-paper">
    <div class="top-margin">
    </div>
    <div class="left-margin">
      </div><p>Hello, there! If you try this app and still can't even get close to making one good, lasting friendship, then don't give up...but know your problems are bigger than you thought Lol jk, then send suggestions and invite me to a cup of coffee. <br />-Joscandy</p>
    </div> 
     </div>
    </div>
        <br />
       </div>
    )
  }
}

export default Banner;