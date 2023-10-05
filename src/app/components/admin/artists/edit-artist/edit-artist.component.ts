import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {artistRoles, EditableArtist} from "../../../../shared/dto/artists";

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent {
  artist?: EditableArtist;

  constructor(public modal: NgbActiveModal) {}

  onSaveButtonClick(): void {
    this.modal.close(this.artist);
  }

  toggleType(type: string): void {
    const types = [...this.artist!.type!];
    const currentIndex = types.indexOf(type);

    if (currentIndex > -1) {
      types.splice(currentIndex, 1);
    } else {
      types.push(type);
    }

    this.artist!.type = types;
  }

  protected readonly artistRoles = artistRoles;
}
