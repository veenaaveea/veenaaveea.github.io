import {Component, OnInit, AfterViewChecked, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {SongData} from "../../../shared/http/response/song";
import {SongParser} from "../../../shared/util/song-parser";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

@Component({
  selector: 'app-view-song',
  templateUrl: './view-song.component.html',
  styleUrls: ['./view-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSongComponent extends SongParser implements OnInit, AfterViewChecked {
  @Input() content: string = "loading...";
  singlish: typeof Singlish;
  private toReposition: Map<string, string[]> = new Map<string, string[]>();

  constructor(private route: ActivatedRoute,
              private apollo: Apollo) {
    super();
    this.singlish = new Singlish();
  }

  ngOnInit(): void {
    this.getSong();
  }

  ngAfterViewChecked(): void {
    for (const [sec, v] of this.toReposition.entries()) {
      for (const i of Object.keys(v)) {
        this.positionChords(sec, i);
      }
    }
  }

  getSong(): void {
    this.route.params.subscribe(params => {
      const id = params['id']
      if (!id) {
        console.error('Required parameter ID missing.');
        return;
      }

      const GET_SONG_BY_ID = gql`
        query ($id: ObjectId!) {
          correctedSong(
            query: {
              _id: $id
            }
          ) {
            _id
            chords {
              title
              content
            }
            artist
            lyricist
            composer
          }
        }
      `;

      this.apollo.watchQuery({
        query: GET_SONG_BY_ID,
        variables: {
          id: id
        }
      }).valueChanges.subscribe(res => {
        if (!res.data) {
          console.error('Empty response');
          return;
        }

        const songData: SongData = res.data as SongData;
        const song = songData.correctedSong;
        const singlish = this.singlish;

        let parsed = this.parse(song, singlish);

        this.toReposition = parsed.toReposition;
        this.content = parsed.songMarkup;
      });
    });
  }
}
