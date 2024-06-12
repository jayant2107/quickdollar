import React from 'react'
import Landing from "../Pages/Landing";
import ChangePassword from "../Modules/ChangePassword/ChangePassword";
import Dashboard from "../Modules/Dashboard/Dashboard";
import MainOffer from "../Modules/Offer/MainOffer";
import MainUser from '../Modules/User/MainUser';
import AllUsers from '../Modules/User/AllUsers/AllUsers';
import AllAbusedUsers from '../Modules/User/AllAbused/AllAbused';
import AddAdminUser from '../Modules/User/AddAdmin/AddAdminUser';
import AllOffers from '../Modules/Offer/AllOffer/AllOffer';
import AddOffer from "../Modules/Offer/AddOffer/AddOffer";
import AddCustomOffer from '../Modules/Offer/AddCustomOffer/AddCustomOffer';
import ViewCustomOffers from '../Modules/Offer/ViewCustomOffer/ViewCustomOffer';
import CompletedOffers from '../Modules/Offer/CompletedOffer/CompletedOffer';
import MainGiftCards from '../Modules/GiftCards/MainGiftCards';
import AllGiftCards from '../Modules/GiftCards/AllGiftCards/AllGiftCatds';
import AddGiftCard from '../Modules/GiftCards/AddGiftCard/AddGiftCard';
import RequestedGiftCards from "../Modules/GiftCards/RequestedGiftCard/RequestedGiftCards";
import DeliveredGiftCards from "../Modules/GiftCards/DeliveredGiftCards/DeliveredGiftCards";
import MainFrontPageOffer from '../Modules/FrontPageOffer/MainFrontPageOffer';
import AllFrontPageOffer from '../Modules/FrontPageOffer/AllFrontPageOffer/AllFrontPageOffer';
import AddFrontPageOffer from '../Modules/FrontPageOffer/AddFrontPageOffer/AddFrontPageOffer';
import SendMessage from '../Modules/SendMessage/SendMessage';
import Announcement from '../Modules/Announcement/Announcement';
import PromotionEmail from "../Modules/PromotionEmail/PromotionEmail";
import EditProfile from '../Components/Header/Profile/EditProfile';
import SkeletonLoader from "../Components/Skeleton/SkeletonLoader";
import MainSettings from "../Modules/Settings/MainSetting";
import WebSetting from '../Modules/Settings/WebSetting/WebSetting';
import Android from '../Modules/Settings/Android/Android';
import Ios from '../Modules/Settings/IOS/Ios';
import EditOffer from '../Modules/Offer/AllOffer/EditAllOffer';
import { Navigate } from 'react-router-dom';

export const privateRoutes = [
    {
        path: "quickdollar", element: <Landing />, children: [
            { path: "", element: <Navigate to="dashboard" /> },
            { path: "profile", element: <ChangePassword /> },
            { path: "dashboard", element: <Dashboard /> },
            {
                path: "user", element: <MainUser />, children: [
                    { path: "", element: <Navigate to="allusers" /> },
                    { path: "allusers", element: <AllUsers /> },
                    { path: "allabused", element: <AllAbusedUsers /> },
                    { path: "addadminuser", element: <AddAdminUser /> },
                ]
            },
            {
                path: "offer", element: <MainOffer />, children: [
                    { path: "", element: <Navigate to="alloffers" /> },
                    { path: "alloffers", element: <AllOffers /> },
                    { path: "addoffer", element: <AddOffer /> },
                    { path: "editOffer/:idOffer", element: <EditOffer /> },
                    { path: "addcustomoffers", element: <AddCustomOffer /> },
                    { path: "viewcustomoffers", element: <ViewCustomOffers /> },
                    { path: "completedoffers", element: <CompletedOffers /> },
                ]
            },
            {
                path: "giftcard", element: <MainGiftCards />, children: [
                    { path: "", element: <Navigate to="allgiftcard" /> },
                    { path: "allgiftcard", element: <AllGiftCards /> },
                    { path: "addgiftcard", element: <AddGiftCard /> },
                    { path: "requestedgiftcard", element: <RequestedGiftCards /> },
                    { path: "deliveredgiftcard", element: <DeliveredGiftCards /> },
                ]
            },
            {
                path: "frontpageoffer", element: <MainFrontPageOffer />, children: [
                    { path: "", element: <Navigate to="allfrontageoffer" /> },
                    { path: "allfrontageoffer", element: <AllFrontPageOffer /> },
                    { path: "addfrontpageoffer", element: <AddFrontPageOffer /> },
                ]
            },
            { path: "sendmessage", element: <SendMessage /> },
            { path: "announcement", element: <Announcement /> },
            { path: "promotionEmail", element: <PromotionEmail /> },
            { path: "profile/editprofile", element: <EditProfile /> },
            { path: "skelton", element: <SkeletonLoader /> },
            {
                path: "settings", element: <MainSettings />, children: [
                    { path: "", element: <Navigate to="web" /> },
                    { path: "web", element: <WebSetting /> },
                    { path: "android", element: <Android /> },
                    { path: "ios", element: <Ios /> },
                ]
            },
        ]
    }
];
