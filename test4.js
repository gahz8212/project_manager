// const arr1 = ["4"];
// console.log(result.findIndex((res) => res === true));
// console.log(upper);
// const datas = [
//   { u: 1, l: 2 },
//   { u: 1, l: 3 },
//   { u: 3, l: 4 },
//   { u: 4, l: 6 },
//   { u: 4, l: 5 },
//   { u: 5, l: 7 },
// ];
// const lowIds = [3, 6, 0];
// const upperId = 7;

// const recursiveFunction = (idx, value) => {
//   const upper = datas.filter((data) => data.l === value)[0]?.u;
//   if (upper === undefined) {
//     return false;
//   }
//   if (idx === upper) {
//     return { idx };
//   } else {
//     return recursiveFunction(idx, upper);
//   }
// };

// const result = lowIds.map((lId) => recursiveFunction(lId, upperId));
// console.log(result.map((res) => res.idx));
const array = [false, { id: 1 }];
const result = array.map((arr) => {
  if (typeof arr === "object") {
    return arr.id;
  } else {
    return false;
  }
});
console.log(result);
