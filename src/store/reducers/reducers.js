import { combineReducers } from "redux";
import { billReducer } from "./bill.reducer";
import { locationReducer } from "./location.reducer";
import { loginReducer } from "./login.reducer";
import { networkReducer } from "./network.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
    login: loginReducer,
    network: networkReducer,
    user: userReducer,
    locationReducer: locationReducer,
    bill: billReducer
   
});