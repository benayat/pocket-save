import "../style/header.css";
import { Link } from "react-router-dom";
import homeIcon from "../images/homeIcon.png";
import addAdminIcon from "../images/crudIcons/addAdminIcon.png";
import adminIcon from "../images/adminIcon.jfif";
import userIcon from "../images/userIcon.jfif";
const Header = () => {
  const type = window.location.href.split("/")[3];
  const isAdmin = /admin/.test(window.location.href);
  return (
    <div className="home-container">
      <div className="homeLink">
        <Link to="/">
          <img className={`${type}`} alt="home" src={homeIcon} />
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
      ]}
      {!isAdmin && (
        <div className="homeLink">
          <Link to="/crud/user">
            <img src={userIcon} alt="user page" />
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
