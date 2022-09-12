import React, { Component } from 'react';
import propTypes from 'prop-types';

const SECOND = 1000;

class Clock extends Component {
  componentDidMount() {
    const { tickCallback } = this.props;
    this.timer = setInterval(() => {
      tickCallback();
    }, SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time } = this.props;
    return <div>{time}</div>;
  }
}

Clock.propTypes = {
  time: propTypes.number.isRequired,
  tickCallback: propTypes.func.isRequired,
};

export default Clock;
