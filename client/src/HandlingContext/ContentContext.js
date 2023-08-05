import React, { createContext, useState } from 'react';

export const GlobalContentContext = createContext();

export const GlobalContentProvider = ({ children }) => {
    const [content, setContent] = useState('analytics');
  
    return (
      <GlobalContentContext.Provider value={{ content, setContent }}>
          {children}
      </GlobalContentContext.Provider>
    );
  };
  