import { Link, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";

const NavBar = () => {
    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();

    const logOut = () => {
        signOut();
        navigate('/');
    } 

    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <nav className="navbar is-success" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/" style={{ fontSize: '30px' }}>
                        <i className="fa fa-fw fa-paw"></i>
                        PetMap
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="https://www.google.com/">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/map">
                            <i className="fa fa-fw fa-home"></i>
                            Home
                        </Link>

                        <a className="navbar-item" href="https://github.com/AdanH2/PetMap">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="https://www.google.com/">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item" href="https://www.google.com/">
                                    About
                                </a>

                                <a className="navbar-item" href="https://www.google.com/">
                                    Jobs
                                </a>

                                <a className="navbar-item" href="https://www.google.com/">
                                    Contact
                                </a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item" href="https://www.google.com/">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            {
                                isAuthenticated() ?
                                    (
                                        <div className="buttons">
                                            <Link className="button is-light" to="/profile">
                                                <i className="fa fa-fw fa-user"></i>
                                                <strong>{auth().username}'s Profile</strong>
                                            </Link>
                                            <button className="button is-light" onClick={logOut}>
                                                <strong>Log Out</strong>
                                            </button>
                                        </div>
                                    )
                                :
                                    (
                                        <div className="buttons">
                                            <Link className="button is-light" to="/signup">
                                                <strong>Sign Up</strong>
                                            </Link>
                                            <Link className="button is-light" to="/login">
                                                <i className="fa fa-fw fa-user"></i>
                                                <strong>Log In</strong>
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;