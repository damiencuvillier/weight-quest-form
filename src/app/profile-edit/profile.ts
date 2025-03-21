export interface Profile{
  weight: number;
  height: number;
  age: number;
  bmi: number;
  gender: 'F'|'M';
  family: string[];
  job:[];
  pathologies: string[];
  mental: number;
  physical: number;
}
