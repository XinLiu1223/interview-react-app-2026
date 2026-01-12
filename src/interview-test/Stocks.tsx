import { useState } from 'react';

export default function Stocks() {
  const [stock, setStock] = useState({
    company: '',
    price: 0,
    quantity: 0,
  });

  const getIncreasedValue = (val: number) => {
    console.log(val);
    setStock({
      ...stock,
      price: val,
    });
  };

  return (
    <div>
      <h2>Stock Value: {stock.price}</h2>
      <Increment value={stock.price} increase={getIncreasedValue} />
    </div>
  );
}

function Increment({
  value,
  increase,
}: {
  value: number;
  increase: (val: number) => void;
}) {
  return <button onClick={() => increase(value + 1)}>Increase</button>;
}
