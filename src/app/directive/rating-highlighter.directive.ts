import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRatingHighlighter]'
})
export class RatingHighlighterDirective implements OnChanges {
  @Input() ratingCount: any;

  constructor(private elRef: ElementRef) {
   }

   public ngOnChanges(changes: SimpleChanges): void {
     this.setColorByRating();
   }

  private setColorByRating(): void {
    let color: string;
    if (this.ratingCount) {
      if (this.ratingCount > 4) {
        color = 'green';
      } else if (this.ratingCount > 2 && this.ratingCount < 4) {
        color = 'orange';
      } else {
        color = 'red'
      }
      this.changeRatingTextcolor(color);
    }
  }

  private changeRatingTextcolor(color: string) {  
    this.elRef.nativeElement.style.color = color;  
  }
}
