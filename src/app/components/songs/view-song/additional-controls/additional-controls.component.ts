import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-additional-controls',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './additional-controls.component.html',
  styleUrls: ['./additional-controls.component.scss']
})
export class AdditionalControlsComponent {
  @Input() tempo = 0;
  @Output() tempoChangeEvent = new EventEmitter<number>();

  scale = 0;
  @Output() transposeChangeEvent = new EventEmitter<number>();

  private preventSingleClick = false;
  private timer?: NodeJS.Timeout;

  changeTempoOnSingleClick(value: -1 | 1): void{
    this.preventSingleClick = false;
    let delay = 250;

    this.timer = setTimeout(() => {
      if(!this.preventSingleClick){
        this.changeTempo(value);
      }
    }, delay);
  }

  changeTempoOnDoubleClick(value: -4 | 4): void{
    this.preventSingleClick = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.changeTempo(value);
  }

  changeTranspose(value: -1 | 1) {
    const isAtNegativeEdge = this.scale == -12 && value == +1;
    const isAtPositiveEdge = this.scale == 12 && value == -1;
    const isNotAtEdges = this.scale > -12 && this.scale < 12;

    const shouldChangeValue = isNotAtEdges || isAtPositiveEdge || isAtNegativeEdge;

    if (shouldChangeValue) {
      this.scale += value;
      this.transposeChangeEvent.emit(value);
    }
  }

  private changeTempo(value: number) {
    this.tempo += value;
    this.tempoChangeEvent.emit(this.tempo);
  }
}
