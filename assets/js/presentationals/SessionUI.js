import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import SessionNavigation from './SessionNavigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class SessionUI extends React.Component {
  render() {
    return (
      <div className={css(styles.session)}>
        <MuiThemeProvider>
          <SessionNavigation
            firstPsalmRef = {this.props.firstPsalmRef }
            firstPsalmLyrics = {this.props.firstPsalmLyrics}
            firstPsalmNotes = {this.props.firstPsalmNotes}
            secondPsalmRef = {this.props.secondPsalmRef }
            secondPsalmLyrics = {this.props.secondPsalmLyrics}
            secondPsalmNotes = {this.props.secondPsalmNotes}
            openingNotes = {this.props.openingNotes}
            messageNotes = {this.props.messageNotes}
            closingNotes = {this.props.closingNotes}
            passage={this.props.passage}
            book={this.props.book}
            chapter={this.props.chapter}
            stateProps={this.props.stateProps}
            store={this.props.store}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  session: {
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF"
  }
});

export default SessionUI
