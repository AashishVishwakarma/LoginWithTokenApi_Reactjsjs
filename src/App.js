import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Login from "../src/components/Login/Login";
import Preferences from "../src/components/Preferences/Preferences";
import useToken from "../src/App/useToken";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
  const { token, setToken } = useToken();
  const queryClient = new QueryClient();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    // <div className="wrapper">
    //   <h1>Application</h1>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>

          <Route exact path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* // </div> */}
    </QueryClientProvider>
  );
}

export default App;
