import { Fragment, useContext, useEffect, useState } from "react";
import { catchErrors } from "../../utils";
import GlobalContext from "../../context/appContext";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Logo } from "./Logo";
import { getCurrentUserProfile, logout } from "../../spotify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const [profile, setProfile] = useState(null);
  const gContext = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="navbar mb-2 relative flex bg-transparent text-neutral-content container mx-auto max-w-7xl">
      <div className="flex-1  ">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      <div className="flex-1 justify-end ">
        <Link to="/my-top-songs">
          <button className="btn b btn-xs btn-outline ">
            My&nbsp;Top&nbsp;Songs
          </button>
        </Link>
        {location.pathname !== "/" && (
          <button
            className="btn btn-square btn-ghost -mr-2"
            onClick={() => gContext.isSearchOverlay(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        )}

        <Menu as="div" className="ml-3 relative pr-2 mr-2">
          <div>
            <Menu.Button className="bg-gray-800 m-1 flex justify-center items-center text-sm rounded-full hover:bg-base-300  ">
              {profile ? (
                <img
                  className="w-10 h-10 rounded-full "
                  src={profile.images[0].url}
                  alt="profile__pic"
                />
              ) : (
                <div className="relative h-10 w-10 animate-spin rounded-full bg-gradient-to-r from-primary to-base-100   ">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8  bg-base-100  rounded-full "></div>
                </div>
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute top-10 right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Signed in as{" "}
                    <span className="font-bold">{profile.display_name}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={logout}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
