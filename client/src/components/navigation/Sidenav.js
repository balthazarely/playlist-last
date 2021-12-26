import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/appContext";
import { logout } from "../../spotify";
import { Logo } from "./Logo";

export const Sidenav = ({ profile }) => {
  const gContext = useContext(GlobalContext);

  return (
    <div className="">
      <div
        onClick={gContext.toggleSidenav}
        className={`bg-black h-screen w-full fixed z-50 left-0 top-0 transition-opacity duration-200 ease-in-out 	 ${
          gContext.sidenavOpen ? "opacity-50 block" : "opacity-0 hidden"
        }`}
      ></div>
      <div
        className={` bg-base-100 w-72 h-screen fixed z-50 transform  top-0 transition-transform duration-200 ease-in-out flex flex-col      ${
          gContext.sidenavOpen ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <div className="my-10 mx-6">
          <Link to={"/"} onClick={gContext.toggleSidenav}>
            <Logo />
          </Link>
          {profile && profile.images[0] && profile.images[0].url && (
            <div className="my-5 flex flex-col items-start justify-between gap-2">
              <div className="text-sm">
                Signed in as{" "}
                <span className="font-bold">{profile.display_name}</span>
              </div>
              <button className="btn-primary btn-xs btn" onClick={logout}>
                Sign out
              </button>
            </div>
          )}
          <ul className="menu mt-10 text-base-content">
            <li>
              <Link to={"/"} onClick={gContext.toggleSidenav}>
                <a>Search</a>
              </Link>
            </li>
            <li>
              <Link to={"/explore-genre"} onClick={gContext.toggleSidenav}>
                <a>Genre Explorer</a>
              </Link>
            </li>
            <li>
              <Link to={"/my-top-songs"} onClick={gContext.toggleSidenav}>
                <a>My Top Songs</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
