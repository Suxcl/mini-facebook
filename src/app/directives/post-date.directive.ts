import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPostDate]',
  standalone: true
})
export class PostDateDirective implements AfterViewInit{
  @Input() inputDate: Date = new Date();

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    let date:Date = new Date(this.inputDate);
    let outDate:string ='';
    outDate += date.toUTCString();
    this.element.nativeElement.innerText =  outDate;
  }
}
