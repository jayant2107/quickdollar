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
import Loader from "../Components/Loader/Loader";
import SkeletonLoader from "../Components/Skeleton/SkeletonLoader";
import Landing from "../Pages/Landing";
import Dashboard from "../Pages/SidebarPages/Dashboard/Dashboard";
import DriverListing from "../Pages/SidebarPages/DriverListing/DriverListing";
import Announcement from "../Modules/Announcement/Announcement";
import SendMessage from "../Modules/SendMessage/SendMessage";
import PromotionEmail from "../Modules/PromotionEmail/PromotionEmail";
import MainUser from "../Modules/User/MainUser";
import AllUsers from "../Modules/User/AllUsers/AllUsers";
import AllAbusedUsers from "../Modules/User/AllAbused/AllAbused";
import MainOffer from "../Modules/Offer/MainOffer";
import AllOffer from "../Modules/Offer/AllOffer/AllOffer";
import AddOffer from "../Modules/Offer/AddOffer/AddOffer";
import AddCustomOffer from "../Modules/Offer/AddCustomOffer/AddCustomOffer";
import ViewCustomOffer from "../Modules/Offer/ViewCustomOffer/ViewCustomOffer";
import CompletedOffer from "../Modules/Offer/CompletedOffer/CompletedOffer";
import AddAdminUser from "../Modules/User/AddAdmin/AddAdminUser";
import DecryptUserInfo from "../Modules/User/DecryptUser/DecryptUserInfo";
import MainGiftCards from "../Modules/GiftCards/MainGiftCards";
import AllGiftCards from "../Modules/GiftCards/AllGiftCards/AllGiftCatds";
import AddGiftCard from "../Modules/GiftCards/AddGiftCard/AddGiftCard";
import RequestedGiftCards from "../Modules/GiftCards/RequestedGiftCard/RequestedGiftCards";
import DeliveredGiftCards from "../Modules/GiftCards/DeliveredGiftCards/DeliveredGiftCards"
import MainFrontPageOffer from "../Modules/FrontPageOffer/MainFrontPageOffer";
import AddFrontPageOffer from "../Modules/FrontPageOffer/AddFrontPageOffer/AddFrontPageOffer"
import AllFrontPageOffer from "../Modules/FrontPageOffer/AllFrontPageOffer/AllFrontPageOffer";
function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/quickdollar/driver" replace />;
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
          <Route element={<Forgot />} path="forgot" />
          <Route element={<Loader />} path="loader" />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={token} />}>
          <Route element={<Landing />} path="quickdollar">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<DriverListing />} path="/quickdollar/driver" />

            <Route element={<MainUser />} path="user">
              <Route element={<AllUsers />} path="allusers" />
              <Route element={<AllAbusedUsers />} path="allabused" />
              <Route element={<AddAdminUser />} path="addadminuser" />
              <Route element={<DecryptUserInfo />} path="decryptuserinfo" />
            </Route>

            <Route element={<MainOffer />} path="offer">
              <Route element={<AllOffer />} path="alloffers" />
              <Route element={<AddOffer />} path="addoffer" />
              <Route element={<AddCustomOffer />} path="addcustomoffers" />
              <Route element={<ViewCustomOffer />} path="viewcustomoffers" />
              <Route element={<CompletedOffer />} path="completedoffers" />
            </Route>

            <Route element={<MainGiftCards />} path="giftcard">
              <Route element={<AllGiftCards />} path="allgiftcard" />
              <Route element={<AddGiftCard />} path="addgiftcard" />
              <Route element={<RequestedGiftCards />} path="requestedgiftcard" />
              <Route element={<DeliveredGiftCards />} path="deliveredgiftcard" />
            </Route>

            <Route element={<SendMessage />} path="sendmessage" />

            <Route element={<MainFrontPageOffer />} path="frontpageoffer">
              <Route element={<AllFrontPageOffer />} path="allfrontageoffer" />
              <Route element={<AddFrontPageOffer />} path="addfrontpageoffer" />
            </Route>

            <Route element={<Announcement />} path="announcement" />
            <Route element={<PromotionEmail />} path="promotionEmail" />
            <Route element={<EditProfile />} path="profile/editprofile" />
            <Route element={<SkeletonLoader />} path="skelton" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
