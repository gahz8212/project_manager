const arrObj = [
  { id: 1, name: "kim" },
  { id: 2, name: "lee" },
];
const addObj = { add: "address" };
const newArrObj = arrObj.map((arr) => ({ ...arr, ...addObj }));
console.log(newArrObj);
