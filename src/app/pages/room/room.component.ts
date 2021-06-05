import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeerService } from 'src/app/peer.service';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomName:string;
  currentStream: any;
  listUser: Array<any> = [];
  
  constructor(
    private route:ActivatedRoute, 
    private webSocketService: WebSocketService, 
    private peerService: PeerService
    ) {
      this.roomName = route.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
  this.checkMediaDevices();
  this.initPeer();
  this.initSocket();


  }

initPeer = () =>{
  const {peer} = this.peerService;
  peer.on('open',(id)=>{
    const body = {
      idPeer: id,
      roomName:this.roomName
    };
    
    
     this.webSocketService.joinRoom(body);
  });

  peer.on('call', callEnter =>{
    callEnter.answer(this.currentStream);
    callEnter.on('stream', (streamRemote)=>{
      this.addVideoUser(streamRemote);
    });
  },err =>{
    console.log('Error: ',err);
  }
  )

}

initSocket = () =>{
  this.webSocketService.cbEvent.subscribe(res =>{
   if(res.name === 'new-user'){
    const {idPeer} = res.data;  
    this.sendCall(idPeer, this.currentStream);
   }
    
  })
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
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = (idPeer, stream) =>{
    const newUserCall = this.peerService.peer.call(idPeer,stream);
    if(!!newUserCall){
      newUserCall.on('stream', (userStream: MediaStream)=>{
        this.addVideoUser(userStream);
      })
    }
  }

}
