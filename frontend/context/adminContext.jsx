import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); 
  const [loading, setLoading] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, loading, setLoading }}>
      {children}
    </AdminContext.Provider>
  );
};