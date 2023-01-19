import "./App.css";
import LoginPage from "./pages/loginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreenPage from "./pages/homeScreenPage";
import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import EventDetailsPage from "./pages/eventDetailsPage";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const notify = (type, message) => {
  if(type === "success") {
    toast.success(message, {position: toast.POSITION.BOTTOM_LEFT});
  } else if(type === "info") {
    toast.info(message, {position: toast.POSITION.BOTTOM_LEFT});
  } else if(type === "warn") {
    toast.warn(message, {position: toast.POSITION.BOTTOM_LEFT});
  } else if(type === "error") {
    toast.error(message, {position: toast.POSITION.BOTTOM_LEFT});
  }
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  return (
    <Router>
      <Switch>
        {loggedIn ? (
          <div className="bg-breen-gray w-screen">
            <Navbar user={user}/>
            <ToastContainer />
            <div className="flex px-8 pt-8 pb-40">
              <div className="w-1/4">
                <Sidebar />
              </div>
              <div className="w-full">
                <Route path="/" exact component={()=><HomeScreenPage notify={notify}/>} />
                <Route path="/home" component={()=><HomeScreenPage notify={notify}/>} />
                <Route path="/site/details/:siteId" component={()=><EventDetailsPage notify={notify}/>} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <Route
              path="/"
              render={() => (
                <LoginPage setLoggedIn={(value) => setLoggedIn(value)} setUser={(user) => setUser(user)}/>
              )}
            />
            <Route
              path="/login"
              component={() => (
                <LoginPage setLoggedIn={(value) => setLoggedIn(value)} setUser={(user) => setUser(user)}/>
              )}
            />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
