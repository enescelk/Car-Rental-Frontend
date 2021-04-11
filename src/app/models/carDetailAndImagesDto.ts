import { Car } from "./car";
import { CarImage } from "./carImage";

export interface carDetailAndImagesDto{
  car:Car;
  carImages:CarImage[];
}
