'use client';
import React from 'react';
import { useState, useRef } from 'react';

const InstructionBoard: React.FC = () => {
  const [list, setList] = useState(['Instruction-1']);
  const [text, setText] = useState('');
  const [img] = useState(['img1', 'img2', 'img3']);
  const [imgIdx, setImgIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // console.log("inputRef", inputRef);

  return (
    <>
      <div className="mt-10 layout-column justify-content-center align-items-center">
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <section className="my-2 layout-row align-items-center justify-content-center width-1000">
              <input
                id="instruction-input"
                type="text"
                placeholder="New Instruction"
                data-testid="instruction-input"
                className="width-80"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button
                type="submit"
                className="ml-30 width-20"
                data-testid="add-instruction-button"
                onClick={e => {
                  e.preventDefault();
                  setList([...list, text]);
                  setText('');
                }}
              >
                Add Instruction
              </button>
            </section>
          </form>
          {/* <span data-testid="error-message" className="error hidden-span">
            {(!text || !list.length) && "Please enter an instruction"}
          </span> */}
        </div>
        <div className="card outlined mt-0 width-800">
          <div className="card-text">
            {/* <h4>Instructions</h4> */}
            <ul className="styled mt-6" data-testid="instructions">
              {list.length &&
                list.map((l, idx) => (
                  <li key={idx} data-testid={`instruction-${l}`}>
                    <div className="li-content layout-row justify-content-between align-items-center">
                      <span>{idx + 1}</span>
                      <span>{` - `}</span>
                      <span>{l}</span>
                      <div className="icons">
                        <button
                          disabled={idx === list.length - 1}
                          className="icon-only x-medium mx-2"
                          onClick={() => {
                            const copyList = [...list];
                            if (idx < list.length - 1) {
                              const moveDown = copyList[idx];
                              const replace = copyList[idx + 1];
                              copyList[idx + 1] = moveDown;
                              copyList[idx] = replace;
                            }
                            setList(copyList);
                          }}
                        >
                          <i className="material-icons">arrow_drop_down_icon</i>
                        </button>
                        <button
                          disabled={idx === 0}
                          className="icon-only x-medium mx-2"
                          onClick={() => {
                            const copyList = [...list];
                            if (idx > 0) {
                              const moveUp = copyList[idx];
                              const replace = copyList[idx - 1];
                              copyList[idx - 1] = moveUp;
                              copyList[idx] = replace;
                            }
                            setList(copyList);
                          }}
                        >
                          <i className="material-icons">arrow_drop_up_icon</i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="my-10 border-2 border-black">
        <input
          type="text"
          id="testRef"
          className="pl-2"
          ref={inputRef}
          onChange={e => {
            console.log('e.target.value', e.target.value);
            if (inputRef.current) {
              inputRef.current.value = e.target.value;
            }
          }}
        />
      </div>
      <div>
        image slide - {`  `}
        {img?.map((image, idx) => {
          return (
            idx === imgIdx && (
              <span key={idx}>
                <span>
                  <button
                    onClick={() => {
                      if (idx > 0) {
                        setImgIdx(prevIdx => prevIdx - 1);
                      }
                    }}
                  >
                    {'<'}
                  </button>
                </span>
                {`${image} - ${idx}  `}
                <span>
                  <button
                    onClick={() => {
                      if (idx < img.length - 1) {
                        setImgIdx(prevIdx => prevIdx + 1);
                      }
                    }}
                  >
                    {'>'}
                  </button>
                </span>
              </span>
            )
          );
        })}
      </div>
    </>
  );
};

{
  /* <li>
    <div className="li-content layout-row justify-content-between align-items-center">
      <span>1</span>
      <span>Instruction-1</span>
      <div className="icons">
        <button className="icon-only x-medium mx-2">
          <i className="material-icons">arrow_drop_down_icon</i>
        </button>
        <button className="icon-only x-medium mx-2">
          <i className="material-icons">arrow_drop_up_icon</i>
        </button>
      </div>
    </div>
  </li> */
}
export default InstructionBoard;
