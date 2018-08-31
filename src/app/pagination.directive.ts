import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective {

  constructor(el:ElementRef,render:Renderer2) { 
    let ele:HTMLTableElement = el.nativeElement;
    //ele.appendChild('<div>Hey Ram</div>')
    let ul = render.createElement('ul')
    let li = render.createElement('li');    
    let text = render.createText('Hey Ram');
    render.appendChild(li,text);
    render.appendChild(ul,li);
    render.appendChild(el.nativeElement,ul);
    
  }

}
