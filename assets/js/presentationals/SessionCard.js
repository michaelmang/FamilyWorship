import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Redirect } from 'react-router-dom';

import UpdateSession from '../actions/UpdateSession';

class SessionCard extends React.Component {
  constructor() {
    super();

    this.state = { sessionStarted: false }

    this.handleStartSession =  this.handleStartSession.bind(this);
  }

  handleStartSession() {
    this.props.store.dispatch(UpdateSession(this.props.id));
    this.setState({
      sessionStarted: true
    });
  }

  render() {
    const title = this.props.book + " " + this.props.chapter
    const subtitle = this.props.date + " | " + this.props.time;
    return (
      <div>
        {this.state.sessionStarted ? (
          <Redirect to="/session"/>
        ) : (
          <Card
            style={{
              maxWidth: "300px",
              marginTop: "40px"
            }}
          >
            <CardMedia
              overlay={<CardTitle title={title} subtitle={subtitle} />}
            >
              <img src="https://images.pexels.com/photos/250609/pexels-photo-250609.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt="" />
            </CardMedia>
            <CardActions>
              <FlatButton
                label="Start Session"
                onTouchTap={this.handleStartSession}
              />
            </CardActions>
          </Card>
          )
        }
      </div>
    )
  }
}

export default SessionCard
