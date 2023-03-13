import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar is-success" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt=""/>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="https://www.google.com/">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <Link class="navbar-item" to="/map">
                    Home
                </Link>

                <a class="navbar-item" href="https://github.com/AdanH2/PetMap">
                    Documentation
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="https://www.google.com/">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="https://www.google.com/">
                            About
                        </a>

                        <a class="navbar-item" href="https://www.google.com/">
                            Jobs
                        </a>

                        <a class="navbar-item" href="https://www.google.com/">
                            Contact
                        </a>
                        <hr class="navbar-divider"/>
                        <a class="navbar-item" href="https://www.google.com/">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <Link class="button is-light" to="/signup">
                            <strong>Sign Up</strong>
                        </Link>
                        <Link class="button is-light" to="/login">
                            <strong>Log In</strong>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar;