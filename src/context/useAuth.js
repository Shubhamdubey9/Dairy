import { useContext } from "react";
import AuthContext from "./authContext.jsx";

// custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
