import { successColor } from "assets/jss/material-dashboard-react.jsx";

const authStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  authWrapper: {
    height: '100vh',
    top: "0",
    display: "flex",
    alignItems: "center",
    paddingRight: "15px",
    paddingLeft: "15px",
    minWidth: "0px"
  },
  authContainer: {
    ['@media (min-width: 650px)']:{
      margin: "auto",
      display: "flex",
      alignItems: "center"
    },
    ['@media (max-width: 649px)']:{
      margin: "auto",
      width: "100%",
      maxWidth: "300px"
    },
    minWidth: "0px"
  },
  authRight: {
    ['@media (min-width: 650px)']:{
      width: "300px"
    },
    width: "100%",
    minWidth: "150px"
  },
  authLeft: {
    ['@media (min-width: 650px)']:{
      width: "300px"
    },
    ['@media (min-width: 330px)']:{
      minHeight: "226px"
    },
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minWidth: "150px"
  },
  img: {
    minWidth: '0px',
    maxWidth: '320px',
    width: '100%'
  }
};

export default authStyle;
