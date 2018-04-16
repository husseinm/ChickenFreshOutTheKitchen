import React, { Component } from 'react'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import aws_exports from './aws-exports'
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'
import { Line } from 'react-chartjs-2'
import moment from 'moment'


Amplify.configure(aws_exports)

const styles = {
  body: {
    textAlign: 'center'
  },
  backgroundColor: [
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
  ],
  borderColor: [
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
  ],
  borderWidth: 1
}

const options = {
  scales: {
    xAxes: [{
      stacked: true
    }],
    yAxes: [{
      stacked: true
    }]
  }
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stats: {
        status: false
      }
    }
  }

  componentDidMount() {
    fetch('https://78ct2v2kqh.execute-api.us-east-1.amazonaws.com/dev/admin_panel').then(r => r.json()).then(stats => {
      this.setState({ stats })
    })
  }

  render() {
    const { stats } = this.state

    if (!stats.status) {
      return <LinearProgress />
    }

    return (
      <Grid style={styles.body}>
        <Card>
          <CardContent>
            <h2>Average Order Completion Time:</h2>
            <h1>{moment.utc(100 * stats.avgOrderTime).format('mm:ss')}</h1>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Average Order Completion Time (Over the last 12 hours):</h2>
            <h1>{moment.utc(100 * stats.avgOrderTimeRecent).format('mm:ss')}</h1>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Day by Day Average Order Completion Times (In Seconds):</h2>
            <Line data={{
              labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              backgroundColor: styles.backgroundColor,
              borderColor: styles.borderColor,
              datasets: [{
                label: 'Daily Average Order Completion Time',
                backgroundColor: styles.backgroundColor[0],
                borderColor: styles.borderColor[0],
                borderWidth: styles.borderWidth,
                data: [0, 1, 2, 3, 4, 5, 6].map(i => stats.dayByDayOrderCompletionTimes[i])
              }]
            }} options={options} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Day by Day Order Count:</h2>
            <Line data={{
              labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              datasets: [{
                label: 'Daily Order Count',
                backgroundColor: styles.backgroundColor[1],
                borderColor: styles.borderColor[1],
                borderWidth: styles.borderWidth,
                data: [0, 1, 2, 3, 4, 5, 6].map(i => stats.dayByDayOrderCount[i])
              }]
            }} options={options} />
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default withAuthenticator(App, { includeGreetings: true });
