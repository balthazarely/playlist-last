const LOGIN_URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8888/login"
    : "https://playlistnr.herokuapp.com/login";

const Login = () => (
  <div>
    <a href={LOGIN_URI}>Log in to Spotify</a>
  </div>
);

export default Login;
