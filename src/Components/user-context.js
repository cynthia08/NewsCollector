import React from "react";

// set the defaults
const UserContext = React.createContext({
  userID: "Default user",
  setUserID: () => {}
});

export default UserContext;
