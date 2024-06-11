import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import Authentication from "./Authentication";
import Language from "./Language";
import { persistReducer, persistStore } from "redux-persist";
import VerifyNum from "./VerifyNum";
import ColorTheme from "./ColorTheme";
import OfferRecord from "./slices/OfferRecord";

const reducers = combineReducers({
  Authlogin: Authentication,
  selectLang: Language,
  verifyNumber: VerifyNum,
  changeColors: ColorTheme,
  offerRecord: OfferRecord,
});
const persistConfig = {
  key: "0.1",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});
export default store;
export const persistor = persistStore(store);
