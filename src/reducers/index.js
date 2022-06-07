import { combineReducers } from "redux";
import authReducer from "./auth";
import paymentReduser from "./payment";
import adressListReduser from "./adressList";
import RouteReduser from "./route";

export default combineReducers({
	auth: authReducer,
	payment: paymentReduser,
	adressList: adressListReduser,
	route: RouteReduser
});
