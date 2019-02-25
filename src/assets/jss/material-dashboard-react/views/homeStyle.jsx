import bg from "assets/img/gray_texture.jpg"

const homeStyle = {
  home: {
    width: "100%",
  },
  bgContainer: {
    height: `calc(100vh)`
  },
  bg: {
    // backgroundImage: `url(${bg})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  welcome: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: `calc(100vh)`,
    marginTop: "-80px"
  }
};

export default homeStyle;
