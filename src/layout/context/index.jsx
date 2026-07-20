import { AuthProvider } from "./authProvider";
import { ThemeProvider } from "./themeProvider";


function AppProvider({children}) {
  return (
      <AuthProvider>
       <ThemeProvider>
        {children}
        </ThemeProvider>
      </AuthProvider>
  );
}

export default AppProvider;