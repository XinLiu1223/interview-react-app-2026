'use client';
import { useState } from 'react';

const ListTransfer = () => {
  const [left, moveLeft] = useState(['A', 'B', 'C', 'D']);
  const [right, moveRight] = useState(['E', 'F', 'G', 'H']);
  const [checkboxLeft, checkLeft] = useState<string[]>([]);
  const [checkboxRight, checkRight] = useState<string[]>([]);

  const leftList = () => {
    return left.map((item, index) => (
      <li key={index}>
        <input
          type="checkbox"
          value={item}
          checked={checkboxLeft.includes(item)}
          onChange={e => {
            console.log(e.target);
            console.log(e.target.value);
            console.log(e.target.checked);
            if (e.target.checked) {
              checkLeft([...checkboxLeft, e.target.value]);
            } else {
              checkLeft([...checkboxLeft.filter(i => i !== e.target.value)]);
            }
            console.log(checkboxLeft);
          }}
        ></input>
        {item}
      </li>
    ));
  };
  const buttonList = () => {
    return (
      <>
        <div>
          <button
            onClick={() => {
              moveLeft([...left, ...right]);
              moveRight([]);
              checkLeft([]);
              checkRight([]);
            }}
          >{`<<`}</button>
        </div>
        <div>
          <button
            onClick={() => {
              moveLeft([...left, ...checkboxRight]);
              moveRight([
                ...right.filter(item => !checkboxRight.includes(item)),
              ]);
              checkLeft([]);
              checkRight([]);
            }}
          >{`<`}</button>
        </div>
        <div>
          <button
            onClick={() => {
              moveRight([...right, ...checkboxLeft]);
              moveLeft([...left.filter(item => !checkboxLeft.includes(item))]);
              checkLeft([]);
              checkRight([]);
            }}
          >{`>`}</button>
        </div>
        <div>
          <button
            onClick={() => {
              moveRight([...right, ...left]);
              moveLeft([]);
              checkLeft([]);
              checkRight([]);
            }}
          >{`>>`}</button>
        </div>
      </>
    );
  };
  const rightList = () => {
    return right.map((item, index) => (
      <li key={index}>
        <input
          type="checkbox"
          value={item}
          checked={checkboxRight.includes(item)}
          onChange={e => {
            console.log(e.target);
            console.log(e.target.value);
            console.log(e.target.checked);
            if (e.target.checked) {
              checkRight([...checkboxRight, e.target.value]);
            } else {
              checkRight([...checkboxRight.filter(i => i !== e.target.value)]);
            }
            console.log(checkboxRight);
          }}
        ></input>
        {item}
      </li>
    ));
  };

  //   return <div className="star-rating">{renderStars()}</div>;
  return (
    <div className="star-rating">
      <div style={{ display: 'flex', gap: '20px' }}>
        <ul>{leftList()}</ul>
        <ul>{buttonList()}</ul>
        <ul>{rightList()}</ul>
      </div>
    </div>
  );
};

export default ListTransfer;
