import * as React from 'react';

class Nav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
  }

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getCoordinates);
  } else {
  console.log("Geolocation is not supported by this browser.");
  }
}

getCoordinates(position) {
  console.log(position)
}

  render() {
    return (
      <div className="Nav">
        <h2>Geolocation</h2>
        <button onClick={this.getLocation}>Get Coords</button>
        <h4>HTML5 Coords</h4>
        <p>Latitude {this.state.latitude}</p>
        <p>Longitude {this.state.longitude}</p>
        <h4>Google Maps Geocoding</h4>
        <p>Address: this.state.userAddress</p>
      </div>
    )
  }
}

export default Nav;