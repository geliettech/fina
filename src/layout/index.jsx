import { AuthProvider } from "../layout/context/authProvider";
import { ThemeProvider } from "../layout/context/themeProvider";


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