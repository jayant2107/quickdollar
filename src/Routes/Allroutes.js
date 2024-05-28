import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Forgot from "../Auth/Forgot";
import Login from "../Auth/Login";
import Verify from "../Auth/Verify";
import EditProfile from "../Components/Header/Profile/EditProfile";
import Profile from "../Components/Header/Profile/Profile";
import Loader from "../Components/Loader/Loader";
import SkeletonLoader from "../Components/Skeleton/SkeletonLoader";
import Landing from "../Pages/Landing";
import Dashboard from "../Pages/SidebarPages/Dashboard/Dashboard";
import DriverListing from "../Pages/SidebarPages/DriverListing/DriverListing";
import UserListing from "../Pages/SidebarPages/UserListing/UserListing";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/landing/driver" replace />;
  return <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function GaspilRoutes() {
  const isAutharised = useSelector(
    (state) => state?.Authlogin?.data?.phoneNumber
  );
  console.log(isAutharised, "ysss");
  const token = isAutharised;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={token} />}>
          <Route element={<Login />} path="/" />
          <Route element={<Verify />} path="verify" />
          <Route element={<Forgot />} path="/forgot" />
          <Route element={<Loader />} path="/loader" />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={token} />}>
          <Route element={<Landing />} path="/landing">
            <Route element={<Dashboard />} path="/landing/dashboard" />
            <Route element={<DriverListing />} path="/landing/driver" />
            <Route element={<UserListing />} path="/landing/user" />
            <Route element={<Profile />} path="/landing/profile" />
            <Route
              element={<EditProfile />}
              path="/landing/profile/editprofile"
            />
            <Route element={<SkeletonLoader />} path="/landing/skelton" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
