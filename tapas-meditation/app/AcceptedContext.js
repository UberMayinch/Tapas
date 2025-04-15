import React, { createContext, useContext, useState } from 'react';

const AcceptedContext = createContext();

export const AcceptedProvider = ({ children }) => {
  const [acceptedComponents, setAcceptedComponents] = useState({
    video: false,
    chanting: false,
  });

  const acceptComponent = (key) => {
    setAcceptedComponents((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <AcceptedContext.Provider value={{ acceptedComponents, acceptComponent }}>
      {children}
    </AcceptedContext.Provider>
  );
};

export const useAccepted = () => useContext(AcceptedContext);
