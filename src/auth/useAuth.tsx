import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";
import { route } from "next/dist/next-server/server/router";

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  authenticated: boolean;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext>({
  user: null,
  authenticated: false,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          removeTokenCookie();
          setUser(null);
        }
      });
    return () => cancelAuthListener();
  }, []);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        router.push("/");
      })
      .catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, authenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
