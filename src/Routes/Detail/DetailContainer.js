import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, TVApi } from "api";

export default class extends React.Component{
    constructor(props) {
        super(props)
        const { location:{pathname} } = props;
        this.state = {
          result: null,
          error: null,
          loading: true,
          isMovie: pathname.includes("/movie")
        };
    }

    async componentDidMount() {
        const {match: {params:{id}}, history:{push}} = this.props
        const {isMovie} =this.state
        const parseId = parseInt(id);
        if (isNaN(parseId)) {
          return push("/");
        }
        let result = null;
        try {
            if (isMovie) {
                // const request = await moviesApi.movieDetail(parseId);
                // result = request.data;
                ({data:result} = await moviesApi.movieDetail(parseId));
            } else {
                // const request = await TVApi.tvDetail(parseId);
                // result = request.data;
                ({data: result} = await TVApi.tvDetail(parseId));
            }
        } catch (error) {
            this.setState({error : "Can't find anything."})
        } finally {
            this.setState({ loading:false, result, isMovie })
        }
    }
    render() {
        const { result, error, loading, isMovie } = this.state;
        console.log(result);
        
        return (
          <DetailPresenter result={result} error={error} loading={loading} isMovie={isMovie} />
        );
    }
}