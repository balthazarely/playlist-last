import { useEffect, useState } from "react";
import { GlobalProvider } from "./context/appContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Login, Profile, MyMusic, Playlist } from "./pages";
import { Layout } from "./components/wrappers/Layout";
import "./app.css";
import { AnimatePresence } from "framer-motion/dist/es/index";
import Navbar from "./components/navigation/Navbar";
import { accessToken, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { Sidenav } from "./components/navigation/Sidenav";
import BrowserResizeDetection from "./components/hooks/BrowserResizeDetection";
import { ExploreGenre } from "./pages/ExploreGenre";

function App() {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalProvider>
        <Layout>
          {!token ? (
            <Login />
          ) : (
            <>
              <BrowserResizeDetection />
              <Navbar profile={profile} />
              <Sidenav profile={profile} />
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                  <Route path="/playlist/:id" component={Playlist} />
                  <Route path="/my-top-songs" component={MyMusic} />
                  <Route
                    path="/explore-genre/:genre?"
                    component={ExploreGenre}
                  />

                  <Route path="/" component={Profile} />
                </Switch>
              </AnimatePresence>
            </>
          )}
        </Layout>
      </GlobalProvider>
    </div>
  );
}

export default App;
