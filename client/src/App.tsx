import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isChecking } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking && !authUser ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  console.log({ authUser });

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to ="/login"/>} />
        <Route path="/signup" element={!authUser?<SignUpPage />: <Navigate to ="/"/> } />
        <Route path="/login" element={!authUser?<LogInPage />:<Navigate to ="/login"/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to ="/login"/>} />
      </Routes>
    </div>
  );
};

export default App;