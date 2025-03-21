export interface question{
  label: string;
  type: "string"|"select"|"check";
  placeholder?: string;
  options?: string[];
  max?:number;
  min?:number;
}

