// const arr1 = ["4"];
// console.log(result.findIndex((res) => res === true));
// console.log(upper);
// const array = [false, { id: 1 }];
// const result = array.map((arr) => {
//   if (typeof arr === "object") {
//     return arr.id;
//   } else {
//     return false;
//   }
// });
// console.log(result);
// const datas = [
//   { u: 1, l: 2 },
//   { u: 1, l: 3 },
//   { u: 3, l: 4 },
//   { u: 4, l: 6 },
//   { u: 4, l: 5 },
//   { u: 5, l: 7 },
// ];
// const lowIds = [3, 6, 0];
// const upperId = [1, 2, 3, 4, 5, 6, 7];

// const recursiveFunction = (idx, value) => {
//   // console.log(idx, value);
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

// const result = upperId.map((uId) =>
//   lowIds.map((lId) => recursiveFunction(lId, uId))
// );
// const arr = [];
// for (let res of result) {
//   for (let r of res) {
//     if (typeof r === "object" && !arr.includes(r.idx)) {
//       arr.push(r.idx);
//     }
//   }
// }
// console.log(arr);
// console.log(result.map((res) => res.idx));

const arr = [1, 2, 3, [4, [5]]];
// const target = [1, 2];
// console.log(target.map((t) => arr.includes(t)));
console.log(arr.flat());
