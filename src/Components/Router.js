import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home"
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "Components/Header"
import VideoClip from "Components/VideoClip";
import ProdCompany from "Components/ProdCompany";
import ProdCountries from "Components/ProdCountries";

export default () => (
  <Router>
    <>
      {/* Route 중 하나만 매칭되게 해줌 */}
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Route path="/movie/:id/videoClip" component={VideoClip} />
        <Route path="/movie/:id/prodCompany" component={ProdCompany} />
        <Route path="/movie/:id/prodCountries" component={ProdCountries} />
        {/* 매칭 url 없을 경우 home으로 리다이렉트 */}
        <Redirect from="*" to="" />
      </Switch>
    </>
  </Router>
);