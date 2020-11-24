import React from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "./VideoList";
import Setting from "./Setting";
import { thunkedSearch } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSettingOpen: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(/* TODO: 여기에서 액션을 실행합니다 */);
  }

  handleSettingButtonClick() {
    this.setState((prevState) => ({
      isSettingOpen: !prevState.isSettingOpen,
    }));
  }

  render() {
    return (
      <div className={this.props.darkMode ? "main dark" : "main light"}>
        <Nav
          handleSettingButtonClick={this.handleSettingButtonClick.bind(this)}
        />
        <div className="col-md-7">
          <VideoPlayer
            video={this.props.currentVideo}
            darkMode={this.props.darkMode}
          />
        </div>
        <div className="col-md-7">
          <VideoList videos={this.props.videos} />
        </div>
        <Setting
          isOpen={this.state.isSettingOpen}
          handleClose={this.handleSettingButtonClick.bind(this)}
        ></Setting>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.searchReducer.isLoading,
    videos: state.searchReducer.videos,
    currentVideo: state.videoReducer.currentVideo,
    darkMode: state.settingReducer.darkMode,
  };
};

export default connect(mapStateToProps)(App);
