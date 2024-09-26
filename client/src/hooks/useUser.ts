import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined || context.user === null) {
    throw new Error("User not authenticated");
  }

  return context;
};
