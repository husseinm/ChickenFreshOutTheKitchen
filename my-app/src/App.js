import React, { Component } from 'react';
import Cards from './components/Cards';
import './App.css';
import { connect } from 'react-redux';
import { addOrder } from './actions';

class App extends Component {
  constructor(){
    super();
    this.state = {
        Cards:[]
    }
  }

  addOrder() {
    this.props.addOrder(this.state.text);
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

  renderOrders(){
   const { orders } = this.props;
   return(
       <div>
           {
             orders.map(order=>{
               return(
                 <div className="col-xs orders">
                   <div key={order.id} className="card">
                     <h6>Order Number#</h6>
                     <div>{order.text}</div>
                     <button className="btn">Order Complete</button>
                   </div>
                 </div>
               )
             })
           }
     </div>
   )

 }


  render() {
    return (
      <div className="App">
      <div class="order-view"
        className="App">
        <header className="App-header">
          <div className="form-inline">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Add order"
                onChange={event => this.setState({text: event.target.value})}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.addOrder()}
              >
                Add Order
            </button>
          </div>
          <h1 className="App-title"><em>Chicken Fresh Out The Kitchen</em></h1>
        </header>
        <div className="sub-title">
          <div className="container">
            <div className="row sections">
              <div className="col-sm col1 rounded">
                <h4>Online</h4>
                <div class="container">
                  <div class="row sub-sections">
                    { this.renderOrders() }
                    <div class="col-xs orders">
                      <Cards cards={this.state.onlineCards} />
                    </div>
                    <div class="col-xs orders">
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm col2 rounded">
                <h4>In-store</h4>
                <div class="container">
                  <div class="row sub-sections">
                    <div class="col-xs orders">
                      <Cards cards={this.state.inStoreCards} />
                    </div>
                    <div className="col-xs orders">
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm col3 rounded">
                <h4>Phone</h4>
                <div class="container">
                  <div class="row sub-sections">
                    <div class="col-xs orders">
                        <Cards cards={this.state.phoneCards} />
                    </div>
                    <div className="col-xs orders">
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

function mapStateToProps(state){
  return {
    orders: state
  }
}

export default connect(mapStateToProps, { addOrder })(App);
