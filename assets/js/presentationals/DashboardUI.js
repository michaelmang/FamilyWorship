import React from 'react';
import { StyleSheet, css } from 'aphrodite';
var moment = require('moment');
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import axios from 'axios';

import SessionCard from './SessionCard';

//Presentational React Component
class DashboardUI extends React.Component {
  constructor() {
    super();

    this.state = {
      openDialog: false,
      books: [
        'Genesis',         'Exodus',          'Leviticus',     'Numbers',
        'Deuteronomy',     'Joshua',          'Judges',        'Ruth',
        '1 Samuel',        '2 Samuel',        '1 Kings',       '2 Kings',
        '1 Chronicles',    '2 Chronicles',    'Ezra',          'Nehemiah',
        'Esther',          'Job',             'Psalm',         'Proverbs',
        'Ecclesiastes',    'Song of Solomon', 'Isaiah',        'Jeremiah',
        'Lamentations',    'Ezekiel',         'Daniel',        'Hosea',
        'Joel',            'Amos',            'Obadiah',       'Jonah',
        'Micah',           'Nahum',           'Habakkuk',      'Zephaniah',
        'Haggai',          'Zechariah',       'Malachi',       'Matthew',
        'Mark',            'Luke',            'John',          'Acts',
        'Romans',          '1 Corinthians',   '2 Corinthians', 'Galatians',
        'Ephesians',       'Philippians',     'Colossians',    '1 Thessalonians',
        '2 Thessalonians', '1 Timothy',       '2 Timothy',     'Titus',
        'Philemon',        'Hebrews',         'James',         '1 Peter',
        '2 Peter',         '1 John',          '2 John',        '3 John',
        'Jude',            'Revelation'
      ],
      date: "",
      time: "",
      openingNotes: "",
      firstPsalm: "",
      book: "",
      chapters: [],
      chapter: "",
      messageNotes: "",
      secondPsalm: "",
      closingNotes: "",
      verses: "",
      sessionsResponse: []
    };

    this.handleAddSession =  this.handleAddSession.bind(this);

    this.handleNewSession =  this.handleNewSession.bind(this);

    this.handleClose = this.handleClose.bind(this);

    this.handleDate = this.handleDate.bind(this);

    this.handleTime = this.handleTime.bind(this);

    this.handleOpeningNotes = this.handleOpeningNotes.bind(this);

    this.handleFirstPsalm = this.handleFirstPsalm.bind(this);

    this.handleBook = this.handleBook.bind(this);

    this.handleChapter = this.handleChapter.bind(this);

    this.handleMessageNotes =  this.handleMessageNotes.bind(this);

    this.handleSecondPsalm = this.handleSecondPsalm.bind(this);

    this.handleClosingNotes =  this.handleClosingNotes.bind(this);
  }

  componentDidMount() {
    this.getSessions();
  }

  getSessions() {
    axios.get('https://sheltered-mesa-51446.herokuapp.com/api/worship_sessions/user_sessions/' + this.props.stateProps.id)
      .then((response) => {
        this.setState({
          sessionsResponse: response.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAddSession() {
    this.setState({
      openDialog: true
    });
  }

  handleNewSession() {
    axios({
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: 'https://sheltered-mesa-51446.herokuapp.com/api/worship_sessions',
      data: {
        worship_session: {
          date: this.state.date,
          time: this.state.time,
          openingNotes: this.state.openingNotes,
          firstPsalm: this.state.firstPsalm,
          book: this.state.book,
          chapter: this.state.chapter,
          verses: this.state.verses,
          messageNotes: this.state.messageNotes,
          secondPsalm: this.state.secondPsalm,
          closingNotes: this.state.closingNotes,
          user_id: this.props.stateProps.id
        }
      }
    })
    .then((response) => {
      console.log(response);
      this.handleClose();
      this.getSessions();
      this.forceUpdate.bind(this);
    })
    .catch(e => {
      console.log(e);
    });
  }

  handleClose() {
    this.setState({
      openDialog: false
    });
  }

  handleDate(event, date) {
    const day = moment(date).format('MM/DD/YYYY');
    this.setState({
      date: day
    });
  }

  handleTime(event, date) {
    const time = moment(date).format("hh:mm a")
    this.setState({
      time: time
    });
  }

  handleOpeningNotes(event) {
    this.setState({
      openingNotes: event.target.value
    });
  }

  handleFirstPsalm(searchText) {
    this.setState({
      firstPsalm: searchText
    });
  }

  handleBook(searchText) {
    this.setState({
      book: searchText
    }, () => {
      const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + this.state.book + ".json";
      axios.get(bookURL)
        .then((response) => {
          const length = response.data.chapters.length;
          let chapters = [];
          for(let i = 0; i < length; i++) {
            let num = i + 1;
            let numPush = num.toString();
            chapters.push(numPush)
          }
          this.setState({
            chapters: chapters
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });

  }

  handleChapter(searchText) {
    this.setState({
      chapter: searchText
    }, () => {
      const bookURL = "https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/" + this.state.book + ".json";
      axios.get(bookURL)
        .then((response) => {
          const verses = response.data.chapters[this.state.chapter - 1].verses.length;
          this.setState({
            verses: verses
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  handleMessageNotes(event) {
    this.setState({
      messageNotes: event.target.value
    });
  }

  handleSecondPsalm(searchText) {
    this.setState({
      secondPsalm: searchText
    });
  }

  handleClosingNotes(event) {
    this.setState({
      closingNotes: event.target.value
    });
  }

  render() {
    const sessionCards = this.state.sessionsResponse.map((session, index) =>
      <SessionCard
        store = {this.props.store}
        key={index}
        book={session.book}
        chapter={session.chapter}
        date={session.date}
        time={session.time}
        id={session.id}
      />
    );

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        labelStyle={{color: "#828982"}}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm New Session"
        primary={true}
        keyboardFocused={false}
        backgroundColor={"#F89D79"}
        hoverColor={"#1A374F"}
        labelStyle={{color: "#FFFFFF"}}
        onTouchTap={this.handleNewSession}
      />,
    ];

    let psalms = [];

    for (let i = 0; i < 150; i++) {
      let num = i + 1;
      let numString = num.toString();
      psalms.push(numString);
    }

    return (
      <div className="dashboard" style={{background: "#F5F7FA"}}>
        <div className={css(styles.topBar)}>
          <h1 className={css(styles.title)}>Family Worship</h1>
          <div className={css(styles.barRow)}>
            <h3 className={css(styles.family)}>Welcome {this.props.name}s</h3>
            <a target="_blank" href="https://www.paypal.me/mikemangialardi/25">
              <FlatButton
                icon={<ActionCardGiftcard color={"#FFFFFF"}/>}
                label="Support This Project"
                primary={true}
                keyboardFocused={false}
                backgroundColor={"#3ECF8E"}
                hoverColor={"#3ECF8E"}
                labelStyle={{color: "#FFFFFF"}}
                style={{marginLeft: "15px"}}
              />
            </a>
          </div>
        </div>

        <div className={css(styles.sessionsBody)}>
          <div className={css(styles.addSessionRow)}>
            <h2 className={css(styles.sessionsText)}>Sessions</h2>
            <RaisedButton
              onTouchTap = {this.handleAddSession}
              label="Add Session"
              labelColor="#FFFFFF"
              backgroundColor= "#F89D79"
              labelStyle={{
                fontFamily: 'Gentium Book Basic',
                fontSize: "18px",
                textTransform: "capitalize"
              }}
              style={{
                marginLeft: "20px"
              }}
            />
            {this.state.openDialog ? (
                <Dialog
                  title="Create New Session"
                  titleStyle={{
                    color: "#5F655F"
                  }}
                  actions={actions}
                  modal={false}
                  autoScrollBodyContent={true}
                  open={this.state.openDialog}
                  style={{
                    width: '100%',
                    maxWidth: 'none'
                  }}
                >
                  <h4 className={css(styles.label)}>Date:</h4>
                  <DatePicker
                    hintText="Pick a Date"
                    onChange={this.handleDate}
                  />
                  <h4 className={css(styles.label)}>Time:</h4>
                  <TimePicker
                    hintText="Pick a Time"
                    onChange={this.handleTime}
                  />
                  <h4 className={css(styles.label)}>Opening Prayer Notes:</h4>
                  <TextField
                    hintText="Type as many lines as you want..."
                    multiLine={true}
                    fullWidth={false}
                    value={this.state.openingNotes}
                    onChange={this.handleOpeningNotes}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                  <h4 className={css(styles.label)}>First Psalm:</h4>
                  <AutoComplete
                    hintText="i.e. 150"
                    dataSource={psalms}
                    openOnFocus={true}
                    maxSearchResults={3}
                    filter={AutoComplete.fuzzyFilter}
                    onUpdateInput={this.handleFirstPsalm}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                  <h4 className={css(styles.label)}>Book:</h4>
                  <AutoComplete
                    hintText="i.e. Genesis"
                    dataSource={this.state.books}
                    openOnFocus={true}
                    maxSearchResults={3}
                    filter={AutoComplete.fuzzyFilter}
                    onUpdateInput={this.handleBook}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                  <h4 className={css(styles.label)}>Chapter:</h4>
                  <AutoComplete
                    hintText="i.e. 3"
                    dataSource={this.state.chapters}
                    openOnFocus={true}
                    maxSearchResults={3}
                    filter={AutoComplete.fuzzyFilter}
                    onUpdateInput={this.handleChapter}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                  <h4 className={css(styles.label)}>Message Notes:</h4>
                  <TextField
                    hintText="Type as many lines as you want..."
                    multiLine={true}
                    fullWidth={false}
                    value={this.state.messageNotes}
                    onChange={this.handleMessageNotes}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                  <h4 className={css(styles.label)}>Second Psalm:</h4>
                  <AutoComplete
                    hintText="i.e. 150"
                    dataSource={psalms}
                    openOnFocus={true}
                    maxSearchResults={3}
                    filter={AutoComplete.fuzzyFilter}
                    onUpdateInput={this.handleSecondPsalm}
                  />
                  <h4 className={css(styles.label)}>Closing Prayer Notes:</h4>
                  <TextField
                    hintText="Type as many lines as you want..."
                    multiLine={true}
                    fullWidth={false}
                    value={this.state.closingNotes}
                    onChange={this.handleClosingNotes}
                    underlineFocusStyle={{borderColor: "#F89D79"}}
                  />
                </Dialog>
              ) : (
                <div></div>
              )
            }
          </div>
          <div className={css(styles.sessionsRow)}>
          {sessionCards}
          </div>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "75px",
    width: "100vw",
    padding: "30px",
    paddingLeft: "50px",
    paddingRight: "50px",
    background: "white",
    boxShadow: `2px 9px 18px -5px rgba(0,0,0,0.18)`
  },
  title: {
    color: "#DFCFAC",
    fontFamily: 'Gentium Book Basic',
    fontSize: "30px",
    fontWeight: "300",
    marginTop: "-5px"
  },
  family: {
    color: "#828982",
    fontFamily: 'Open Sans',
    fontSize: "16px",
    fontWeight: "400"
  },
  sessionsBody: {
    position: "relative",
    width: "100vw",
    height: "100%"
  },
  addSessionRow: {
    paddingLeft: "50px",
    paddingRight: "50px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  sessionsText: {
    color: "#828982",
    fontFamily: 'Open Sans',
    fontSize: "24px",
    fontWeight: "400"
  },
  barRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  sessionsRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "30px",
    paddingLeft: "50px",
    paddingRight: "50px",
    background: "none"
  },
  label: {
    color: "#828982",
    fontFamily: 'Open Sans',
    textAlign: "left",
    marginBottom: "5px",
    marginTop: "5px",
    fontSize: "16px",
    fontWeight: "400"
  }
});

export default DashboardUI
