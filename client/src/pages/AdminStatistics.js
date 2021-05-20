import "../style/modalForm.css";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Popup from "reactjs-popup";
// import Form from "../components/Form";
import { AuthContext } from "../utils/context/AuthContext";

const AdminStatistics = () => {
  const history = useHistory;
  const { authToken, setCurrentFamily, family } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [displayUrl, setDisplayUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const onRadioChangeValue = (e) => {
    const url = `statistics/admin/${e.target.value}`;
    setDisplayUrl(url);
  };

  const onClick = async () => {
    try {
      const result = await axios({
        method: "get",
        url: `api/family`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCurrentFamily(result.data);
      setLoading(false);
      setOpen(false);
      console.log(result);
    } catch (e) {
      console.log(e.message);
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
          <input type="radio" value="ListPage" name="stats" />
          table- general stats
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
export default AdminStatistics;
