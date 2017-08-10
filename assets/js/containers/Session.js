import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { getState } from 'redux';
import SessionUI from '../presentationals/SessionUI';

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.stateProps = this.props.store.getState();

    this.state = {
      passage: "",
      firstPsalmRef: "",
      firstPsalmLyrics: "",
      firstPsalmNotes: "",
      secondPsalmRef: "",
      secondPsalmLyrics: "",
      secondPsalmNotes: "",
      openingNotes: "",
      messageNotes: "",
      closingNotes: "",
      book: "",
      chapter: ""
    }
  }

  componentDidMount() {
    this.getSessionInfo();
  }

  getSessionInfo() {
    axios.get('http://localhost:4000/api/worship_sessions/' + this.stateProps.sessionID)
      .then((response) => {
        const firstPsalm = response.data.data.firstPsalm;
        const secondPsalm = response.data.data.secondPsalm;
        const openingNotes = response.data.data.openingNotes;
        const messageNotes = response.data.data.messageNotes;
        const closingNotes = response.data.data.closingNotes;
        const book = response.data.data.book;
        const chapter = response.data.data.chapter;

        this.setState({
          openingNotes: openingNotes,
          messageNotes: messageNotes,
          closingNotes: closingNotes,
          book: book,
          chapter: chapter
        });

        const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + book + ".json";

        axios.get(bookURL)
          .then((response) => {
            const verses = response.data.chapters[chapter - 1].verses;
            const prettyVerses = verses.map((verse, index) => {
              return(verse[index+1]);
            });
            this.setState({
              passage: prettyVerses.join()
            });

            axios.get('http://localhost:4000/api/psalms/psalm/' + firstPsalm)
              .then((response) => {
                this.setState({
                  firstPsalmRef: response.data.data.psalm_ref,
                  firstPsalmLyrics: response.data.data.lyrics,
                  firstPsalmNotes: response.data.data.notes
                });

                axios.get('http://localhost:4000/api/psalms/psalm/' + secondPsalm)
                  .then((response) => {
                    this.setState({
                      secondPsalmRef: response.data.data.psalm_ref,
                      secondPsalmLyrics: response.data.data.lyrics,
                      secondPsalmNotes: response.data.data.notes
                    });
                  });
              });
          })
      });
  }

  render() {
    return (
      <SessionUI
        firstPsalmRef = {this.state.firstPsalmRef }
        firstPsalmLyrics = {this.state.firstPsalmLyrics}
        firstPsalmNotes = {this.state.firstPsalmNotes}
        secondPsalmRef = {this.state.secondPsalmRef }
        secondPsalmLyrics = {this.state.secondPsalmLyrics}
        secondPsalmNotes = {this.state.secondPsalmNotes}
        openingNotes = {this.state.openingNotes}
        messageNotes = {this.state.messageNotes}
        closingNotes = {this.state.closingNotes}
        passage={this.state.passage}
        book={this.state.book}
        chapter={this.state.chapter}
        stateProps={this.stateProps}
        store={this.props.store}
      />
    )
  }
}

export default Session
