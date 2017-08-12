import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Redirect } from 'react-router-dom';
import { getState } from 'redux';
import axios from 'axios';

import StoreFamilyId from '../actions/StoreFamilyId';

//Container Component
class FamilySignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePic: "",
      finished: false
    };

    this.stateProps = this.props.store.getState();
  }

  handleName (event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    axios({
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      url: 'https://sheltered-mesa-51446.herokuapp.com/api/families',
      data: {
        family: {
          name: this.state.name,
          user_id: this.stateProps.id
        }
      }
    })
      .then((response) => {
        this.props.store.dispatch(StoreFamilyId(response.data.data.id));
        this.setState({ finished: true })
      });
  }


  render() {
    // ** ADD BACK WHEN IMAGE STORING RESOLVE ** //
    // <h4 className={css(styles.label)}>Upload Family Photo</h4>
    // <input
    //   type="file"
    //   placeholder="Upload Profile Picture"
    //   value={this.state.profilePic}
    //   onChange={this.handleProfilePic.bind(this)}
    //   accept="image/*"
    //   required
    // />
    return (
      <div className={css(styles.familySignup)}>
        <h1 className={css(styles.title)}> Enter Family Information </h1>
        <div>
        { this.state.finished ? (
            <Redirect to='/dashboard'/>
          ) : (
            <div className="family-signup">
              <div className="form">
                <form className="family-signup-form" onSubmit={this.handleSubmit.bind(this)}>
                  <h4 className={css(styles.label)}>Enter Faily Name</h4>
                  <input
                    type="text"
                    placeholder="i.e Luther"
                    value={this.state.name}
                    onChange={this.handleName.bind(this)}
                    required
                  />
                  <button
                    type="submit"
                    value="Submit"
                  >
                  Process to Dashboard
                  </button>
                </form>
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
    familySignup: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      background: `
        linear-gradient(
          rgba(26, 55, 79, 0.90),
          rgba(26, 55, 79, 0.90)
        ), url('https://images.pexels.com/photos/39691/family-pier-man-woman-39691.jpeg?w=940&h=650&auto=compress&cs=tinysrgb')
        no-repeat center center
      `,
      backgroundSize: "cover"
    },
    title: {
      color: "#DFCFAC",
      fontFamily: 'Gentium Book Basic',
      fontSize: "40px",
      fontWeight: "300",
      textAlign: "center",
      '@media (max-width: 700px)': {
        fontSize: "30px"
      }
    },
    label: {
      color: "#828982",
      fontFamily: 'Open Sans',
      textAlign: "left",
      marginBottom: "10px",
      fontSize: "20px",
      fontWeight: "300"
    }
});

export default FamilySignup
