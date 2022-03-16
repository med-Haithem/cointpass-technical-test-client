import { Route, Switch, Redirect } from "react-router-dom";
import { CommonLayout } from "../common/layout";
import { Authentication } from "../modules/authentication";

const App = () => {
  return (
    <CommonLayout>
      <Switch>
        <Route exact path="/">
          <Redirect exact from="/" to="/auth" />
        </Route>
        <Route path="/app" component={App} />
        <Route path="/auth" component={Authentication} />
        <Route component={Authentication} />
      </Switch>
    </CommonLayout>
  );
};

export default App;
