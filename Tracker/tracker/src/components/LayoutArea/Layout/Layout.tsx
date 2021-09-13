import React from "react";
import { HashRouter } from "react-router-dom";
import DarkFooter from "../../Footers/DarkFooter";
import IndexHeader from "../../Headers/IndexHeader/IndexHeader";
import IndexNavbar from "../../Headers/Navbars/IndexNavbar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    React.useEffect(() => {
          document.body.classList.add("index-page");
          document.body.classList.add("sidebar-collapse");
          document.documentElement.classList.remove("nav-open");
          window.scrollTo(0, 0);
          document.body.scrollTop = 0;
    return function cleanup() {
          document.body.classList.remove("index-page");
          document.body.classList.remove("sidebar-collapse");
        };
    });

  return (
    <HashRouter>
    <>
      <IndexNavbar />
        <div className="wrapper">
      <IndexHeader />
        <div className="main">
      <Routing/>
        </div>
      <DarkFooter />
        </div> 
    </>
    </HashRouter>
    );
}

export default Layout;
