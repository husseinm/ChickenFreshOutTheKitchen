import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
  render() {
    let cardItems;
    if(this.props.cards) {
      cardItems = this.props.cards.map(card => {
        return (
          <Card card={card}/>
        );
      });
    }
    console.log(this.props);
    return (
      <div className="Cards">
        {cardItems}
      </div>
    );
  }
}

export default Cards;
