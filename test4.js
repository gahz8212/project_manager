const arr = ["k", "l", "m"];
// const arr2 = arr.filter((a) => a !== "l");
// console.log(arr2);

function f1(target) {
  const arr2 = arr.map((ar) =>
    ar === target ? arr.filter((a) => a !== target) : arr
  );
  return arr2;
}
console.log(f1("k"));
