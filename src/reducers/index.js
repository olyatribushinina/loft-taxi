import { combineReducers } from "redux";
import authReducer from "./auth";
import paymentReduser from "./payment";

export default combineReducers({
	auth: authReducer,
	payment: paymentReduser
});
