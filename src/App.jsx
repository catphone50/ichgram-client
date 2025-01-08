import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage/MainPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import ExplorePage from "./pages/Explore/ExplorePage";
import MessagesPage from "./pages/Messages/MessagesPage";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import CreatePage from "./pages/Create/CreatePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage.jsx";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/main"
          element={<ProtectedRoute element={<Navigate to="/home" />} />}
        />
        <Route path="/home" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
