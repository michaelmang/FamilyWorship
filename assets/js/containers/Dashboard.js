import React from 'react';
import DashboardUI from '../presentationals/DashboardUI';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getState } from 'redux';
import {cyan500} from 'material-ui/styles/colors';
import axios from 'axios';

//Container React Component
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }

    this.stateProps = this.props.store.getState();
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/families/' + this.stateProps.familyID)
      .then((response) => {
        this.setState({ name: response.data.data.name });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const stateProps = this.props.store.getState();
    return (
      <div>
        <MuiThemeProvider>
          <DashboardUI name = {this.state.name} stateProps = {this.stateProps} store = {this.props.store}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Dashboard
