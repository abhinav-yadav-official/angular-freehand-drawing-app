import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { COLORS } from '../color'
@Component({
  selector: 'app-color-pallete',
  templateUrl: './color-pallete.component.html',
  styleUrls: ['./color-pallete.component.css']
})
export class ColorPalleteComponent implements OnInit {
  @Input() context:CanvasRenderingContext2D;
  @ViewChild('black') blackRef: ElementRef;
  Colors:string[];
  selectedElement:any
  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.Colors = COLORS;
    this.selectedElement = this.blackRef.nativeElement;
  }

  onClick(event: any) {
    this.renderer.removeClass(this.selectedElement,'selected-color');
    this.renderer.addClass(event.target,'selected-color');
    this.context.strokeStyle = event.target.style.backgroundColor;
    this.context.fillStyle = event.target.style.backroundColor;
    this.selectedElement = event.target;
  }
}
