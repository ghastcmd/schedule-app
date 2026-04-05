"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface ChildrenType {
  children: React.ReactNode;
}

interface MenuContextType {
  openState: boolean;
  setOpenState: any;
}

export const MenuContext = createContext<MenuContextType>({
  openState: false,
  setOpenState: () => {},
});

export const MenuProvider = ({ children }: ChildrenType) => {
  const [openState, setOpenState] = useState<boolean>(
    () => localStorage.getItem("menu-open") === "true",
  );

  useEffect(() => {
    localStorage.setItem("menu-open", `${openState}`);
  }, [openState]);

  return (
    <MenuContext.Provider value={{ openState, setOpenState }}>
      {children}
    </MenuContext.Provider>
  );
};
