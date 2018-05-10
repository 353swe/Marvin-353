import React from 'react';
import PriceOperationLine from '../custom/PriceOperationLine';

class Price extends React.Component {
  static toGasPrice(value) {
    return Math.ceil(value / 10);
  }

  static GweiToEth(value) {
    return (value / (10 ** 9)).toFixed(9);
  }

  constructor() {
    super();
    this.state = { eth: '', ethGas: '' };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    const xhrgas = new XMLHttpRequest();
    xhr.open('GET', 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR', true);
    xhrgas.open('GET', 'https://ethgasstation.info/json/ethgasAPI.json', true);
    // eslint-disable-next-line func-names
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const jsonObj = JSON.parse(xhr.responseText);
          this.setState({ eth: jsonObj });
        }
      }
    }.bind(this);
    // eslint-disable-next-line func-names
    xhrgas.onload = function () {
      if (xhrgas.readyState === 4) {
        if (xhrgas.status === 200) {
          const jsonObj = JSON.parse(xhrgas.responseText);
          this.setState({ ethGas: jsonObj });
        }
      }
    }.bind(this);
    xhr.send(null);
    xhrgas.send(null);
  }

  render() {
    let priceTable = 'Loading';
    let gasTable = 'Loading';
    let optTable = 'Loading';
    if (this.state.eth) {
      priceTable = (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ETH</th>
              <th scope="col">EUR</th>
              <th scope="col">USD</th>
              <th scope="col">BTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 Ξ</td>
              <td>{this.state.eth.EUR} €</td>
              <td>{this.state.eth.USD} $</td>
              <td>{this.state.eth.BTC} ฿</td>
            </tr>
            <tr>
              <td>{1 / this.state.eth.EUR} Ξ</td>
              <td>1 €</td>
              <td>{(this.state.eth.USD / this.state.eth.EUR).toFixed(2)} $</td>
              <td>{this.state.eth.BTC / this.state.eth.EUR} ฿</td>
            </tr>
            <tr>
              <td>{1 / this.state.eth.USD} Ξ</td>
              <td>{(this.state.eth.EUR / this.state.eth.USD).toFixed(2)} €</td>
              <td>1 $</td>
              <td>{this.state.eth.BTC / this.state.eth.USD} ฿</td>
            </tr>
            <tr>
              <td>{1 / this.state.eth.BTC} Ξ</td>
              <td>{(this.state.eth.EUR / this.state.eth.BTC).toFixed(2)} €</td>
              <td>{(this.state.eth.USD / this.state.eth.BTC).toFixed(2)} $</td>
              <td>1 ฿</td>
            </tr>
          </tbody>
        </table>
      );
    }
    if (this.state.ethGas) {
      gasTable = (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Speed</th>
              <th scope="col">Gwei</th>
              <th scope="col">ETH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Safe</td>
              <td>{Price.toGasPrice(this.state.ethGas.safeLow)} Gwei</td>
              <td>{Price.GweiToEth(Price.toGasPrice(this.state.ethGas.safeLow))} Ξ</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{Price.toGasPrice(this.state.ethGas.average)} Gwei</td>
              <td>{Price.GweiToEth(Price.toGasPrice(this.state.ethGas.average))} Ξ</td>
            </tr>
            <tr>
              <td>Fast</td>
              <td>{Price.toGasPrice(this.state.ethGas.fast)} Gwei</td>
              <td>{Price.GweiToEth(Price.toGasPrice(this.state.ethGas.fast))} Ξ</td>
            </tr>
            <tr>
              <td>Fastest</td>
              <td>{Price.toGasPrice(this.state.ethGas.fastest)} Gwei</td>
              <td>{Price.GweiToEth(Price.toGasPrice(this.state.ethGas.fastest))} Ξ</td>
            </tr>
          </tbody>
        </table>
      );
      if (this.state.eth && this.state.ethGas) {
        optTable = (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Operation</th>
                <th scope="col">Gas cost</th>
                <th scope="col">ETH cost</th>
                <th scope="col">EUR cost safe</th>
                <th scope="col">EUR cost average</th>
                <th scope="col">EUR cost fast</th>
                <th scope="col">EUR cost fastest</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Reading an info</td>
                <td>Free</td>
                <td>Free</td>
                <td>Free</td>
                <td>Free</td>
                <td>Free</td>
                <td>Free</td>
              </tr>
              <PriceOperationLine
                operation="Deploy university contract"
                gasCost={3400000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Add a new academic year"
                gasCost={750000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Add a new course"
                gasCost={590000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Add a new exam"
                gasCost={420000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Add a new admin"
                gasCost={90000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Request a student account"
                gasCost={700000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Request a teacher account"
                gasCost={490000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Confirm a student"
                gasCost={70000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Confirm a teacher"
                gasCost={70000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Deny a student"
                gasCost={40000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Deny a teacher"
                gasCost={40000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Remove an academic year"
                gasCost={33000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Remove an admin"
                gasCost={24000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Remove a student"
                gasCost={40000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Remove a teacher"
                gasCost={29000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Associate a teacher to an exam"
                gasCost={80000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Register a valuation "
                gasCost={60000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
              <PriceOperationLine
                operation="Enroll to optional exam"
                gasCost={92000}
                ethToEur={this.state.eth.EUR}
                gasCostSafe={Price.toGasPrice(this.state.ethGas.safeLow)}
                gasCostAverage={Price.toGasPrice(this.state.ethGas.average)}
                gasCostFast={Price.toGasPrice(this.state.ethGas.fast)}
                gasCostFastest={Price.toGasPrice(this.state.ethGas.fastest)}
              />
            </tbody>
          </table>
        );
      }
    }
    return (
      <div>
        <h2>Ethereum price</h2>
        {priceTable}
        <div>1 Ether = 1,000,000,000 Gwei (10^9)</div>
        <h2>Gas price</h2>
        {gasTable}
        <h2>Operation price</h2>
        {optTable}
        <p>Prices are for a standard use of Marvin and may vary depending on the circumstances</p>
      </div>
    );
  }
}

export default (Price);
