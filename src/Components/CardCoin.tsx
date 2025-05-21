import React from 'react';

interface CardCoinProps {
  name: string;
  price: number;
}

const CardCoin: React.FC<CardCoinProps> = ({ name, price }) => {
  return (
    <div className="CardCoin w-[20%] h-[70%] flex justify-around items-center flex-col rounded-md bg-white shadow-md p-4">
      <div className="text-gray-400 w-[70%] h-[80%] flex justify-around items-start flex-col">
        <h2 className="text-lg font-bold">{name}</h2>
        <p>Price</p>
        <p className='text-2xl'>${price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CardCoin;
