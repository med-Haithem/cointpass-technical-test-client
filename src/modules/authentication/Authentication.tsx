import { Button, Result } from "antd";
import { useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { AuthenticationSignIn } from "./components";

export const Authentication = () => {
  const { pathname } = useLocation(),
    { path } = useRouteMatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect exact from={`/`} to={`${path}/sign-in`} />
        </Route>
        <Route
          exact
          path={`${path}/sign-in`}
          component={AuthenticationSignIn}
        />
        <Route
          render={(props) => {
            return (
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
              />
            );
          }}
        ></Route>
      </Switch>
    </Switch>
  );
};
