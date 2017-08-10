import React from 'react';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

//Container component, home page for new visitors
class Home extends React.Component {
  render() {
    return (
      <header className={css(styles.hero)}>
        <h1 className={css(styles.title)}>Family Worship</h1>
        <h2 className={css(styles.subtitle)}>The easiest way to manage family worship sessions amidst the busyness of life.</h2>
        <div className={css(styles.buttonsRow)}>
          <Link to="signup" className={css(styles.link)}>
            <div className={css(styles.button)}>Create a Free Account</div>
          </Link>
          <Link to="login" className={css(styles.link)}>
            <div className={css(styles.button2)}>Login to Your Account</div>
          </Link>
        </div>
      </header>
    )
  }
}

const styles = StyleSheet.create({
    hero: {
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
          ), url('https://images.pexels.com/photos/250609/pexels-photo-250609.jpeg?w=940&h=650&auto=compress&cs=tinysrgb')
          no-repeat center center
        `,
        backgroundSize: "cover"
    },
    title: {
      color: "#DFCFAC",
      fontFamily: 'Gentium Book Basic',
      fontSize: "100px",
      fontWeight: "300"
    },
    subtitle: {
      color: "#828982",
      fontFamily: 'Open Sans',
      fontSize: "20px",
      marginTop: "10px",
      fontWeight: "300"
    },
    buttonsRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    button: {
      cursor: "pointer",
      background: "#F89D79",
      padding: "15px 40px",
      color: "white",
      marginTop: "40px",
      fontFamily: 'Gentium Book Basic',
      fontSize: "18px",
      borderRadius: "30px",
      textDecoration: "none"
    },
    button2: {
      cursor: "pointer",
      background: "#FFFFFF",
      padding: "15px 40px",
      color: "#F89D79",
      marginTop: "40px",
      borderRadius: "30px",
      fontFamily: 'Gentium Book Basic',
      fontSize: "18px",
      textDecoration: "none"
    },
    link: {
      textDecoration: "none",
      marginRight: "30px"
    }
});

export default Home
