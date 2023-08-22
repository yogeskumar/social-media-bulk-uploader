import React, { createContext, useState } from 'react';

export const GlobalUrlToScheduleContext = createContext();

export const GlobalUrlToScheduleProvider = ({ children }) => {
    const [urlToSchedule, setUrltoschedule] = useState('');
  
    return (
      <GlobalUrlToScheduleContext.Provider value={{ urlToSchedule, setUrltoschedule }}>
          {children}
      </GlobalUrlToScheduleContext.Provider>
    );
  };
  