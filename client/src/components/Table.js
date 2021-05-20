import { useEffect, useState } from "react";
import "../style/table.css";
import { flattenCollection } from "../utils/setCollectionFlat";

const Table = (props) => {
  const [regex, setRegex] = useState("");
  const [selectValue, setSelect] = useState("_id");
  const [collectionObject, setCollectionObject] = useState(null);

  useEffect(() => {
    if (!collectionObject) {
      setCollectionObject(flattenCollection(props.collection));
    } else {
      console.log(collectionObject);
    }
  }, [collectionObject, props.collection]);

  const onChange = (e) => {
    setRegex(e.target.value);
  };
  const onSelectChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    props.collection &&
    collectionObject && (
      <div className="tableComponent">
        <div className="search-box" key="search">
          Search{" "}
          <input type="text" name="search" id="searchBox" onChange={onChange} />
          <select
            onChange={onSelectChange}
            name="selectAttributeToSearch"
            id="selectSearch"
            key="search-select"
          >
            {Object.keys(collectionObject[0]).map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <table className="users-table">
          <thead>
            <tr className="table-headline">
              {Object.keys(collectionObject[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.collection &&
              collectionObject &&
              collectionObject
                //   .sort(sorter)
                .filter((row) => {
                  return new RegExp(`^${regex}`, "i").test(row[selectValue]);
                })
                .map((row, index) => {
                  return (
                    <tr key={row._id + index}>
                      {Object.values(row).map((cell, index) => (
                        <td key={cell + index}>{cell}</td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    )
  );
};
export default Table;
/* 
plan: take the collection header, and map it's keys for the seach options and the th tags.
this way, it could be more robust and generic.

plus, add all the table data from the javascript file.
*/
