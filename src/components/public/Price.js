import React from 'react';

class Price extends React.Component {
  constructor() {
    super();
    this.state = { eth: '' };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR', true);
    // eslint-disable-next-line func-names
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const jsonObj = JSON.parse(xhr.responseText);
          this.setState({ eth: jsonObj });
        }
      }
    }.bind(this);
    xhr.send(null);
  }


  render() {
    let priceDiv = 'Loading';
    if (this.state.eth) {
      priceDiv = (
        <div>
          <h2>EUR/ETH price: {this.state.eth.EUR}</h2>
          <h3>USD/ETH price: {this.state.eth.USD}</h3>
          <p>BTC/ETH price: {this.state.eth.BTC}</p>
        </div>);
    }
    return (
      <div>
        <h1>ETH PRICE</h1>
        {priceDiv}
      </div>
    );
  }
}

export default (Price);
