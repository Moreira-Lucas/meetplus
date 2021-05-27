import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  currentStream: any;
  listUser: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  this.checkMediaDevices();
  }

  checkMediaDevices = () =>{
    if(navigator && navigator.mediaDevices){
      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true
      }).then(stream =>{
        this.currentStream = stream;
        this.addVideoUser(stream);
        
      }).catch(()=>{
        console.log("Not permission")
      })
    }else{
      console.log("Not media Devices")
    }
  }

  addVideoUser(stream: any):void{
    this.listUser.push(stream);
  }

}
