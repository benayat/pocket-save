import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "../style/listPage.css";
import Table from "../components/Table";
import bankAccountIcon from "../images/bankAccountIcon.jpg";
import clientIcon from "../images/clientIcon.png";
import transactionIcon from "../images/transactionIcon.png";
import { AuthContext } from "../utils/context/AuthContext";

const ListPage = (props) => {
  const { authToken, family, currentUser } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [collection, setCollection] = useState(null);
  const { type } = useParams();
  console.log(family);
  useEffect(() => {
    const loader = async () => {
      const currentCollection = !loaded && family && family.users;
      console.log("family", currentCollection);
      setCollection(currentCollection);
      setLoaded(true);
    };
    if (!loaded) {
      loader();
    }
  }, [family, loaded]);
  return (
    <div>
      <div className="aboveTable">
        <h1 className="listHeader">{type.toUpperCase()} collection</h1>
        <img
          alt="icon"
          src={
            type !== "clients"
              ? type !== "bankaccounts"
                ? transactionIcon
                : bankAccountIcon
              : clientIcon
          }
        />
      </div>
      {loaded && collection && collection.length > 0 && (
        <Table collection={collection} />
      )}
    </div>
  );
};
export default ListPage;
