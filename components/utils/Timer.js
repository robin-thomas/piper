import { Component } from "react";

import Moment from "./Moment";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: isNaN(props.time) ? new Date() : props.time,
      timeStr: ""
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({
      timeStr: Moment(this.state.time).fromNow()
    });
  };

  render() {
    return (
      <span>
        <i>{this.state.timeStr}</i>
      </span>
    );
  }
}

export default Timer;
