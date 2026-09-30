import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

type FlashType = 'success' | 'error' | 'info';

export type FlashMessage = {
  type: FlashType;
  message: string;
};

type FlashContextValue = {
  flash: FlashMessage | null;
  showFlash: (value: FlashMessage) => void;
  clearFlash: () => void;
};

const FlashContext = createContext<FlashContextValue | null>(null);

export function FlashProvider({ children }: PropsWithChildren) {
  const [flash, setFlash] = useState<FlashMessage | null>(null);

  useEffect(() => {
    if (!flash) return;
    const timeout = setTimeout(() => setFlash(null), 3200);
    return () => clearTimeout(timeout);
  }, [flash]);

  const value = useMemo(
    () => ({
      flash,
      showFlash: setFlash,
      clearFlash: () => setFlash(null),
    }),
    [flash]
  );

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>;
}

export function useFlash() {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used inside FlashProvider');
  }
  return context;
}
