import ActionCard from "../components/ActionCard";
import "../style/home.css";
import userIcon from "../images/userIcon.jfif";
import adminIcon from "../images/adminIcon.jfif";
import bankCrudIcon from "../images/bankCrud.jfif";
import statisticsIcon from "../images/statisticsIcon.png";
const Home = (props) => {
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
        <ActionCard
          key="transfer"
          headline="Statistics"
          types={["", ""]}
          src={{ userIcon, adminIcon }}
          icon={statisticsIcon}
        />
      </div>
    </div>
  );
};
export default Home;
