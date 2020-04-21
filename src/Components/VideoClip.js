import React from "react";
import styled from "styled-components";

const Videos = styled.div`
  display: flex;
`;

const VideoTitle = styled.div`
  width: 240px;
  font-weight: 500;
  margin: 40px 0 10px 0;
  height: 25px;
`;

const Video = styled.div`
  margin-right: 10px;
`;

export default class extends React.Component {

    constructor(props) {
        super(props)
    const {
      location: {
        state: { videos }
      }
    } = props;
        this.state = {
          videos
        };
    }


  async componentDidMount() {
    const {
      location: {
        state: { videos }
      }
    } = this.props;
      this.setState({ videos });
  }
  render() {
      console.log(this.state.videos);
      
      const { videos } = this.state;
            //   console.log(videos[0]);

    return (
      <Videos>
        {videos &&
          videos.map((video, idx) =>
            idx < 3 ? (
              <Video>
                <VideoTitle key={video.id}>{video.name}</VideoTitle>
                <iframe
                  width="240"
                  height="180"
                  src={`https://www.youtube.com/embed/${video.key}`}
                ></iframe>
              </Video>
            ) : (
              ``
            )
          )}
      </Videos>
    );
  }
}