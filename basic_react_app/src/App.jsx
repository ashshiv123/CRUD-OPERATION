import LayoutShell from "./components/layout/AppShell.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FlashProvider, useFlash } from "./context/FlashContext.jsx";

function App() {
  return (
    <FlashProvider>
      <AppProviders />
    </FlashProvider>
  );
}

function AppProviders() {
  const { setFlash } = useFlash();

  return (
    <AuthProvider onFlash={setFlash}>
      <LayoutShell />
    </AuthProvider>
  );
}

export default App;
