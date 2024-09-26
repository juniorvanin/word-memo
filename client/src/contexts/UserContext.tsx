import { createContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User>({
    id: "a3e29097-a25d-4921-83cd-09e20eab2f57",
    name: "Junior Vanin",
    email: "junior.vanin@gmail.com",
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
