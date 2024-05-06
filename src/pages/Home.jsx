import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";

const Home = () => {
  return (
    <>
        <Main />
        <Row rowID='1' title='Up Coming' fetchUrl={requests.requestUpcoming} />
        <Row rowID='2' title='Popularity' fetchUrl={requests.requestPopular} />
        <Row rowID='3' title='Top Rated' fetchUrl={requests.requestTopRated} />
        <Row rowID='4' title='Trending' fetchUrl={requests.requestTrending} />
    </>
  );
};

export default Home;
