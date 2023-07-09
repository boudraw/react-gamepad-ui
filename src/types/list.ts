export interface Item {
  id: number;
  render: (isSelected: boolean) => JSX.Element;
}
