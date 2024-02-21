import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route,Router } from "@mui/icons-material";

import { Switch } from "@mui/material";
function App() {
  
  return (
    <div className="app">
        
        <div className="app_body">
          <Router>
          <Sidebar/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat/>
                </Route>
                <Route path="/">
                <Chat/>
                </Route>
            </Switch>
            </Router>
            </div>
  
    </div>
  );
}

export default App;



