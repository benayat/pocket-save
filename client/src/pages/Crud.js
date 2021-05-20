import "../style/home.css";
import ActionCard from "../components/ActionCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// all images imports for crud:
import blockUserIcon from "../images/crudIcons/blockUserIcon.png";
import deleteIcon from "../images/crudIcons/deleteIcon.png";
import adminDeleteIcon from "../images/crudIcons/deleteIcon.png";
import loginIcon from "../images/crudIcons/loginIcon.png";
import logoutIcon from "../images/crudIcons/logoutIcon.jpg";
import plusIcon from "../images/crudIcons/plusIcon.png";
import signupIcon from "../images/crudIcons/signupIcon.png";
import transactionIcon from "../images/crudIcons/transactionIcon.png";
import updateIcon from "../images/crudIcons/updateIcon.png";
import limitIcon from "../images/crudIcons/limitIcon.jpg";
import userIcon from "../images/userIcon.jfif";
import familyIcon from "../images/familyIcon.png";
import budgetIcon from "../images/budgetIcon.jpg";
import transactionNiceIcon from "../images/crudIcons/transactionNiceIcon.png";
import authenticationIcon from "../images/authenticationIcon.jpg";

// import clientIcon from "../images/clientIcon.png";
// import bankCrudIcon from "../images/bankCrud.jfif";
// import transactionIcon from "../images/transactionIcon.png";
const Crud = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [actions, setActions] = useState([]);
  const [familySrc, setFamilySrc] = useState([]);
  const [userSrc, setUserSrc] = useState([]);
  const [budgetSrc, setBudgetSrc] = useState([]);
  const [transactionSrc, setTransactionSrc] = useState([]);
  const [authenticationSrc, setAuthenticationSrc] = useState([]);
  const [icons, setIcons] = useState([]);
  const { type } = useParams();
  console.log(type);
  useEffect(() => {
    if (!loaded && /admin+/.test(type)) {
      setActions(["user", "family", "budget"]);
      setIcons({ userIcon, familyIcon, budgetIcon });
      setFamilySrc({ plusIcon, deleteIcon });
      setUserSrc({ blockUserIcon, adminDeleteIcon });
      setBudgetSrc({ updateIcon, limitIcon });
      setLoaded(true);
    } else if (!loaded && /user+/.test(type)) {
      setActions(["user", "transaction", "authentication"]);
      setIcons([userIcon, transactionNiceIcon, authenticationIcon]);
      setUserSrc({ signupIcon, deleteIcon });
      setTransactionSrc({ transactionIcon });
      setAuthenticationSrc({ loginIcon, logoutIcon });
      setLoaded(true);
    }
  }, [type, loaded]);
  return (
    loaded && (
      <div>
        <h1 className="mainHeader">POCKET-SAVE USER INTERFACE</h1>
        <div className="container">
          <ActionCard
            key={actions[0]}
            types={["admin", "user"]}
            headline={actions[0]}
            icon={icons[0]}
            src={userSrc}
          />
          <ActionCard
            key={actions[1]}
            types={["admin", "user"]}
            headline={actions[1]}
            icon={icons[1]}
            src={(type === "admin" && familySrc) || transactionSrc}
          />
          <ActionCard
            key={actions[2]}
            types={["admin", "user"]}
            headline={actions[2]}
            icon={icons[2]}
            src={(type === "admin" && budgetSrc) || authenticationSrc}
          />
        </div>
      </div>
    )
  );
};
export default Crud;

// plans: update all file imports to a big one.
