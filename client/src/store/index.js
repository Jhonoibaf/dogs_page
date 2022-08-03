import { configureStore, applyMidelWare } from "redux";
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

export const store = configureStore(rootReducer, composeWithDevTools(applyMidelWare(thunk)))

