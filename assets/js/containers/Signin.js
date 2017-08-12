import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { getState } from 'redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import AuthenticateUser from '../actions/AuthenticateUser';
import StoreFamilyId from '../actions/StoreFamilyId';
import StoreId from '../actions/StoreId';
import Dashboard from './Dashboard';

//Container React Component
class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false
    };

    this.stateProps = this.props.store.getState();
  }

  componentDidMount() {
    this.props.store.subscribe(this.forceUpdate.bind(this));
  }

  handleEmail (event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    axios({
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      url: 'http://localhost:4000/api/sessions',
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
      .then((response) => {
        if(response.data.meta.token !== "") {
          this.props.store.dispatch(StoreId(response.data.data.id));
          axios.get('http://localhost:4000/api/families/family/' + response.data.data.id)
            .then((response) => {
              const familyID = response.data.data.id;
              this.props.store.dispatch(StoreFamilyId(familyID));
              this.props.store.dispatch(AuthenticateUser());
            })
        }
      })
      .catch((e) => {
        this.setState({ error: true })
      });
  }

  render() {
    const stateProps = this.props.store.getState()
    const authenticated = stateProps.authenticated;
    return (
      <div>
      { authenticated ? (
          <Redirect to='/dashboard'/>
        ) : (
          <div className="signin">
            <div className={css(styles.leftColumn)}>
              <div className="form">
                <form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
                  <input
                    type="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleEmail.bind(this)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handlePassword.bind(this)}
                  />
                  <button
                    type="submit"
                    value="Submit"
                  >
                  Login
                  </button>
                  {this.state.error ? (
                    <p className="message">
                      <span style={{color: "red"}}>Username or password incorrect.</span>
                    </p>
                  ) : (
                    <div></div>
                  )
                }
                </form>
              </div>
            </div>
            <div className={css(styles.rightColumn)}>
              <h1 className={css(styles.title)}>Login to Get Started</h1>
              <p className={css(styles.paragraph)}>
              And these words, which I command thee this day, shall be in thine heart:  And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up.
              <br/><br/>
              - Deut. 6:6-7
              </p>
            </div>
          </div>
        )
      }
      </div>
    )
  }
}

const styles = StyleSheet.create({
    leftColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "75vw",
        position: "absolute",
        left: "0%",
        top: "0%",
        background: `none`
    },
    rightColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "25vw",
        position: "absolute",
        right: "0%",
        top: "0%",
        background: `
          linear-gradient(
            rgba(26, 55, 79, 0.90),
            rgba(26, 55, 79, 0.90)
          ), url('https://images.pexels.com/photos/295208/pexels-photo-295208.jpeg?w=940&h=650&auto=compress&cs=tinysrgb')
          no-repeat center center
        `,
        backgroundSize: "cover"
    },
    title: {
      color: "#DFCFAC",
      fontFamily: 'Gentium Book Basic',
      fontSize: "30px",
      textAlign: "center",
      fontWeight: "300",
      '@media (max-width: 700px)': {
        display: "none"
      }
    },
    paragraph: {
      color: "#FFFFFF",
      fontFamily: 'Open Sans',
      lineHeight: "24px",
      fontSize: "14px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "20px",
      fontWeight: "300",
      '@media (max-width: 700px)': {
        display: "none"
      }
    }
});

export default Signin
