import {AfterViewChecked, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client/core";
import {ClSongData} from "../../../shared/http/response/song";
import {CorrectedSong} from "../../../graphql/songs.service";
import {SongParser} from "../../../shared/util/song-parser";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditSongComponent extends SongParser implements OnInit, AfterViewChecked {
  @Input() songData: string = 'loading...';
  @Input() parsedSongHtml: string = '';
  private toReposition: Map<string, string[]> = new Map<string, string[]>();
  singlish: typeof Singlish;

  constructor(private route: ActivatedRoute,
              private apollo: Apollo) {
    super();
    this.singlish = new Singlish();
  }

  ngAfterViewChecked(): void {
    for (const [sec, v] of this.toReposition) {
      for (const i of Object.keys(v)) {
        this.positionChords(sec, i);
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      if (!id) {
        console.error('Required parameter ID missing.');
        return;
      }

      const GET_OLD_SONG_BY_ID = gql`
        query ($id: ObjectId!) {
          clSong(
            query: {
              _id: $id
            }
          ) {
            _id
            hasProcessed
            songData
            songMeta
          }
        }
      `;

      this.apollo.watchQuery({
        query: GET_OLD_SONG_BY_ID,
        variables: {
          id: id
        }
      }).valueChanges.subscribe(res => {
        if (!res.data) {
          console.error('Empty response');
          return;
        }

        const data = res.data as ClSongData
        this.songData = data.clSong.songData ?? '';
      });
    });
  }

  addTab(e: any): boolean {
    const target = e.target!;
    const tab = '  ';
    if (e.keyCode === 9) { // tab was pressed

      // get caret position/selection
      let val = target.value,
        start = target.selectionStart,
        end = target.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      target.value = val.substring(0, start) + tab + val.substring(end);

      // put caret at right position again
      target.selectionStart = target.selectionEnd = start + tab.length;

      // prevent the focus lose
      return false;
    }

    return true;
  }

  preview(): void {
    const correctedSong = JSON.parse(this.songData) as CorrectedSong;

    const parsed = this.parse(correctedSong, this.singlish);
    this.parsedSongHtml = parsed.songMarkup;
    this.toReposition = parsed.toReposition;
  }
}
