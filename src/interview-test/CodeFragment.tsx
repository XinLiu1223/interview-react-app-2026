import React, { useState } from 'react';
import { codingTestData } from './sample-data';
import NativeDropdown from './NativeDropdown';
import CustomDropdown from './CustomDropdown';

const Homepage = () => {
  console.log(codingTestData);
  const flattenCityFlight = [];
  const flattenCityWithState = [];
  const state = Object.keys(codingTestData.flight);
  console.log(state);
  // for (const index in state) {
  for (const stateName of state) {
    console.log(stateName);
    flattenCityFlight.push(
      codingTestData.flight[stateName as keyof typeof codingTestData.flight]
    );
    flattenCityWithState.push({
      ...codingTestData.flight[stateName as keyof typeof codingTestData.flight],
      state: stateName,
    });
    console.log(flattenCityFlight);
    console.log(flattenCityWithState);
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let flightCities: any[] = [];
  // for (const cityFlightObj of flattenCityFlight) {
  for (const cityFlightObj of flattenCityWithState) {
    console.log(cityFlightObj);
    for (const city of cityFlightObj.cities) {
      const cityWithState = {
        ...city,
        state: cityFlightObj.state,
      };
      flightCities = [...flightCities, { ...cityWithState }];
    }
    // flightCities = [...flightCities, { ...cityFlightObj.cities }];
  }
  console.log(flightCities);

  const message = 'INFOSYabcdS'; // Try edit me
  // find the longest substring without repeating characters
  const findLongestSub = (str: any) => {
    const subArr = str.split('');
    const temp: any[] = [];
    const records: any = {};
    for (let i = 0; i < subArr.length; i++) {
      // temp.push(subArr[i]);
      if (!temp.includes(subArr[i])) {
        temp.push(subArr[i]);
      } else {
        records[temp.length] = [...temp];
        // this line of code is to remove all characters
        // before and including the first occurrence of the repeating character
        // then continue to add the current character
        // it is written by AI and it is correct!
        temp.splice(0, temp.indexOf(subArr[i]) + 1);
      }
    }
    let maxLength = 0;
    for (const key of Object.keys(records)) {
      if (Number(key) > maxLength) maxLength = Number(key);
    }
    let result = '';
    for (const char of records[maxLength]) {
      result += char;
    }

    return result;
  };
  const result = findLongestSub(message);
  console.log(
    'find the longest substring without repeating characters',
    result
  );

  const reverseStr = (str: any) => {
    let reversedStr = '';
    const subArr = str.split('');
    const temp = [];
    for (let i = subArr.length - 1; i >= 0; i--) {
      temp.push(subArr[i]);
      reversedStr += subArr[i];
    }

    return reversedStr;
  };
  const reversed = reverseStr(message);
  console.log('reverseStr', reversed);

  // Input: s = "abcabcbb"Output: 3Explanation: The answer is "abc", with the length of 3
  const removeDuplicate = (str: string) => {
    const result: any[] = [];
    const strArr = str.split('');
    for (const s of strArr) {
      console.log(s);
      if (!result.includes(s)) {
        result.push(s);
      }
    }
    // console.log(result);
    let noDplc = '';
    for (const r of result) {
      noDplc += r;
    }
    return noDplc;
  };
  console.log(removeDuplicate('abcabcbb'));

  // Input: s = "bbbbb"Output: 1Explanation: The answer is "b", with the length of 1
  // Input: s = "bbbbbCCCC"Output: 1Explanation: The answer is "bC", with the length of 2
  const countRepeat = (str: string) => {
    const countObj: any = {};
    for (const s of str) {
      if (s in countObj) {
        countObj[s] += 1;
      } else {
        countObj[s] = 0;
      }
    }
    console.log(countObj);
    return `${Object.keys(countObj)} ${Object.keys(countObj).length}`;
  };
  console.log('countRepeat', countRepeat('bbbbbCCCC'));

  const testSentence = 'Hello world This is a sentence'; // Try edit me
  const findLongestWord = (sentence: string) => {
    const records: any = {};
    const wordArr = sentence.split(' ');
    for (const word of wordArr) {
      console.log(word);
      records[word.length] = word;
    }
    console.log(records);

    let maxLength = 0;
    for (const key of Object.keys(records)) {
      if (Number(key) > maxLength) maxLength = Number(key);
    }
    console.log('maxLength', maxLength);

    return records[maxLength];
  };
  // Log to console
  console.log('longest Word', findLongestWord(testSentence));

  const arr = [5, 5, 4, 1, 8];
  const filterResults = arr.filter(result => result === 8);
  console.log(filterResults);

  const customFilter = (arr: any, callback: (arrItem: any) => boolean) => {
    const resultArr = [];
    for (const item of arr) {
      if (callback(item)) resultArr.push(item);
    }
    return resultArr;
  };
  console.log(
    'cutomeFilter',
    customFilter(arr, result => result === 8)
  );

  // const testStr = "JS";
  // testStr[1] = "Q";
  // console.log(testStr);
  // Uncaught TypeError: Cannot assign to read only property '1' of string 'JS'
  // in javascript strings are immutable
  /*
    const test = 'JS';
    test[1] = 'Q';
    console.log(test);

    VM155:3 JS
  */

  const testArr = [1, 2];
  const copyArr = testArr;
  copyArr.push(3);
  console.log(testArr); // (3) [1, 2, 3]

  // let show = 1;
  // console.log(show);
  // function show() {
  //   console.log("2");
  // }
  // console.log(show());   Uncaught SyntaxError: Identifier 'show' has already been declared

  // https://www.udemy.com/course/data-structures-and-algorithms-java/learn/quiz/5796398#overview
  // section 34 35 36  merge sort,  merge leetcode
  const arrA = [1, 7, 3, 2, 2, 3, 5, 5];
  const arrB = [2, 6, 4, 4, 5, 6];
  arrA.sort();
  arrB.sort();

  const combinedTwoSortedArr = [];
  let combinedIndex = 0;
  let i = 0;
  let j = 0;
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] < arrB[j]) {
      combinedTwoSortedArr[combinedIndex] = arrA[i];
      i++;
    } else {
      combinedTwoSortedArr[combinedIndex] = arrB[j];
      j++;
    }
    combinedIndex++;
  }
  while (i < arrA.length) {
    combinedTwoSortedArr[combinedIndex] = arrA[i];
    i++;
    combinedIndex++;
  }
  while (j < arrB.length) {
    combinedTwoSortedArr[combinedIndex] = arrB[j];
    j++;
    combinedIndex++;
  }
  console.log('combinedTwoSortedArr', combinedTwoSortedArr);

  // the following function conmibines two sorted arrays into one sorted array
  function combineTwoSortedArrays(arrA: number[], arrB: number[]) {
    const combinedArr = [];
    let indexA = 0;
    let indexB = 0;
    let combinedIndex = 0;
    while (indexA < arrA.length && indexB < arrB.length) {
      if (arrA[indexA] < arrB[indexB]) {
        combinedArr[combinedIndex] = arrA[indexA];
        indexA++;
      } else {
        combinedArr[combinedIndex] = arrB[indexB];
        indexB++;
      }
      combinedIndex++;
    }
    while (indexA < arrA.length) {
      combinedArr[combinedIndex] = arrA[indexA];
      indexA++;
      combinedIndex++;
    }
    while (indexB < arrB.length) {
      combinedArr[combinedIndex] = arrB[indexB];
      indexB++;
      combinedIndex++;
    }
    return combinedArr;
  }
  console.log('combineTwoSortedArrays', combineTwoSortedArrays(arrA, arrB));

  // the following function implements merge sort algorithm by recursion
  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return combineTwoSortedArrays(left, right);
  }

  console.log('mergeSort', mergeSort(arrA));
  console.log('mergeSort', mergeSort(arrB));

  // Initialize state to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Handler function to update state on change
  const handleDropdownChange = (val: string) => {
    setSelectedValue(val);
    console.log(`Selected: ${val}`);
  };

  // Array of options to iterate over
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <NativeDropdown />
      </div>
      <div style={{ marginTop: '10px' }}>
        <CustomDropdown
          options={options}
          value={selectedValue}
          onChange={handleDropdownChange}
        />
      </div>
    </>
  );
};

export default Homepage;
