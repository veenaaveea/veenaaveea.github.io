import {Component, OnInit, AfterViewChecked, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {ApolloQueryResult, gql} from '@apollo/client/core';
import {SongData} from "../../../shared/http/response/song";
import {SongParser} from "../../../shared/util/song-parser";
import {NavBarCustomisationService} from "../../../services/nav-bar-customisation.service";
import {Artist} from "../../../shared/dto/artists";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

@Component({
  selector: 'app-view-song',
  templateUrl: './view-song.component.html',
  styleUrls: ['./view-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSongComponent extends SongParser implements OnInit, AfterViewChecked {
  @Input() content: string = '';
  songTitle: string = '';
  artists: Array<Artist> = [];
  composers: Array<Artist> = [];
  lyricists: Array<Artist> = [];
  singlish: typeof Singlish;
  timeSignature: string | undefined;

  private toReposition: Map<string, string[]> = new Map<string, string[]>();

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private navbarService: NavBarCustomisationService
  ) {
    super();
    this.singlish = new Singlish();
  }

  ngOnInit(): void {
    this.navbarService.fixedTop = false;
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
    this.route.params.subscribe(params=> {
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
            title {
              locale
              text
              transliterated
            }
            timeSignature
            chords {
              title
              content
            }
            artist {
              _id
              name {
                locale
                text
                transliterated
              }
            }
            lyricist {
              _id
              name {
                locale
                text
                transliterated
              }
            }
            composer {
              _id
              name {
                locale
                text
                transliterated
              }
            }
          }
        }
      `;

      this.apollo.query({
        query: GET_SONG_BY_ID,
        variables: {
          id: id
        }
      }).subscribe(this.processResponse);
    });
  }

  private processResponse = (res: ApolloQueryResult<any>) => {
    if (!res.data) {
      console.error('Empty response');
      return;
    }

    console.log(res.data);

    const songData: SongData = res.data as SongData;
    const song = songData.correctedSong;
    const singlish = this.singlish;

    const titleData = song.title?.filter(t => t?.locale == 'si_LKA')[0];

    this.songTitle = titleData?.transliterated ? singlish.parse(titleData?.text) : titleData?.text;
    this.timeSignature = song.timeSignature ?? undefined;

    for (let artist of song.artist || []) {
      if (artist) {
        this.artists.push(Artist.retrieve(artist));
      }
    }

    for (let artist of song.lyricist || []) {
      if (artist) {
        this.lyricists.push(Artist.retrieve(artist));
      }
    }

    for (let artist of song.composer || []) {
      if (artist) {
        this.composers.push(Artist.retrieve(artist));
      }
    }

    let parsed = this.parse(song, singlish);

    this.toReposition = parsed.toReposition;
    this.content = parsed.songMarkup;
  }
}
