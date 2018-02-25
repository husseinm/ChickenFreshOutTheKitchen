import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div class="card">
        <div class="card-block">
          <h6 class="card-title">{this.props.card.id}</h6>
          <h8 class="card-subtitle mb-2 text-muted">{this.props.card.title}</h8>
          <p class="card-text">
            <div className="Card">
              {this.props.card.detailsList}
            </div>
          </p>
        <button class="btn">Order Complete</button>
        </div>
      </div>
    );
  }
}

export default Card;
