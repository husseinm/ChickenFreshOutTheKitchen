import React, { Component } from 'react';
import './App.css';

class App extends Component {


  render() {
    return (
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
                      <div class="card">
                        <div class="card-block">
                          <h6 class="card-title">#42332</h6>
                          <h8 class="card-subtitle mb-2 text-muted">#4 Combo -Large</h8>
                          <p class="card-text">
                            -Dr. Pepper <br />-Chicken Sandiwch <br />-Fries
                          </p>
                        <button class="btn">Order Complete</button>
                        </div>
                      </div>
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
                      <div class="card">
                        <div class="card-block">
                          <h6 class="card-title">#42332</h6>
                          <h8 class="card-subtitle mb-2 text-muted">#4 Combo -Large</h8>
                          <p class="card-text">
                            -Dr. Pepper <br />-Chicken Sandiwch <br />-Fries
                          </p>
                        <button class="btn">Order Complete</button>
                        </div>
                      </div>
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
                      <div class="card">
                        <div class="card-block">
                          <h6 class="card-title">#42332</h6>
                          <h8 class="card-subtitle mb-2 text-muted">#4 Combo -Large</h8>
                          <p class="card-text">
                            -Dr. Pepper <br />-Chicken Sandiwch <br />-Fries
                          </p>
                        <button class="btn">Order Complete</button>
                        </div>
                      </div>
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
    );
  }
}

export default App;
