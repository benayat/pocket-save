const setArray = (formType, onFileLoad) => {
  console.log(formType);
  let form;
  switch (true) {
    case /user-signup/.test(formType): {
      form = [
        <label key="signup-name">
          user name:
          <input type="text" />
        </label>,
        <label key="signup-email">
          email:
          <input type="text" />
        </label>,
        <label>
          password
          <input type="text" />
        </label>,
        <label>
          age:
          <input type="text" />
        </label>,
      ];
      break;
    }
    case /admin-user+/.test(formType): {
      form = [
        <label>
          email:
          <input type="text" />
        </label>,
      ];
      break;
    }
    case /admin-family+/.test(formType): {
      form = [
        <label>
          {formType.split("-")[2] === "plus" ? "family name" : "family id"}
          :
          <input type="text" />
        </label>,
      ];
      break;
    }
    case /admin-budget-update/.test(formType): {
      form = [
        <label>
          "family id to update"
          <input type="text" />
        </label>,
      ];
      break;
    }
    case /admin-budget-limit/.test(formType): {
      form = [
        <label>
          user email
          <input type="text" />
        </label>,
        <label>
          amount:
          <input type="text" />
        </label>,
      ];
      break;
    }

    case /user-user-delete/.test(formType): {
      form = [<label>deleting current user. click to confirm</label>];
      break;
    }
    case /user-transaction+/.test(formType): {
      form = [
        <label key="transaction-type">
          transaction type:
          <select>
            <option value="income">income</option>
            <option value="expense">expense</option>
          </select>
        </label>,
        <label key="transaction-category">
          transaction category:
          <select>
            <option value="gas">gas</option>
            <option value="food">food</option>
            <option value="clothing">clothing</option>
            <option value="hygiene">hygiene</option>
            <option value="other">other</option>
          </select>
        </label>,
        <label key="transaction-scan">
          receipt scan:
          <input type="file" onChange={onFileLoad} />
        </label>,
      ];

      break;
    }
    case /user-authentication-login/.test(formType): {
      form = [
        <label>
          email:
          <input type="text" />
        </label>,
        <label>
          password:
          <input type="text" />
        </label>,
      ];
      break;
    }
    case /user-authentication-logout/.test(formType): {
      form = [<label>logging out. click to confirm</label>];
      break;
    }
    default: {
      break;
    }
  }
  form.push(
    <button key="submit" className="submit-button">
      send request
    </button>
  );
  return form;
};
export { setArray };
/* 
transaction: 
          request.keys = [
            "ownerBudget",
            "familyBudget",
            "transactionType",
            "category",
            "scan",
          ];
          request.type = "post";
*/
