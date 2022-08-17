import React from "react";

/*
********************************************************************************************
  UserContext defines a user context to save user id.
********************************************************************************************
*/
const UserContext = React.createContext({
  userID: "Default user",
  setUserID: () => {}
});

export default UserContext;
