import React from "react";

const Home = () => (
  <div className="h1 text-center p-2" data-testid="Home">
    Welcome to CarBid
    <br />
    <img
      className="mt-4"
      src={require("./carbid.gif")}
      alt=""
      height="500"
      style={{ borderRadius: 5 }}
    />
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
