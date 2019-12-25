export function sorting(Names) {
  function sortThem(Names) {
    for (let item1 of Names) {
      console.log("On: ", item1);
      for (let item2 of Names) {
        if (Names.indexOf(item1) === Names.indexOf(item2)) {
          continue;
        }
        if (
          item1.fname[0].toUpperCase() > item2.fname[0].toUpperCase() &&
          Names.indexOf(item1) < Names.indexOf(item2)
        ) {
          // Permute them
          let k = ["empty"];
          k[0] = Names[Names.indexOf(item2)];
          Names[Names.indexOf(item2)] = Names[Names.indexOf(item1)];
          Names[Names.indexOf(item1)] = k[0];
          return { Names, state: 1 };
        }
        if (item1.fname[0].toUpperCase() === item2.fname[0].toUpperCase()) {
          sortEqualFletter(Names, item1, item2);
        }
      }
      console.log("Partial: ", Names);
    }
    return { Names, state: 0 };
  }

  console.log("Sorting !");
  console.log("Names ", Names);

  let result = sortThem(Names);
  while (result.state === 1) {
    result = sortThem(result.Names);
  }
  //   console.log("result: ", result);
  console.log("Final: ", Names);
}
