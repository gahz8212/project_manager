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
const result = (a) => {
  return a + a;
};
const drop = (func) => {
  console.log(func().fun());
};
const a = 11;
const b = 3;
drop(() => ({ acc: "상수", fun: () => result(a, b) }), [a, b]);
