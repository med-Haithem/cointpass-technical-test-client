import { Route, Switch, Redirect } from "react-router-dom";
import { CommonLayout } from "../common/layout";
import { AuthProvider } from "../common/hooks/useAuth";
import { Authentication, CurrencyDashboard } from "../modules";
const App = () => {
  return (
    <AuthProvider>
      <CommonLayout>
        <Switch>
          <Route exact path="/">
            <Redirect exact from="/" to="/auth" />
          </Route>
          <Route path="/auth" component={Authentication} />
          <Route path="/dashboard" component={CurrencyDashboard} />
          <Route component={Authentication} />
        </Switch>
      </CommonLayout>
    </AuthProvider>
  );
};

export default App;
