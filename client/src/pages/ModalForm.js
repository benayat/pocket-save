import "../style/modalForm.css";
import axios from "axios";
import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import Popup from "reactjs-popup";
import Form from "../components/Form";
import { AuthContext } from "../utils/context/AuthContext";
import { SetResponsePopup } from "../utils/setResponsePopup";

const ModalForm = () => {
  const {
    authToken,
    setCurrentUser,
    logout,
    setCurrentFamily,
    family,
    currentUser,
  } = useContext(AuthContext);
  const { type, actionType, action } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [popupMessage, setPopupMessage] = useState();
  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = async (requestConfig) => {
    try {
      console.log(requestConfig);
      let result;
      if (authToken && requestConfig.headers.action === "login") {
        throw new Error("already logged in!!");
      }
      result = await axios(requestConfig);
      console.log(result);
      if (requestConfig.headers.action === "login") {
        await setCurrentUser(result.data.user, result.data.token);
        console.log("user:", result.data.user, "token: ", result.data.token);
        console.log(currentUser);
        console.log(authToken);
      } else if (requestConfig.headers.action === "logout") {
        logout();
      }
      // console.log("setting popup message");
      const popupMessage = SetResponsePopup(result);
      console.log(popupMessage);
      setPopupMessage(popupMessage);
      // console.log("axios result: ", result);
    } catch (e) {
      setPopupMessage(e.message);
      console.log(e.message);
    }
    closeModal();
  };
  const closeModalMessage = () => {
    history.goBack();
  };

  return (
    <div>
      <Popup
        className={open ? "open" : "close"}
        open={open}
        defaultOpen={true}
        position="center center"
        onClose={closeModal}
        // onClose={history.goBack()}
      >
        <Form
          handleSubmit={handleSubmit}
          formType={type + "-" + actionType + "-" + action}
        ></Form>
      </Popup>
      <Popup
        className={!open ? "open" : "close"}
        open={!open}
        defaultOpen={false}
        onClose={closeModalMessage}
      >
        {popupMessage}
      </Popup>
    </div>
  );
};
export default ModalForm;
