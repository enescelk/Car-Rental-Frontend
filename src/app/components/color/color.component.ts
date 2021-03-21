import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filterts';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[];
  dataLoaded = false;
  currentColor : Color;
  allColor?: Color
  filterText ="";
  Filters = { brandId: '', colorId: '' };
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
      this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setCurrentColor() {
    this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.id.toString())
      : (Filters.colorId = '');
  }
  allColorsSelected() {
    return this.currentColor == undefined ? true : false;
  }

}
