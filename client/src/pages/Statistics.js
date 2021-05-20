import "../style/modalForm.css";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Popup from "reactjs-popup";
// import Form from "../components/Form";
import { AuthContext } from "../utils/context/AuthContext";
import { SetResponsePopup } from "../utils/setResponsePopup";

const Statistics = () => {
  const history = useHistory();
  const { authToken, setCurrentFamily, family, setTransactions } =
    useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [displayUrl, setDisplayUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const onRadioChangeValue = (e) => {
    console.log(e.target.value);
    const url = `/statistics/admin/${e.target.value}`;
    setDisplayUrl(url);
  };

  const onClick = async () => {
    let result;
    try {
      console.log("trying to get family from DB");
      console.log(authToken);
      result = await axios({
        url: `/api/family`,
        method: "get",
        headers: {
          action: "getFamily",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(SetResponsePopup(result));
      setCurrentFamily(result.data);
      result = await axios({
        method: "get",
        url: "/api/transactions",
        headers: {
          action: "getTransactions",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTransactions(result.data);
      setLoading(false);
      setOpen(false);
      console.log(result);
    } catch (e) {
      console.log(result);
      console.log(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (!loading) {
      history.push(displayUrl);
    }
  }, [loading, family, displayUrl, history]);

  return (
    <div>
      <Popup
        className={open ? "open" : "close"}
        open={open}
        defaultOpen={true}
        position="center center"
        // onClose={closeModal}
      >
        <div onChange={onRadioChangeValue}>
          how would you like to see your statistics?
          <br />
          <input type="radio" value="ListPage" name="stats" />
          table- general stats
          <br />
          <input type="radio" value="ChartsPage" name="stats" /> charts - more
          specific
        </div>
        <button type="button" onClick={onClick}>
          display
        </button>
      </Popup>
    </div>
  );
};
export default Statistics;
