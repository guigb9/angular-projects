import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  @Input() productName: string = '';
  cropWidth: number = 75;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>()

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75/5;
  }

  onNotify(){
    this.notify.emit('Rating of product '+ this.productName + ' is '+this.rating);
  }
}
