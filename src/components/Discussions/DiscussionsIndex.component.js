import React, { useState, useContext }  from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Page1 from "./page1/page1.component";
import Page2 from "./Page2/page2.component";
import Page3 from "./page3/page3.component";

export default function DiscussionsIndex() {

    return(
        
        <Router>
          
          <Route exact path="/Discussions/page1/" component={Page1}/>
          <Route exact path="/Discussions/page2/" component={Page2}/>
          <Route exact path="/Discussions/page3/" component={Page3}/>
        </Router>
    )
}