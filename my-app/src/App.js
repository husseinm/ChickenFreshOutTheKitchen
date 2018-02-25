import React, { Component } from 'react';
import Cards from './components/Cards';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
        Cards:[]
    }
  }

  componentWillMount() {
    this.setState({onlineCards: [
        {
          id: "1234",
          title:  "#4 Combo -Large",
          detailsList: "-Dr. Pepper"
        },
        {
          id: "12345",
          title:  "#5 Combo -Large",
          detailsList: "-Chicken Sandiwch"
        },
        {
          id: "123456",
          title:  "#6 Combo -Large",
          detailsList: "-Fries"
        }
      ]});
      this.setState({inStoreCards: [
          {
            id: "1",
            title:  "#4 Combo -Large",
            detailsList: "-Dr. Pepper"
          },
          {
            id: "2",
            title:  "#5 Combo -Large",
            detailsList: "-Chicken Sandiwch"
          },
          {
            id: "3",
            title:  "#6 Combo -Large",
            detailsList: "-Fries"
          }
        ]});
        this.setState({phoneCards: [
            {
              id: "666666",
              title:  "#4 Combo -Large",
              detailsList: "-Dr. Pepper"
            },
        ]});
  }
  render() {
    return (
      <div className="App">
      <div class="order-view"
        className="App">
        <header className="App-header">
          <h1 className="App-title"><em>Chicken Fresh Out The Kitchen</em></h1>
        </header>
        <div className="sub-title">
          <div class="container">
            <div class="row sections">
              <div class="col-sm col1 rounded">
                <h4>Online</h4>
                <div class="container">
                  <div class="row sub-sections">
                    <div class="col-xs orders">
                      <Cards cards={this.state.onlineCards} />
                    </div>
                    <div class="col-xs orders">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm col2 rounded">
                <h4>In-store</h4>
                <div class="container">
                  <div class="row sub-sections">
                    <div class="col-xs orders">
                      <Cards cards={this.state.inStoreCards} />
                    </div>
                    <div class="col-xs orders">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm col3 rounded">
                <h4>Phone</h4>
                <div class="container">
                  <div class="row sub-sections">
                    <div class="col-xs orders">
                        <Cards cards={this.state.phoneCards} />
                    </div>
                    <div class="col-xs orders">
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default App;
