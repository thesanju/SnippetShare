const mode = process.env.REACT_APP_MODE;
const backendURL = mode === "pro" ? "http://gist.sanjayjr.com/gists" : "http://localhost:3000/gists";

export default backendURL;
