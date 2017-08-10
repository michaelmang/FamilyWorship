import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import UpdateSession from '../actions/UpdateSession';

class SessionNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      finished: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEndSession = this.handleEndSession.bind(this);
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  };

  handleEndSession(active) {
    axios({
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      },
      url: 'http://localhost:4000/api/worship_sessions/' + this.props.stateProps.sessionID
    })
      .then((response) => {
        this.props.store.dispatch(UpdateSession(""));
        this.setState({
          finished: true
        })
      });
  }

  render() {
    return (
      <div>
      {this.state.finished ? (
          <Redirect to="/dashboard"/>
        ) : (
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab
              label="Opening Prayer"
              value="a"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>Notes</h2>
                <p className={css(styles.paragraph)}>
                  {this.props.openingNotes}
                </p>
              </div>
            </Tab>
            <Tab
              label="First Psalm"
              value="b"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>Psalm {this.props.firstPsalmRef}</h2>

                <h4 className={css(styles.label)}>Lyrics</h4>
                <p className={css(styles.paragraph)}>
                {this.props.firstPsalmLyrics}
                </p>

                <h4 className={css(styles.label)}>John Brown of Haddington Notes</h4>
                <p className={css(styles.paragraph)}>
                {this.props.firstPsalmNotes}
                </p>
              </div>
            </Tab>
            <Tab
              label="Passage"
              value="c"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>{this.props.book} {this.props.chapter}</h2>
                <p className={css(styles.paragraph)}>
                  {this.props.passage}
                </p>
              </div>
            </Tab>
            <Tab
              label="Message"
              value="d"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>Notes</h2>
                <p className={css(styles.paragraph)}>
                  {this.props.messageNotes}
                </p>
              </div>
            </Tab>
            <Tab
              label="Second Psalm"
              value="e"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>Psalm {this.props.secondPsalmRef}</h2>

                <h4 className={css(styles.label)}>Lyrics</h4>
                <p className={css(styles.paragraph)}>
                {this.props.secondPsalmLyrics}
                </p>

                <h4 className={css(styles.label)}>John Brown of Haddington Notes</h4>
                <p className={css(styles.paragraph)}>
                {this.props.secondPsalmNotes}
                </p>
              </div>
            </Tab>
            <Tab
              label="Closing Prayer"
              value="f"
              buttonStyle={{
                backgroundColor: "#1A374F",
                borderColor: "#FFFFFF"
              }}
            >
              <div
                style={{
                  paddingLeft: "5vw",
                  paddingRight: "5vw"
                }}
              >
                <h2 className={css(styles.title)}>Notes</h2>
                <p className={css(styles.paragraph)}>
                  {this.props.closingNotes}
                </p>
              </div>
            </Tab>
            <Tab
              label="End Session"
              value="g"
              onActive={this.handleEndSession}
              buttonStyle={{
                backgroundColor: "#F89D79",
                borderColor: "#FFFFFF"
              }}
            >
              <div>
              </div>
            </Tab>
          </Tabs>
        )
      }
      </div>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#DFCFAC",
    fontFamily: 'Gentium Book Basic',
    fontSize: "34px",
    fontWeight: "300",
    marginTop: "20px",
    marginBottom: "15px"
  },
  label: {
    color: "#828982",
    fontFamily: 'Open Sans',
    textAlign: "left",
    marginBottom: "15px",
    marginTop: "15px",
    fontSize: "24px",
    fontWeight: "400"
  },
  paragraph: {
    color: "#828982",
    fontFamily: 'Open Sans',
    textAlign: "left",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "300"
  }
});

export default SessionNavigation;
