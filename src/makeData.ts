import namor from "namor";

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();

  let firstName = namor.generate({ words: 1 });
  firstName = firstName.substring(0, firstName.length - 6);

  let lastName = namor.generate({ words: 1 });
  lastName = lastName.substring(0, lastName.length - 6);

  return {
    firstName,
    lastName,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single"
  };
};

export default function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];

    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
