import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() canvasRef:ElementRef;
  @Input() context:CanvasRenderingContext2D;
  @ViewChild('save') save:ElementRef
  constructor() {
  }

  ngOnInit() {
  }

  onNewClick() {
    this.context.fillRect(0,0,this.canvasRef.nativeElement.width,this.canvasRef.nativeElement.height);
  }

  onSaveClick() {
    this.save.nativeElement.href = this.canvasRef.nativeElement.toDataURL("image/png").replace("image/png", "image/octet-stream");
  }

  onRadioSelect(i) {
    this.context.lineWidth=i;
  }

}
