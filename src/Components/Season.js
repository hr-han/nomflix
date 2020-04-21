import React from "react";
import styled from "styled-components";
import Poster from "Components/Poster";
import { TVApi } from "../api";

const Collections = styled.div`
  height:600px;
  width:100%;
`;

const Name = styled.div`
  font-weight: 500;
  margin: 40px 0 0 10px;
  height: 25px;
  text-align:left;

`;

const Collection = styled.div`
  margin-right: 10px;
  display:flex;
  flex-direction:column;
  height:auto;
  width:100%;
  /* position:relative; */
`;

const ImageContainer = styled.div` 
    display:flex;
`;

const Image = styled.img`
    margin:10px;
    max-width: 100%; 
    height: 500px;
     background-size:cover;
    filter: blur(3px);
    opacity:1;
    
`;

const NoImage = styled.span`
    font-size:16px;
    color:yellow;
    margin:10px;
    font-weight:600;
    text-align:center;
`;
const PosterContainer= styled.div`
    /* position:absolute; */
    display:grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    grid-column-gap:10px;
    margin-top:10px;
    justify-content:space-around;
`;
const Parts = styled.div`
    height:200px;
    width:70px;

     /* display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto); */
`;

export default class extends React.Component {

    constructor(props) {
        super(props)
        const {
            location: {
                state: { seasons, id  }
            }
        } = props;
        this.state = {
            seasons, id
        };
    }


    async componentDidMount() {
        const {
            location: {
                state: { seasons, id  }
            }
        } = this.props;

        let result = [];
        try {
            await seasons.map(async (__, idx) => {
                const { data } = await TVApi.season(id, idx);
                result.push(data)
            });
            
        } catch (error) {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ result })
        }


    }
    render() {


        const { result } = this.state;

        return (
            <Collections>
                {result && result.length > 0 && result.map(season => (
                    <Collection key={season.id}>
                        <Name>{season.name}</Name>

                        <ImageContainer>
                            {season.poster_path ? <Image src={`https://image.tmdb.org/t/p/w300${season.poster_path}`} /> :
                                (<NoImage>No Image</NoImage>)}
                            <PosterContainer>
                                {season.episodes && season.episodes.length > 0 && season.episodes.map(episode => (
                                    <Parts>
                                        <Poster
                                            key={episode.id}
                                            id={episode.id}
                                            title={episode.name}
                                            imageUrl={episode.still_path}
                                            rating={episode.vote_average}
                                            year={episode.air_date && episode.air_date.substring(0, 4)}
                                            isMovie={false}
                                        />
                                    </Parts>
                                ))}
                            </PosterContainer>
                        </ImageContainer>
                    </Collection>
                ))}
            </Collections>
        );
    }
}