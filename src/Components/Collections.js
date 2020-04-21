import React from "react";
import styled from "styled-components";
import { moviesApi } from "api";
import Poster from "Components/Poster";

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
`;

const ImageContainer = styled.div`
 display:flex;
`;

const Image = styled.img`
    margin:10px;
    max-width: 100%; 
    height: auto;
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

const PosterContainer = styled.div`
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
    width:120px;
`;



export default class extends React.Component {

    constructor(props) {
        super(props)
        const {
            location: {
                state: { collection}
            }
        } = props;
        this.state = {
            collection
        };
    }


    async componentDidMount() {
        const {
            location: {
                state: { collection}
            }
        } = this.props;

        let result = null;
        try {
            ({ data: result } = await moviesApi.collection(collection.id));
        } catch (error) {
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ collection, result })
        }
        

    }
    render() {
        const { collection, result } = this.state;

        if (!collection) {
            return null;
        }

        return (
            <Collections>
                <Collection>
                    <Name key={collection.id}>{collection.name}</Name>
                    <ImageContainer>
                        {collection.poster_path ? <Image src={`https://image.tmdb.org/t/p/w300${collection.poster_path}`} /> :
                            (<NoImage>No Image</NoImage>)}
                        <PosterContainer>
                            {result && result.parts.length > 0 && result.parts.map(movie => (
                                <Parts>
                               
                                    <Poster
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.original_title}
                                        imageUrl={movie.poster_path}
                                        rating={movie.vote_average}
                                        year={movie.release_date && movie.release_date.substring(0, 4)}
                                        isMovie={true}
                                    />
                                </Parts>
                                ))}
                           
                        </PosterContainer>
                    </ImageContainer>
                </Collection>
            </Collections>
        );
    }
}