import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-artist',
  templateUrl: './delete-artist.component.html',
  styleUrls: ['./delete-artist.component.scss']
})
export class DeleteArtistComponent {
  confirmText = 'delete';
  confirmTextInput: string = '';
  confirmationError = false;

  constructor(public modal: NgbActiveModal) {}

  onDeleteButtonClick(): void {
    this.confirmationError = this.confirmText != this.confirmTextInput;

    if (!this.confirmationError) {
      this.modal.close(true);
    }
  }
}
