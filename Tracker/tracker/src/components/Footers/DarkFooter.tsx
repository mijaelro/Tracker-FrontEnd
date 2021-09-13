import { Container , UncontrolledTooltip } from "reactstrap";
import { useHistory } from "react-router";

function DarkFooter() {

  const history = useHistory(); 

  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/mijael-rofe-42a264180/" 
                 target="_blank" rel="noreferrer">
                    Mijael Rofe
              </a>
            </li>
          
            <li>
              <span id="haveAny"
              onClick={()=>history.push("/sendEmail")}
              >
                Have any Ideas? 
              </span>
            </li>
           
              <li>
                <a href="https://www.facebook.com/Mijael.Rofe"
                   target="_blank"
                   rel="noreferrer"
                   id="facebook-tooltip">
                    <i className="fab fa-facebook-square"></i>
                    <p className="d-lg-none d-xl-none">Facebook</p>
                </a>
                    <UncontrolledTooltip target="#facebook-tooltip">
                    Follow me on Facebook
                    </UncontrolledTooltip>
              </li>

            <li>
              <a href="https://www.instagram.com/mijaelro/"
                 target="_blank"
                 rel="noreferrer"
                 id="instagram-tooltip"
              >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
              </a>
                  <UncontrolledTooltip target="#instagram-tooltip">
                  Follow me on Instagram
                  </UncontrolledTooltip>
            </li>
          </ul>
        </nav>

        <div className="copyright" id="copyright">
           © {new Date().getFullYear()}, Made and Coded by{" "}
          <a href="https://www.linkedin.com/in/mijael-rofe-42a264180/" target="_blank" rel="noreferrer">
              Mijael Rofe
          </a>
        </div>

      </Container>
    </footer>
  );
}

export default DarkFooter;
