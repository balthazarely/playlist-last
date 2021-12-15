import { BsSpotify } from "react-icons/bs";

const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://playlistnr.herokuapp.com/login";

const Login = () => (
  <div className="w-full h-screen flex justify-center items-center">
    <a href={LOGIN_URI}>
      <button class={`btn btn-primary btn-outline `}>
        <div className="flex flex-row items-center justify-center">
          <BsSpotify className=" w-6 h-6 mr-2" />
          Log in to Spotify
        </div>
      </button>
    </a>
  </div>
);

export default Login;
