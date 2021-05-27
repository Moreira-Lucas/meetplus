import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent implements OnInit {

  menu:Array<any> = [
    {name:"Muted", icon:"bi bi-mic-fill"},
    {name:"Home", icon:"bi bi-house-fill"},
    {name:"Share", icon:"bi bi-share-fill"},
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
