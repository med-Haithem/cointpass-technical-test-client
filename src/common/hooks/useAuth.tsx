import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthApi } from "../../api/auth";
import { User } from "../../types/User";

import Cookies from "universal-cookie";
import { Progress, Row } from "antd";

const cookies = new Cookies();

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire dashboard with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const authApi = AuthApi();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const token = cookies.get("token");
    if (!token) {
      setLoadingInitial(false);
      history.push("/auth");
      return;
    }
    authApi
      .getUserInfo(token)
      .then((userInfo) => {
        setUser(userInfo.user);
        history.push("/dashboard");
      })
      .catch(() => {
        cookies.remove("token");
        setError(true);
        setLoadingInitial(false);
        history.push("/auth");
      })
      .finally(() => setLoadingInitial(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (email: string, password: string) => {
    setLoading(true);
    setError(false);
    authApi
      .login({ email, password })
      .then((res) => {
        const { access_token, ...otherUserProps } = res.data;
        setUser(otherUserProps);
        cookies.set("token", access_token, { path: "/" });
        history.push("/dashboard");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    cookies.remove("token");
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      loadingInitial,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error, loadingInitial]
  );
  if (loadingInitial) {
    return (
      <Row
        justify="center"
        style={{
          padding: "2em",
        }}
      >
        <Progress
          type="circle"
          strokeColor={{
            "0%": "#fff",
            "100%": "#1890ff",
          }}
          percent={Math.floor(Math.random() * 80)}
          format={(percent) => (
            <span>
              {percent}%<br />
              <small>Loading...</small>
            </span>
          )}
        />
      </Row>
    );
  }
  // We only want to render the underlying dashboard after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
