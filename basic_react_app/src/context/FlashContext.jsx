/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const FlashContext = createContext(null);

export function FlashProvider({ children }) {
  const [flash, setFlash] = useState(null);

  const value = useMemo(
    () => ({
      flash,
      setFlash,
      clearFlash: () => setFlash(null),
    }),
    [flash]
  );

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>;
}

export function useFlash() {
  const ctx = useContext(FlashContext);
  if (!ctx) {
    throw new Error("useFlash must be used inside FlashProvider");
  }
  return ctx;
}
