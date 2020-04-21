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
                state: { companies }
            }
        } = props;
        this.state = {
            companies
        };
    }


    async componentDidMount() {
        const {
            location: {
                state: { companies }
            }
        } = this.props;
        this.setState({ companies });
    }
    render() {
        console.log(this.state.companies);

        const { companies } = this.state;

        return (
            <Produtions>
                {companies &&
                    companies.map((company) =>
                        <Prodution>
                            <Name key={company.id}>{company.name}</Name>
                            {company.logo_path ? <Logo src={`https://image.tmdb.org/t/p/w300${company.logo_path}`} /> : 
                                (<NoImage>No Image</NoImage>) }
                        </Prodution>
                    )}
            </Produtions>
        );
    }
}