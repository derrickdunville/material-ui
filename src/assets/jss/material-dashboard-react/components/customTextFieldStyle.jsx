import {
  textColor,
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "assets/jss/material-dashboard-react.jsx";

const customTextFieldStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  input: {
    color: textColor,
    backgroundColor: '#202225',
  },

  focusedInput: {
    color: "#ffffff !important",
    border: "#0fed8a",
  },
  focusedLabel: {
    color: "#ffffff !important",
    zIndex: "1",
  },
  shrink: {
    zIndex: "2",
    backgroundColor: "transparent !important"
  },
  root: {
    "&:hover:not($disabled) $notchedOutline": {
      borderColor: "#000000 !important",
      zIndex: "1"
    },
    height: "100%"
  },
  rootLabel: {
    color: "#ffffff !important",
    zIndex: "1"
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857"
  },
  labelRootError: {
    color: dangerColor
  },
  labelRootSuccess: {
    color: successColor
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "5px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "0px 0 0 0",
    position: "relative"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "#07C16E",
    },
    color: '#ffffff !important',
    zIndex: "1"
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: "#0fed8a",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "#07C16E",
      boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
    },
    borderRadius: "4px",
    WebkitAutofill: {
      backgroundColor: "#565656"
    }
  },
  notchedOutline: {},
};

export default customTextFieldStyle;
