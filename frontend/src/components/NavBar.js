import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <nav className="navbar is-success" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/" style={{fontSize: '30px'}}>
                    <i class="fa fa-fw fa-paw"></i>
                    PetMap
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
                        <i class="fa fa-fw fa-home"></i>
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
                                <i class="fa fa-fw fa-user"></i>
                                <strong>Log In</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default NavBar;