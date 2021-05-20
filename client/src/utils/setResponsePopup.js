const SetResponsePopup = (response) => {
  if (response.status > 201) {
    throw new Error("something wrong here!");
  }
  console.log("setting response");
  const action = response.config.headers.action;
  console.log(action);
  switch (action) {
    case "signup":
      console.log("signing up");
      return `created new user! " ${response.data.name}`;
    case "delete":
      return "delete success!";
    case "transaction":
      return `transaction success. got amount from receipt: ${response.data.amount}`;
    case "login":
      return "login success. please note - session will only last until page leave, for security reasons";
    case "logout":
      // check it out!
      return `${response.data.name} logout success`;
    case "toggleBlockUser":
      return `${response.data.name} is now ${response.data.userBudget.block}`;
    case "adminDelete":
      return `user ${response.data.name} is deleted from our database`;
    case "plus":
      return "family created successfuly";
    case "update":
      return "family budget updated successfuly";
    case "limit":
      return `user ${response.data.name} is limited now to ${response.data.userBudget.total}`;
    case "getFamily":
      return `got the ${response.data.familyName} successfuly. for more info and stats, go to the statistics section`;
    default:
      break;
  }
};
export { SetResponsePopup };
/* 
[
    "signup",
    "delete",
    "transaction",
    "login",
    "logout",
    "blockUser",
    "adminDelete",
    "plus",
    "delete",
    "update",
    "limit",
    "getFamily"
]
*/
/* 
in this util function, I'll deal with the results and insert them into the second popup, and also the sideeffects of some of them.
*/
