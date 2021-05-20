const setAxiosRequest = (formType, formDataArray, token = null) => {
  let request;
  switch (true) {
    case /admin-user-toggleBlockUser/.test(formType): {
      request = {
        method: "patch",
        url: `/api/budgets/${formType[0]}`,
      };
      break;
    }
    case /admin-user-delete/.test(formType): {
      request = {
        method: "delete",
        url: `/api/users/admin/${formDataArray[0]}`,
      };
      break;
    }
    case /admin-family-plus/.test(formType): {
      request = {
        method: "post",
        url: "/api/family",
        data: {
          familyName: formDataArray[0],
        },
      };
      break;
    }
    case /admin-family-delete/.test(formType): {
      request = {
        method: "delete",
        url: `/api/family/${formDataArray[0]}`,
      };
      break;
    }
    case /admin-budget-update/.test(formType): {
      request = {
        method: "post",
        url: "/api/budgets",
      };
      break;
    }
    case /admin-budget-limit/.test(formType): {
      request = {
        method: "patch",
        url: `/api/budgets/limit/${formDataArray[0]}`,
        data: {
          amount: formDataArray[1],
        },
      };
      break;
    }
    case /user-signup/.test(formType): {
      request = {
        method: "post",
        url: "/api/users",
        data: {
          name: formDataArray[0],
          email: formDataArray[1],
          age: formDataArray[3],
          password: formDataArray[2],
          userType: /admin/.test(formType) ? "admin" : "user",
        },
      };
      break;
    }
    case /user-user-delete/.test(formType): {
      request = {
        method: "delete",
        url: `/api/users`,
      };
      break;
    }
    case /user-transaction+/.test(formType): {
      request = {
        method: "post",
        url: "/api/transactions",
        data: {
          transactionType: formDataArray[0],
          category: formDataArray[1],
          scan: formDataArray[2],
        },
      };
      break;
    }
    case /user-authentication-login/.test(formType): {
      request = {
        method: "post",
        url: "/api/users/login",
        data: {
          email: formDataArray[0],
          password: formDataArray[1],
        },
      };
      break;
    }
    case /user-authentication-logout/.test(formType): {
      request = {
        method: "post",
        url: "/api/users/logout",
      };
      break;
    }
    default: {
      break;
    }
  }
  request.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    action: formType.split("-")[2],
  };

  return request;
};
export { setAxiosRequest };
