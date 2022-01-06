import {
  Router,
  Switch,
  Route,
} from "react-router-dom";


import Homescreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import PrivateRoute from "./utils/PrivateRoute";

// admin screen
import history from "./utils/history";
import ProfileScreen from "./screens/ProfileScreen";


export default function App() {
  return (
    <Router history={history}>
        <Switch>
          <PrivateRoute path="/" component={Homescreen} exact />
          <PrivateRoute path="/profile" component={ProfileScreen} exact />
          <Route path="/register" exact>
            <RegisterScreen />
          </Route>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
        </Switch>
    </Router>
  );
}
