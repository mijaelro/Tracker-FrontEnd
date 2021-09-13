import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientType from "../../../Models/ClientTypeModel";
import store from "../../../Redux/Store";
import AuthMenu from "../AuthMenu/AuthMenu";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";


function IndexNavbar() {

  const[client,setClient] = useState(store.getState().authState.client);
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  
  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
        ){
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
        ){
        setNavbarColor("navbar-transparent");
      }
    };
        window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
    };
  });

useEffect(()=>{
  const unsubscribe = store.subscribe(() => {
    setClient(store.getState().authState.client);
  })
return unsubscribe;
})

return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setCollapseOpen(false);
          }}
        />
        ) : null}

      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              target="_blank"
              id="navbar-brand"
            >
              N-Tracker-App
            </NavbarBrand>
              <UncontrolledTooltip target="#navbar-brand">
              Coded by Mijael Rofe
              </UncontrolledTooltip>
            
            <button 
              className="navbar-toggler navbar-toggler "
              onClick={() => {
                  document.documentElement.classList.toggle("nav-open");
                  setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            > 
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-normal"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar >
              
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Components</p>
                </DropdownToggle>
                
                <DropdownMenu>
                {!client?
                <>
                  <DropdownItem id="DropdownItem" tag={Link} to = "/home" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Home
                  </DropdownItem>

                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      About
                  </DropdownItem>
                </>

                   : client.clientType===ClientType.user?
                   <>
                  <DropdownItem to="/user/expenses" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Expenses
                  </DropdownItem>

                  <DropdownItem to="/user/links" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      links
                  </DropdownItem>

                  <DropdownItem to="/user/todos" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Todo's
                  </DropdownItem>

                  <DropdownItem id="DropdownItem" tag={Link} to = "/home" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Home
                  </DropdownItem>

                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      About
                  </DropdownItem>
                </>

                     : client.clientType===ClientType.admin?
                <>
                  <DropdownItem to="/admin/users" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Users
                  </DropdownItem>

                  <DropdownItem to="/admin/expenses" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Expenses
                  </DropdownItem>

                  <DropdownItem to="/admin/links" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Links
                  </DropdownItem>

                  <DropdownItem to="/admin/todos" tag={Link}>
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Todos
                  </DropdownItem>

                  <DropdownItem id="DropdownItem" tag={Link} to = "/home" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      Home
                    </DropdownItem>

                  <DropdownItem id="DropdownItem" tag={Link} to = "/about" exact="true">
                      <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                      About
                  </DropdownItem>
                </>
                     :null
                }

                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

          </Collapse>
          <AuthMenu/>
        </Container>
       
      </Navbar>
    </>
  );
}

export default IndexNavbar;
