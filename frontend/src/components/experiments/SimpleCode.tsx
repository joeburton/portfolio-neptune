export const SimpleCode = () => {
  const myFamily = [
    { id: 1123, name: "Gail Burton", age: 45 },
    { id: 8767, name: "Joe Burton", age: 43 },
    { id: 7645, name: "Paul Burton", age: 74 },
    { id: 9809, name: "Susan Burton", age: 73 },
    { id: 1123, name: "Hazel Burton", age: 4 },
    { id: 5436, name: "Solomon Burton", age: 8 },
    { id: 7634, name: "Pip Burton", age: 9 },
    { id: 1948, name: "Kit Burton", age: 5 },
  ];

  const overTenYearsOld = myFamily.filter((item) => item.age >= 10);

  overTenYearsOld.sort((a, b) => a.age - b.age);

  const father = myFamily.find((item) => item.name.includes("Paul"));

  return (
    <div>
      <h3>My Family</h3>
      <p>
        Everyone over 10 years old:
        <pre>{JSON.stringify(overTenYearsOld.sort(), null, 3)}</pre>
      </p>
      <p>{`Father's name: ${father.name}`}</p>
    </div>
  );
};
