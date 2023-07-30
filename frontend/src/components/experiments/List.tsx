export const List = ({ items }: any) => {
  const listItems = items.map((item: { name: string }, i: any) => {
    return <li key={i}>{item.name}</li>;
  });

  return <ul>{listItems}</ul>;
};
