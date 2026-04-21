"use client";
import { createContext, useEffect, useState } from "react";
import { User } from "../types";
import axios from "axios";

type UserContextType = {
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user !== null && user.accessToken) {
      localStorage.setItem("accessToken", user.accessToken);
    }
  }, [user]);

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        // let status = 200;
        axios
          .get("https://dummyjson.com/auth/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data);
            } else {
              setUser(null);
            }
          });
        // fetch("https://dummyjson.com/auth/me", {
        //   method: "GET",
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // })
        //   .then((res) => {
        //     if (!res.ok) {
        //       status = res.status;
        //     }
        //     return res.json();
        //   })
        //   .then((data) => {
        //     if (status === 200) {
        //       setUser(data);
        //     } else {
        //       setUser(null);
        //     }
        //   });
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
