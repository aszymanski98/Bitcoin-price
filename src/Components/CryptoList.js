import React from "react";

import "../Styles/CryptoList.css";

const CryptoList = (props) => {
  let cryptoList = props.cryptoList;

  let liElements = cryptoList.map((cryptoObj) => {
    return (
      <li key={cryptoObj.currency}>
        <span className="label">Last rate: </span>
        <span className={`rate ${cryptoObj.cssClass}`}>
          {cryptoObj.lastRate} {cryptoObj.arrow}
        </span>
        <span className="currencyName">{cryptoObj.currency}</span>
        <span className="currencySymbol">[{cryptoObj.symbol}]</span>
      </li>
    );
  });

  return (
    <div className="crypto-list">
      <ul className="list">{liElements}</ul>
    </div>
  );
};
export default CryptoList;
