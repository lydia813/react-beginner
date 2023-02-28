import { useState, useEffect } from "react";

function App() {
  const [usd, setUsd] = useState("");
  const [money, setMoney] = useState(0);
  const onChange = (event) => {
    setUsd(event.target.value);
  };
  const onInput = (event) => {
    setMoney(event.target.value);
  };
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label>How much do you have? </label>
          <input onChange={onInput} value={money} type="number" />
          <hr />
          <select onChange={onChange} value={usd}>
            <option>select coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          <h3>
            You can buy this coin as much as
            {/*{` ${usd}` === 0 ? `No data` : ` ${Math.round(money / usd)} USD`}  내가 짠거 밑에는 수정*/}
            {` ${usd}` === "" || isNaN(parseFloat(usd))
              ? ` No data`
              : ` ${Math.round(money / usd)} USD`}
            {console.log(usd)}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
