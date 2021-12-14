import { useEffect, useState, useContext } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/wrappers/Layout";
import { Login, Profile } from "./pages";
import { Playlist } from "./pages/Playlist";
import "./app.css";
import GlobalContext, { GlobalProvider } from "./context/appContext";
import { motion, AnimatePresence } from "framer-motion/dist/es/index";
import { Footer } from "./components/navigation/Footer";
import { Navbar } from "./components/navigation/Navbar";
import SearchOverlay from "./components/pageElements/SearchOverlay";
import { MyMusic } from "./pages/MyMusic";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const gContext = useContext(GlobalContext);

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
              {/* <ScrollToTop /> */}
              {/* <div class="flex flex-col h-screen justify-between"> */}
              <Navbar profile={profile} />
              {/* <div className="mb-auto"> */}
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                  <Route path="/playlist/:id" component={Playlist} />
                  <Route path="/my-top-songs" component={MyMusic} />
                  <Route path="/" component={Profile} />
                </Switch>
              </AnimatePresence>
              {/* </div> */}

              {/* <Footer /> */}
              {/* </div> */}
            </>
          )}
        </Layout>
      </GlobalProvider>
    </div>
  );
}

export default App;
