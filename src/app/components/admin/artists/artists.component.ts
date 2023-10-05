import {Component, OnInit} from '@angular/core';
import {gql} from "@apollo/client/core";
import {ActivatedRoute} from "@angular/router";
import {Apollo} from "apollo-angular";
import {Artist} from "../../../graphql/songs.service";
import {ArtistsData} from "../../../shared/http/response/artists";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditArtistComponent} from "./edit-artist/edit-artist.component";
import {EditableArtist, Name} from "../../../shared/dto/artists";
import {DeleteArtistComponent} from "./delete-artist/delete-artist.component";
import {NavBarCustomisationService} from "../../../services/nav-bar-customisation.service";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  singlish: typeof Singlish;
  artists: Array<Artist> = [];
  supportedLangs = [
    'si_LKA',
    'en_USA'
  ];

  private allArtistsQuery = gql`
    query {
      artists (limit: 1000) {
        _id
        name {
          si_LKA {
            text
            transliterated
          }
          en_USA {
            text
            transliterated
          }
        }
        type
      }
    }
  `;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private modalService: NgbModal,
    private navBarService: NavBarCustomisationService
  ) {
    this.singlish = new Singlish();
  }
  ngOnInit(): void {
    this.getAllArtists();
    this.navBarService.fixedTop = false;
  }

  getAllArtists(): void { this.apollo.watchQuery<ArtistsData>({
      query: this.allArtistsQuery,
    }).valueChanges.subscribe(res => {
      if (!res.data) {
        console.error('Empty response');
        return;
      }

      this.artists = res.data.artists;
    });
  }

  editArtist(i: number): void {
    const ref = this.modalService.open(EditArtistComponent);
    const artists: {[index: string]:any} = this.artists;

    const editableArtist = {
      name: new Map<string, Name>(),
      type: artists[i].type
    };

    if (artists[i].name) {
      for (let lang of this.supportedLangs) {
        const nameInLang = {
          text: artists[i]?.name[lang]?.text ?? '',
          transliterated: artists[i]?.name[lang]?.transliterated ?? false
        } as Name;
        editableArtist.name.set(lang, nameInLang);
      }
    }

    ref.componentInstance.artist = editableArtist;

    ref.result.then<EditableArtist>(
      result => {
        const id = artists[i]._id!;
        let nameValues = '';

        for (let [lang, name] of editableArtist.name) {
          nameValues = nameValues.concat(`
            ${lang}: {
              text: "${name.text.replace(/\\/, '\\\\')}"
              transliterated: ${name.transliterated}
            }
          `);
        }

        const UPDATE_ARTIST_NAME = `
          mutation {
            updateOneArtist(
              query: {
                _id: "${id}"
              }
              set: {
                name: {
                  ${nameValues}
                }
                type: [
                  ${editableArtist.type.map(this.encapsulateWithQuotes).join(',')}
                ]
              }
            ) {
              _id
            }
          }
        `;

        this.apollo.mutate({
          mutation: gql`${UPDATE_ARTIST_NAME}`,
          refetchQueries: [this.allArtistsQuery]
        }).subscribe(res => {
          console.log(res);
        });

        return result;
      }
    );
  }

  newArtist(): void {
    const ref = this.modalService.open(EditArtistComponent);

    const editableArtist = {
      name: new Map<string, Name>(),
      type: []
    };

    for (let lang of this.supportedLangs) {
      const nameInLang = {
        text: '',
        transliterated: false
      } as Name;

      editableArtist.name.set(lang, nameInLang);
    }

    ref.componentInstance.artist = editableArtist;

    ref.result.then<EditableArtist>(
      result => {
        let nameValues = '';

        for (let [lang, name] of editableArtist.name) {
          nameValues = nameValues.concat(`
            ${lang}: {
              text: "${name.text.replace(/\\/, '\\\\')}"
              transliterated: ${name.transliterated}
            }
          `);
        }

        const INSERT_ONE_ARTIST = `
          mutation {
            insertOneArtist(
              data: {
                name: {
                  ${nameValues}
                }
                type: [
                  ${editableArtist.type.map(this.encapsulateWithQuotes).join(',')}
                ]
              }
            ) {
              _id
            }
          }
        `;

        this.apollo.mutate({
          mutation: gql`${INSERT_ONE_ARTIST}`,
          refetchQueries: [this.allArtistsQuery]
        }).subscribe(res => {
          console.log(res);
        });

        return result;
      }
    );
  }

  deleteArtist(id: string): void {
    const ref = this.modalService.open(DeleteArtistComponent);

    ref.result.then<EditableArtist>(
      result => {
        if (result) {
          const DELETE_ONE_ARTIST = `
            mutation {
              deleteOneArtist(
                query: {
                  _id: "${id}"
                }
              ) {
                _id
              }
            }
          `;

          this.apollo.mutate({
            mutation: gql`${DELETE_ONE_ARTIST}`,
            refetchQueries: [this.allArtistsQuery]
          }).subscribe(res => {
            console.log(res);
          });
        }

        return result;
      });
  }

  private encapsulateWithQuotes(i: string): string {
    return `"${i}"`;
  }
}
