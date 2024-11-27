import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null); // Add userName state

  return (
    <UserContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
