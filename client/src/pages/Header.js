import "../style/header.css";
import { Link } from "react-router-dom";
import homeIcon from "../images/homeIcon.png";
import addAdminIcon from "../images/crudIcons/addAdminIcon.png";
import adminIcon from "../images/adminIcon.jfif";
import userIcon from "../images/userIcon.jfif";
import statisticsIcon from "../images/statisticsIcon.png";
import loginIcon from "../images/crudIcons/loginIcon.png";
import logoutIcon from "../images/crudIcons/logoutIcon.jpg";
import { AuthContext } from "../utils/context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { authToken, currentUser } = useContext(AuthContext);
  const type = window.location.href.split("/")[3];
  const isAdmin = currentUser && currentUser.userType;
  return (
    <div key="container-homePage" className="container-homePage">
      <div className="home-container-left">
        <div className="homeLink">
          <Link to="/">
            <img
              className={`${type}`}
              title="home page"
              alt="home"
              src={homeIcon}
            />
          </Link>
        </div>
        {isAdmin && [
          <div className="homeLink add-admin" key="add-admin">
            <Link to="/crud/admin/user/signup">
              <img src={addAdminIcon} alt="admin icon" title="add admin" />
            </Link>
          </div>,
          <div className="homeLink" key="admin-page">
            <Link to="/crud/admin">
              <img alt="admin page" title="admin page" src={adminIcon} />
            </Link>
          </div>,
          <div className="homeLink" key="statistics-page">
            <Link to="/statistics/admin">
              <img alt="admin page" title="statistics" src={statisticsIcon} />
            </Link>
          </div>,
        ]}

        <div className="homeLink">
          <Link to="/crud/user">
            <img src={userIcon} title="user crud page" alt="user page" />
          </Link>
        </div>
      </div>
      <div className="home-container-right">
        {!authToken && (
          <div className="homeLink">
            <Link to="/crud/user/authentication/login">
              <img
                className={`${type}`}
                title="login"
                alt="home"
                src={loginIcon}
              />
            </Link>
          </div>
        )}
        {authToken && (
          <div className="homeLink" key="logout">
            <Link to="/crud/user/authentication/logout">
              <img src={logoutIcon} alt="logout" title="logout" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
