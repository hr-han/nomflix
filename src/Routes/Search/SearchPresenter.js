import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader"
import Section from "Components/Section"
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Helmet } from "react-helmet";


const Container = styled.div`
  padding:20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width:100%;

`;

const Input = styled.input`
  all:unset;
  font-size:28px;
  width:100%;

`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  handleSubmit,
  loading,
  error,
  updateTerm
}) => (
  <>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or Shows..."
          value={searchTerm}
          onChange={updateTerm}
        ></Input>
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map(movie => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}

          {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.map(show => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
        </>
      )}
      {error && <Message color="#e74c3c" text={error} />}
      {tvResults &&
        movieResults &&
        tvResults.length === 0 &&
        movieResults.length === 0 && (
          <Message color="#95a5a6" text="Nothing found" />
        )}
    </Container>
  </>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updateTerm: PropTypes.func.isRequired
}

export default SearchPresenter;

