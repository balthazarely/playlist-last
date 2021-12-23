import React, { useState } from "react";
const GlobalContext = React.createContext();

export function GlobalProvider({ children }) {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const logInUser = (user) => {
    setCurrentLoggedInUser(user);
  };

  const isLoading = (loading) => {
    setLoading(loading);
  };

  const isSearchOverlay = (loading) => {
    setShowSearchOverlay(loading);
  };

  const toggleSidenav = () => {
    setSidenavOpen(!sidenavOpen);
  };

  const closeSidenav = () => {
    setSidenavOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        isLoading,
        showSearchOverlay,
        isSearchOverlay,
        currentLoggedInUser,
        logInUser,
        sidenavOpen,
        toggleSidenav,
        closeSidenav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
