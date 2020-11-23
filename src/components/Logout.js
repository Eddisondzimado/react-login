import React, { useContext } from "react";
import { MyContext } from "../contexts/MyContext";

// Importing the Login & Register Componet

function Logout() {
  const { rootState, logoutUser } = useContext(MyContext);
  const {} = rootState;

  return (
    <div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
// Showing Login Or Register Page According to the condition

export default Logout;
