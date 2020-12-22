import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

const AppCtxProvider = ({ children }) => {
  const [sportsUpdateSearchResult, setSportsUpdateSearchResult] = useState({ loading: false, data: [] });
  const [superstarsSearchResult, setSuperstarsSearchResult] = useState({ loading: false, data: [] });

  return (
    <AppContext.Provider value={{
      sportsUpdateSearchResult,
      setSportsUpdateSearchResult,
      superstarsSearchResult,
      setSuperstarsSearchResult
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useSportsUpdateSearchResult = () => {
  const { sportsUpdateSearchResult } = useContext(AppContext);
  return sportsUpdateSearchResult;
};

export const useSetSportsUpdateSearchResult = () => {
  const { setSportsUpdateSearchResult } = useContext(AppContext);
  return setSportsUpdateSearchResult;
}

export const useSuperstarsSearchResult = () => {
  const { superstarsSearchResult } = useContext(AppContext);
  return superstarsSearchResult;
};

export const useSetSuperstarsSearchResult = () => {
  const { setSuperstarsSearchResult } = useContext(AppContext);
  return setSuperstarsSearchResult;
}

export default AppCtxProvider;