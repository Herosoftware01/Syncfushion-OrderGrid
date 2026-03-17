import { createContext } from "react";

// interface UserContextType {
//   username: string;
//   setUsername: (username: string) => void;
// }


export const UserContext = createContext({
  username: "",
  setUsername: () => {},
});