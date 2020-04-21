import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader"
import { Helmet } from "react-helmet";
import Message from "Components/Message";
import { Link, withRouter, Route } from "react-router-dom";
import VideoClip from "Components/VideoClip";
import ProdCompany from "Components/ProdCompany";
import ProdCountries from "Components/ProdCountries";
import Collections from "Components/Collections";
import Season from "Components/Season";
import CreatedBy from "../../Components/CreatedBy";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size:cover;
  filter: blur(3px);
  opacity:0.5;
  z-index:0;
`;

const Content = styled.div`
  width:100%;
  height:100%;
  display:flex;
  position:relative;
  z-index:1;

`;
const Cover = styled.div`
  width:30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size:cover;
  height:100%;
  border-radius:5px;
`;

const Data = styled.div`
  width:70%;
  margin-left:10px;
`;

const Title = styled.h3`
  font-size:32px;
  margin-bottom:20px;
`;

const ItemContainer = styled.div`
  margin:20px 0;
`;

const Item = styled.span`
`;

const ItemLink = styled.a`
  position: relative;
`;

const ImdbLogo = styled.img`
  position: absolute;
  height: 16px;
  bottom: 0px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
`;

const Divider = styled.span`
  margin:10px;
`;



const Overview = styled.p`
  font-size:12px;
  opacity:0.7;
  line-height:1.5;
  width:50%;
`;


const Tabs = styled("ul")`
  margin-top:15px;
  display: flex;
`;

const Tab = styled("li")`
  margin-right: 15px;
  /* text-transform: uppercase; */
  font-weight: 600;
  border: 2px solid #F7A202;
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => (props.active ? "#F7A202" : "transparent")};
  /* color: ${props => (props.active ? "white" : "black")}; */
  color:white;
`;

const DetailPresenter = withRouter(
  ({ location: { pathname }, result, error, loading, isMovie }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
            | Nomflix
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>💠</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time} min
              </Item>
              <Divider>💠</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, idx) =>
                    idx === result.genres.length - 1
                      ? genre.name
                      : `${genre.name}/`
                  )}
              </Item>
              <Divider>💠</Divider>
              <Item>
                <ItemLink
                  href={`http://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  <ImdbLogo src="https://ia.media-imdb.com/images/G/01/imdb/images/favicon-2165806970"></ImdbLogo>
                </ItemLink>
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            {/* TV show 일 경우 분기 */}
            <Tabs>
              <Tab active={pathname === `/movie/${result.id}/videoClip`}>
                {/* <Link to={`/movie/${result.id}/videoClip`}>VideoClip</Link> */}
                <Link
                  to={{
                    pathname: `/movie/${result.id}/videoClip`,
                    state: {
                      videos: result.videos.results
                    }
                  }}
                >
                  VideoClip
                </Link>
              </Tab>
              <Tab active={pathname === `/movie/${result.id}/prodCompany`}>
                  <Link to={{
                    pathname: `/movie/${result.id}/prodCompany`,
                    state: {
                      companies: result.production_companies
                    }
                  }}>Company</Link>
              </Tab>

                {isMovie ? (
                <>
                  <Tab active={pathname === `/movie/${result.id}/prodCountries`}>
                    <Link to={{
                      pathname: `/movie/${result.id}/prodCountries`,
                      state: {
                        countries: result.production_countries
                      }
                    }}>Countries</Link>
                  </Tab>
                
                <Tab active={pathname === `/movie/${result.id}/collections`}>
                  <Link to={{
                    pathname: `/movie/${result.id}/collections`,
                    state: {
                      collection: result.belongs_to_collection,
                      isMovie: isMovie,
                      id: result.id
                    }
                  }}>Collections</Link>
                </Tab>
                </>
                ) : (
                  <>
                    <Tab active={pathname === `/show/${result.id}/createdBy`}>
                      <Link to={{
                        pathname: `/show/${result.id}/createdBy`,
                        state: {
                          createdBy: result.created_by
                        }
                      }}>Creator</Link>
                    </Tab>
                    <Tab active={pathname === `/show/${result.id}/season`}>
                      <Link to={{
                        pathname: `/show/${result.id}/season`,
                        state: {
                          seasons: result.seasons,
                          id: result.id
                        }
                      }}>Season</Link>
                    </Tab>
                    </>
                )}

            </Tabs>
            <Route path="/movie/:id/videoClip" component={VideoClip} />
            <Route path="/movie/:id/prodCompany" component={ProdCompany} />
            <Route path="/movie/:id/prodCountries" component={ProdCountries} />
            <Route path="/movie/:id/collections" component={Collections} />
            <Route path="/show/:id/season" component={Season} />
            <Route path="/show/:id/createdBy" component={CreatedBy} />
          </Data>
        </Content>
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
