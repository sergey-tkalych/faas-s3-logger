export interface ILog{
  id: string;
  item: string;
  createdAt: number;
  print(): void;
}