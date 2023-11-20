const array = [
  { u: 1, l: 2 },
  { u: 2, l: 3 },
];
// array.push(3);
const addEl = (num) => {
  let result = true;
  for (let arr of array) {
    if (arr.u === num.u && arr.l === num.l) {
      result = false;
      break;
    }
  }
  if (result) array.push(num);
};
addEl({ u: 1, l: 2 });
console.log(array);
