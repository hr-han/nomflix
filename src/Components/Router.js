import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home"
import Search from "Routes/Search";
import TV from "Routes/TV";
import Header from "Components/Header"
//import Detail from "Routes/Detail";

export default () => (
  <Router>
    <>
      {/* Route 중 하나만 매칭되게 해줌 */}
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        {/* <Route path="/tv/popular" render={() => <h1>TV Popular</h1>} /> */}
        <Route path="/search" component={Search} />
        {/* 매칭 url 없을 경우 home으로 리다이렉트 */}
        <Redirect from="*" to="" />
      </Switch>
      {/* <Route path="/" exact component={Detail} /> */}
    </>
  </Router>
);