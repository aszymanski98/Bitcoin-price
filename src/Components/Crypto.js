import React, { Component } from "react";
import "../Styles/Crypto.css";

import axios from "axios";
import CryptoList from "./CryptoList";

export default class Crypro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptoList: [],
      filteredCryptoList: [],
    };
  }

  componentDidMount() {
    this.getCryptoData();
    this.timerID = setInterval(() => {
      this.getCryptoData();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getCryptoData = () => {
    axios.get("https://blockchain.info/pl/ticker").then((res) => {
      const tickers = res.data;

      this.setState((state) => {
        let newCryptoList = [];

        for (const [ticker, cryptoRate] of Object.entries(tickers)) {
          let lastCryptoObj = state.cryptoList.find((cryptoObj) => {
            return cryptoObj.currency === ticker;
          });

          let newCryptoObj = {
            currency: ticker,
            lastRate: cryptoRate.last,
            buy: cryptoRate.buy,
            sell: cryptoRate.sell,
            symbol: cryptoRate.symbol,
          };

          if (lastCryptoObj !== undefined) {
            if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
              newCryptoObj.cssClass = "green";
              newCryptoObj.arrow = String.fromCharCode(8593);
            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
              newCryptoObj.cssClass = "red";
              newCryptoObj.arrow = String.fromCharCode(8595);
            } else {
              newCryptoObj.cssClass = "blue";
              newCryptoObj.arrow = String.fromCharCode(8596);
            }
          } else {
            newCryptoObj.cssClass = "blue";
            newCryptoObj.arrow = String.fromCharCode(8596);
          }

          newCryptoList.push(newCryptoObj);
        }
        return {
          cryptoList: newCryptoList,
        };
      });
      this.filterCryptoList();
    });
  };

  filterCryptoList = () => {
    this._filterinput.value = this._filterinput.value.trim().toUpperCase();

    this.setState((state) => {
      let newFilteredCryptoList = state.cryptoList.filter((cryptoObj) => {
        return cryptoObj.currency.includes(this._filterinput.value);
      });

      return {
        filteredCryptoList: newFilteredCryptoList,
      };
    });
  };

  render() {
    return (
      <div className="crypto">
        <div className="input-wraper">
          <input type="text" placeholder=" " ref={(data) => (this._filterinput = data)} onChange={this.filterCryptoList} />
          <div htmlFor="username" className="label">
            Currency
          </div>
        </div>

        <CryptoList cryptoList={this.state.filteredCryptoList} />
      </div>
    );
  }
}
