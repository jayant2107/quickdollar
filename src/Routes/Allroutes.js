import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";
import PageNotFound from "../Modules/PageNotFound/PageNotFound";

function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/quickdollar/dashboard" replace />;
  return <Outlet />;
}

function PrivateRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

const renderRoutes = (routes) => {
  return routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && children.length > 0 && renderRoutes(children)}
    </Route>
  ));
};

export default function GaspilRoutes() {
  const isAutharised = useSelector((state) => state?.Authlogin?.data?.token);
  const token = isAutharised;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute isAuthenticated={token} />}>
          {renderRoutes(publicRoutes)}
        </Route>
        <Route element={<PrivateRoute isAuthenticated={token} />}>
          {renderRoutes(privateRoutes)}
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
