import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser:() => {}
});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const setCurrentUser = () => setUser(null)

    useEffect(() => {
        fetch("/auth/user")
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => {
                console.log(err);
            });
    }, []);

  return (
      <UserContext.Provider value={{
        user,
        setCurrentUser
      }}>
          { children }
      </UserContext.Provider>
  );
};

export default UserProvider;
