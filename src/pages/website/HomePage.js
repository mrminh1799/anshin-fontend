import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import  makeStyles  from '@mui/styles';
// @material-ui/icons
// core components
//import Header from "../../components/webapp/header/Header";
// import Footer from "../../components/Footer/Footer.js";
//import Parallax from "../../components/webapp/parallax/Parallax";
import Grid from '@mui/material/Grid';
// sections for this page
//import HeaderLinks from "../../components/webapp/header/HeaderLink";
import styles from "../../assets/jss/material-kit-react/views/components.js";

// const useStyles = makeStyles(styles);

export default function HomePage(props) {
  // const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      abc
      {/* <Header
        brand={""}
        // rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("../../assets/img/backgrou.jpg").default}>
        <div className={classes.container}>
          <Grid container>
            <Grid>
              <div className={classes.brand}>
                <h1 className={classes.title}>NỀN TẢNG Y TẾ</h1>
                <h3 className={classes.subtitle}>CHĂM SÓC MẮT TOÀN DIỆN</h3>
              </div>
            </Grid>
          </Grid>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        {props.children}
      </div>
      {/* <Footer /> */}
    </div> 
  );
}