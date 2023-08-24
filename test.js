const arrObj = [
  { id: 1, name: "kim" },
  { id: 2, name: "lee" },
];
let result;

for (let i = 0; i < arrObj.length; i++) {
  result = Object.values(arrObj[i]).includes("kims");
  if (result) break;
}
console.log(result);
