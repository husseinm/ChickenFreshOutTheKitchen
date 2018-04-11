import React, { Component } from 'react';

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {count: 1, tens: 0, mins: 0, minsTens: 0, bg: 'white'}
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  tick () {
    this.setState({count: (this.state.count + 1)})
    if (this.state.count == 9){
      this.state.count = -1;
      this.state.tens = this.state.tens + 1;
      if (this.state.tens == 6){
        this.state.tens = 0;
        this.state.mins = this.state.mins + 1;
        if(this.state.mins >= 2){
          this.state.bg = 'red';
        }
        if(this.state.mins == 10){
          this.state.mins = 0;
          this.state.minsTens = this.state.minsTens + 1;
        }
      }
    }
  }
  render () {
    return (
      <div style={{backgroundColor:this.state.bg}}>
        <p>Timer: {this.state.minsTens}{this.state.mins}:{this.state.tens}{this.state.count}</p>
      </div>
    )
  }
}

export default Counter;
