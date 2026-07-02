import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import LandingPage from "./pages/landing";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import AppProvider from "./layout/index";
import RequireAuth from "./layout/requireAuth";


function App() {
  return (
    <Router>
      <AppProvider>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/sign-in"
              element={<SignIn />}
            />
            <Route
              path="/sign-up"
              element={<SignUp />}
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
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