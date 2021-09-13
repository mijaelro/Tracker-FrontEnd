import "./About.css";

function About(): JSX.Element {
    return (
        <div className="section niceBg">
        <div className="About ">
			<h1 id="niceTitle">About</h1>
            <span>This is a Tracker management page , built with React.js and Spring Framework</span> <br />
            <span>To see the page functionalities you have to sign up or login </span> <br /><br />
            
                <h4 id="niceTitle3">Admin:</h4>
                <ul>
                    <li>Update User</li>
                    <li>Get Todo/Expense/Link/User</li>
                    <li>Add Todo/Expense/Link/User</li>
                    <li>Delete Todo/Expense/Link/User</li>
                    <li>Get All Todos/Expenses/Links/Users</li>
                   
                </ul>

                <h4 id="niceTitle3">User:</h4>
                <ul>
                    <li>Get User Todo/Link/Expense</li>
                    <li>Delete User Todo/Link/Expense</li>
                    <li>Update User Todo/Link/Expense</li>
                    <li>Get All User Todos/Links/Expenses</li>
                </ul>                
                <br />
                <span>Made by <a href="https://www.linkedin.com/in/mijael-rofe-42a264180/" target="_blank"  rel="noreferrer" >Mijael Rofe</a></span><br />
                      
                </div>
        </div>
    );
};

export default About;