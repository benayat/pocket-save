import "../style/form.css";
import { useContext, useEffect, useState } from "react";
import { setArray } from "../utils/setFormArray";
import { setAxiosRequest } from "../utils/setAxiosRequest";
import { AuthContext } from "../utils/context/AuthContext";
const Form = (props) => {
  const [formArray, setFormArray] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const { authToken } = useContext(AuthContext);
  // const [requestConfig, setRequestConfig] = useState(null);
  const onFileLoad = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setReceipt(reader.result);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = [];
    // console.log(e.target[0].type);
    for (let i = 0; i < e.target.length; i++) {
      let value = e.target[i].value;
      if (i === e.target.length - 1) break;
      if (e.target[i].type === "file") {
        formData.push(receipt);
        console.log(receipt);
        continue;
      }
      formData.push(value);
    }
    // console.log(authToken);
    const request = setAxiosRequest(props.formType, formData, authToken);
    await props.handleSubmit(request);
  };
  useEffect(() => {
    let form = setArray(props.formType, onFileLoad);
    setFormArray(form);
  }, [props.formType, props.onClick]);
  return (
    <div key={props.formType}>
      <form onSubmit={submitHandler}>{formArray}</form>
    </div>
  );
};
export default Form;
