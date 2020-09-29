import React from 'react';
import axios from 'axios';

import Tag from './components/Tag.jsx';
import Availability from './components/Availability.jsx';
import AddToBag from './components/AddToBag.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: 1,
      product: {},
    };
  }

  componentDidMount() {
    axios.get(`${this.state.pid}/product-details`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          product: response.data[0],
        }, () => { console.log('state.products updated'); });
      })
      .catch((error) => {
        console.log('get error:', error);
      });
  }

  render() {
    return (
      <div id="container">
        <Tag tag={this.state.product.tag} />
        <p id="product-line">{this.state.product.product_line}</p>
        <h1 id="product-title">{this.state.product.name}</h1>
        <div className="reviews">
          <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <a className="review-text">
              <span className="review-count">{this.state.product.review_count}</span> Reviews
            </a>
        </div>
        <h1 id="price">${this.state.product.price}</h1>
        <Availability onlineInv={this.state.product.online_inventory} />
        <AddToBag limit={this.state.product.customer_limit} />
      </div>
    );
  }
}

export default App;