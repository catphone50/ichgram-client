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
import SideNav from "./components/SideNav/SideNav.jsx";
import { isAuthenticated } from "./services/isAuthenticated.js";
import store from "./store/store.js";
import PostModal from "./components/PostModal/PostModal.jsx";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  console.log("Текущее состояние стора:", store.getState());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              <div className="searchContainer">
                <aside className="navigation">
                  <SideNav />
                </aside>
                <main className="content">
                  <Routes>
                    <Route
                      path="/home"
                      element={<ProtectedRoute element={<MainPage />} />}
                    />
                    <Route
                      path="/search"
                      element={<ProtectedRoute element={<SearchPage />} />}
                    />
                    <Route
                      path="/explore"
                      element={<ProtectedRoute element={<ExplorePage />} />}
                    />
                    <Route
                      path="/messages"
                      element={<ProtectedRoute element={<MessagesPage />} />}
                    />
                    <Route
                      path="/notifications"
                      element={
                        <ProtectedRoute element={<NotificationsPage />} />
                      }
                    />
                    <Route
                      path="/create"
                      element={<ProtectedRoute element={<CreatePage />} />}
                    />
                    <Route
                      path="/profile/:id"
                      element={<ProtectedRoute element={<ProfilePage />} />}
                    >
                      <Route
                        path="post/:postId"
                        element={<ProtectedRoute element={<PostModal />} />}
                      />
                    </Route>
                    <Route
                      path="/edit-profile"
                      element={<ProtectedRoute element={<EditProfilePage />} />}
                    />

                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
