export interface Car{
  name?:string;
  id:number;
  brandId?:number;
  colorId?:number;
  brandName?:string;
  colorName?:string;
  dailyPrice:number;
  modelYear?:string;
  description?:string;
  imagePath?:string;
  status ?: boolean;
}
