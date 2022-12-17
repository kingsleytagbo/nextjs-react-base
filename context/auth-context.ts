import { createContext, useContext } from "react";
// const [userLoginStatus, setLoginStatus] = useState(false);

export type AuthType = {
  userLoginStatus: boolean 
  setLoginStatus:(value: boolean) => void
};

export const AuthContext = createContext<AuthType>({
  userLoginStatus: false, // set a default value
  setLoginStatus: () => {}
});

export const useAuthContext = () => useContext(AuthContext);