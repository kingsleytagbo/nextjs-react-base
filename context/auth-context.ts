import { createContext, useContext } from "react";
// const [userAuthContext, setUserAuthContext] = useState(false);

export type AuthType = {
  userAuth:any;
  setUserAuth:(value: any) => void;
  userAuthContext: boolean; 
  setUserAuthContext:(value: boolean) => void;
};

export const AuthContext = createContext<AuthType>({
  // set default values
  userAuth:{isAdmin:false},
  setUserAuth: () => {},
  userAuthContext: false, 
  setUserAuthContext: () => {}
});

export const useAuthContext = () => useContext(AuthContext);