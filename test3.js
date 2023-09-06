const arrObj = [
  { id: 1, name: "kkk", count: 0 },
  { id: 2, name: "eee", count: 2 },
  { id: 3, name: "aaa", count: 2 },
  { id: 4, name: "fff", count: 2 },
];
const changeObj = (name) => {
  const result = arrObj.map((obj) =>
    obj.name === name ? { ...obj, count: 1 } : { ...obj, count: obj.count }
  );
  console.log(result);
};
changeObj("eee");
