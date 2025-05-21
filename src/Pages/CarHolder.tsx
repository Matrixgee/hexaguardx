import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardCoin from '../Components/CardCoin';
import TradingViewWidgettwo from '../Components/TradingView';

const CarHolder: React.FC = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum,tether,binancecoin,solana',
            vs_currencies: 'usd',
          },
        });

        setPrices({
          bitcoin: response.data.bitcoin.usd,
          ethereum: response.data.ethereum.usd,
          tether: response.data.tether.usd,
          binancecoin: response.data.binancecoin.usd,
          solana: response.data.solana.usd,
        });
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    };

    fetchPrices();
  }, []);

  const cryptocurrencies = [
    { id: 'bitcoin', name: 'Bitcoin (BTC)' },
    { id: 'ethereum', name: 'Ethereum (ETH)' },
    { id: 'tether', name: 'Tether (USDT)' },
    { id: 'binancecoin', name: 'Binance Coin (BNB)' },
    { id: 'solana', name: 'Solana (SOL)' },
  ];

  return (
    <div className="w-full bg-pink-500 h-[80vh] flex justify-around flex-col items-center">
      <div className=" gap-2 bg-green-600 w-[90%] h-[80%] flex justify-around items-center">
        {cryptocurrencies.map((crypto) => (
          <CardCoin
            key={crypto.id}
            name={crypto.name}
            price={prices[crypto.id] || 0}
          />
        ))}
      </div>
      <div className="w-[90%] h-[20%] flex justify-center items-baseline">
        <TradingViewWidgettwo />
      </div>
    </div>
  );
}

export default CarHolder;
