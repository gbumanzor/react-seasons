import React from 'react';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

export default class App extends React.Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        this.setState({
          lat: position.coords.latitude,
        }),
      (error) =>
        this.setState({
          errorMessage: error.message,
        })
    );
  }

  renderContent() {
    if (!this.state.lat && this.state.errorMessage) {
      return (
        <div>
          <p>Error: {this.state.errorMessage}</p>
        </div>
      );
    }
    if (this.state.lat && !this.state.errorMessage) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return <Spinner message="Please accept the location request..." />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
