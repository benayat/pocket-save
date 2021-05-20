import ActionCard from "../components/ActionCard";
import "../style/home.css";
import userIcon from "../images/userIcon.jfif";
import adminIcon from "../images/adminIcon.jfif";
import bankCrudIcon from "../images/bankCrud.jfif";
import statisticsIcon from "../images/statisticsIcon.png";
import { AuthContext } from "../utils/context/AuthContext";
import { useContext } from "react";

const Home = (props) => {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser && currentUser.userType === "admin";
  console.log(currentUser.userType);

  return (
    <div>
      <h1 className="mainHeader">POCKET-SAVE USER INTERFACE</h1>
      <div className="container">
        <ActionCard
          key="crud"
          headline="Crud"
          types={["", ""]}
          src={{ userIcon, adminIcon }}
          icon={bankCrudIcon}
        />
        {isAdmin && (
          <ActionCard
            key="statistics"
            headline="Statistics"
            types={["", ""]}
            src={{ userIcon, adminIcon }}
            icon={statisticsIcon}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
