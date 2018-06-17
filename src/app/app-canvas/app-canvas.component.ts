import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Rx from 'rxjs/Rx'
@Component({
  selector: 'app-canvas',
  templateUrl: './app-canvas.component.html',
  styleUrls: ['./app-canvas.component.css'],

})
export class AppCanvasComponent implements OnInit {

  @ViewChild('cnv') canvasRef: ElementRef;
  ctx:CanvasRenderingContext2D;
  constructor() { }

  ngOnInit() {
    const canvas:HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx  = canvas.getContext('2d');
    let scrollX=0;
    let scrollY=0;
    let getX = (ex)=>ex-canvas.offsetLeft+scrollX+0.5;
    let getY = (ey)=>ey-canvas.offsetTop+scrollY+0.5;
    Rx.Observable
    .fromEvent(document,'mousedown')
    .subscribe((ev:MouseEvent)=>{
      this.ctx.beginPath();
      this.ctx.moveTo(getX(ev.clientX), getY(ev.clientY));
      this.ctx.lineTo(getX(ev.clientX)+.5, getY(ev.clientY)+.5);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(getX(ev.clientX)+.5, getY(ev.clientY)+.5);
      Rx.Observable
      .merge(Rx.Observable.fromEvent(canvas,'mouseout'),Rx.Observable.fromEvent(canvas,'mousemove'))
      .takeUntil(Rx.Observable.fromEvent(document,'mouseup'))
      .subscribe((ev:MouseEvent)=>{
        this.ctx.lineTo(getX(ev.clientX), getY(ev.clientY));
        this.ctx.stroke();
      });
    });

    Rx.Observable
    .fromEvent(document,'scroll')
    .subscribe((ev:MouseEvent)=>{
      scrollX=ev.pageX;
      scrollY=ev.pageY;
      console.log(ev);
    });
    
    this.ctx.lineJoin="round";
    this.ctx.miterLimit=1;
    this.ctx.lineCap='round';
    this.ctx.fillStyle='white';
    this.ctx.fillRect(0,0,canvas.width,canvas.height);
  }

}
