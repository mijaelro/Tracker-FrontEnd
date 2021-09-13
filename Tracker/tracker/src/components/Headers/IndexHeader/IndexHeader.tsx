import React from "react";
import { Container } from "reactstrap";

function IndexHeader() {
  
  let pageHeader:any = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform ="translate3d(0," + windowScrollTop + "px,0)";
      };
        window.addEventListener("scroll", updateScroll);
    return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
              backgroundImage:
              "url(" + require("../../../assets/img/header.jpg").default + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("../../../assets/img/now-logo.png").default}
            ></img>
            <h1 className="h1-seo">N-Tracker App</h1>
            <h3>A simple app to keep track of your things.</h3>
            <h5 className="category ">scroll down to see content  <br/>  ⬇ 📜 ⬇ </h5>
          </div>
        
        </Container>
      </div>
  );
}

export default IndexHeader;
