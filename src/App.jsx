import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import LandingPage from "@/pages/landing";
import SignInPage from "@/pages/auth/signIn";
import SignUpPage from "@/pages/auth/signUp";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import AppProvider from "@/layout/context/appProvider";
import ProtectRoute from "@/hooks/useRoute";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <AppProvider>
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/sign-in"
              element={<SignInPage />}
            />
            <Route
              path="/sign-up"
              element={<SignUpPage />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectRoute>
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;