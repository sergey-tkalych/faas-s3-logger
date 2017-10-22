export interface ILog{
  id: string;
  item: string;
  event: string;
  createdAt: number;
  print(): void;
}