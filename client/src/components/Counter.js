import React, { Component } from 'react';

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {count: 1}
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  tick () {
    this.setState({count: (this.state.count + 1)})
  }
  render () {
    return (
      <div >
        <p>Timer: {this.state.count}</p>
      </div>
    )
  }
}

export default Counter;
