import React, { Component } from 'react';
import moment from 'moment'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {test: "Loading", bg: "white", timePlaced: props.timePlaced}
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  tick () {
    var now = new Date()
    now = moment(now).format("MM/DD/YYYY HH:mm:ss");
    var then = this.state.timePlaced
    var diff = moment(now,"MM/DD/YYYY HH:mm:ss").diff(moment(then,"MM/DD/YYYY HH:mm:ss"));
    var seconds = diff/1000
    if (seconds >= 120){
      this.setState({bg: "red"})
    }
    var d = moment.duration(diff);
    var output = Math.floor(d.asHours()) + moment.utc(diff).format(":mm:ss");
    this.setState({test: output})
  }

  render () {
    return (
      <div style={{backgroundColor:this.state.bg}}>
        <p>Timer: {this.state.test}</p>
      </div>
    )
  }
}

export default Counter;
