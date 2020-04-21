import React from "react";
import styled from "styled-components";

const Countries = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-weight: 500;
  margin: 40px 0 0 0;
  height: 25px;
  text-align:center;
`;

const Country = styled.div`
  margin-right: 10px;
  display:flex;
  flex-direction:column;
  width:150px;
  height:80px;
`;

const Flag = styled.img`
width:100%;
height:100%;
    margin:10px;
`;

export default class extends React.Component {

    constructor(props) {
        super(props)
        const {
            location: {
                state: { countries }
            }
        } = props;
        this.state = {
            countries
        };
    }


    async componentDidMount() {
        const {
            location: {
                state: { countries }
            }
        } = this.props;
        this.setState({ countries });
    }
    render() {
        console.log(this.state.countries);

        const { countries } = this.state;

        return (
            <Countries>
                {countries &&
                    countries.map((country, idx) =>
                        <Country>
                            <Name key={idx}>{country.name}</Name>
                            <Flag src={`http://www.geonames.org/flags/x/${country.iso_3166_1.toLowerCase()}.gif`} />

                        </Country>
                    )}
            </Countries>
        );
    }
}