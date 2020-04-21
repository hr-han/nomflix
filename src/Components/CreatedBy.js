import React from "react";
import styled from "styled-components";

const Produtions = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-weight: 500;
  margin: 40px 0 0 0;
  height: 25px;
  text-align:center;
`;

const Prodution = styled.div`
  margin-right: 10px;
  display:flex;
  flex-direction:column;
  height:100px;
`;

const Logo = styled.img`
    height:40px;
    display:flex;
    margin:10px;
    
`;

const NoImage = styled.span`
    font-size:16px;
    color:yellow;
    margin:10px;
    font-weight:600;
    text-align:center;
`;

export default class extends React.Component {

    constructor(props) {
        super(props)
        const {
            location: {
                state: { createdBy }
            }
        } = props;
        this.state = {
            createdBy
        };
    }


    async componentDidMount() {
        const {
            location: {
                state: { createdBy }
            }
        } = this.props;
        this.setState({ createdBy });

        console.log(createdBy);
        
    }
    render() {
        

        const { createdBy } = this.state;

        console.log(createdBy);

        return (
            <Produtions>
                {createdBy &&
                    createdBy.map((creator) =>
                        <Prodution>
                            <Name key={creator.id}>{creator.name}</Name>
                            {creator.profile_path ? <Logo src={`https://image.tmdb.org/t/p/w300${creator.profile_path}`} /> : 
                                (<NoImage>No Image</NoImage>) }
                        </Prodution>
                    )}
            </Produtions>
        );
    }
}