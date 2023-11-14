// function BoardSquare({ x, y, children }) {
//   const black = (x + y) % 2 === 1;
//   const [{ isOver }, drop] = useDrop(
//     () => ({
//       accept: ItemTypes.KNIGHT,
//       drop: () => moveKnight(x, y),
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     }),
//     [x, y]
//   );
//   return true;
// }
// const result = (a) => {
//   return a + a;
// };
// const drop = (func) => {
//   console.log(func().fun());
// };
// const a = 11;
// const b = 3;
// drop(() => ({ acc: "상수", fun: () => result(a, b) }), [a, b]);
const arr = [3, 4, 5];
const arr2 = arr.filter((ar) => ar !== 3);
console.log(arr2, arr);
// arr.forEach((ar, index) => {
//   if (ar === 3) {
//     arr.splice(index, 1);
//   }
// });
// console.log(arr);
