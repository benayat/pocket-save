import "../style/actionCard.css";

import { Link } from "react-router-dom";
import { useMemo } from "react";
const ActionCard = (props) => {
  const completeUrl = useMemo(() => {
    const array = [];
    let url = window.location.href;
    let urlIndex = url.split("/").length - 1;
    for (let i = 0; i < 2; i++) {
      if (Object.keys(props.src)[i] && /crud/.test(url)) {
        array.push(
          url.split("/")[urlIndex] +
            "/" +
            props.headline.toLowerCase() +
            "/" +
            Object.keys(props.src)[i].slice(0, -4)
        );
      } else if (Object.keys(props.src)[i]) {
        array.push(
          "/" +
            props.headline.toLowerCase() +
            "/" +
            Object.keys(props.src)[i].slice(0, -4)
        );
      } else if (/crud/.test(url)) {
        array.push("");
      }
    }
    return array;
  }, [props.src, props.headline]);

  return (
    Object.keys(props.src)[0] !== undefined && (
      <div className="container">
        <div className="card">
          <div className="face face1">
            <div className="content">
              <img alt="" src={props.icon} title={props.headline} />
              <h3>{props.headline}</h3>
            </div>
          </div>
          <div className="face face2">
            <div className="content">
              <Link to={completeUrl[0]}>
                <img
                  alt={props.headline}
                  src={Object.values(props.src)[0]}
                  title={Object.keys(props.src)[0].slice(0, -4)}
                />
              </Link>
              {Object.values(props.src)[1] && (
                <Link to={completeUrl[1]}>
                  <img
                    alt={props.headline}
                    src={Object.values(props.src)[1]}
                    title={Object.keys(props.src)[1].slice(0, -4)}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default ActionCard;

// props:
// icon(file), headline(string), type(String - goes to the link)
// plans: use this same card, and same link - but it will link to the popup -
// this is how:
/* 
- in the router itself, I'll just remove the "exact match" from whatever not necessary.
- then the link will be a new page. the reason for that, is that the card is already 
filled with pictures etc.

*/
