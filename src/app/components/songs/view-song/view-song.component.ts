import {Component, OnInit, AfterViewChecked, Input, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {ApolloQueryResult, gql} from '@apollo/client/core';
import {SongData} from "../../../shared/http/response/song";
import {SongParser} from "../../../shared/util/song-parser";
import {NavBarCustomisationService} from "../../../services/nav-bar-customisation.service";
import {Artist} from "../../../shared/dto/artists";
import {TransposeService} from "../../../services/transpose.service";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

export enum PlayerState {
  PLAYING, PAUSED, STOPPED
}

const BEAT_START = 1;
const CHORD_START = 0;
const CLASS_CURRENT_PLAYING_CHORD = 'current-playing-chord';
const DEFAULT_TEMPO = 154;

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
  chordSpans: HTMLElement[] = [];
  timeSignature: string | undefined;
  tempo: number = DEFAULT_TEMPO;
  scale: number = 0;

  playState = PlayerState.STOPPED;
  currentChordIndex = CHORD_START;
  playInterval?: NodeJS.Timeout;
  beatCounter = BEAT_START;

  singlish: typeof Singlish;

  private toReposition: Map<string, string[]> = new Map<string, string[]>();

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private navbarService: NavBarCustomisationService,
    private transposer: TransposeService
  ) {
    super();
    this.singlish = new Singlish();
  }

  get PlayerState() {
    return PlayerState;
  }

  get beatTimeout(): number {
    return 6e4 / this.tempo;
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

    this.chordSpans = Array.from(document.querySelectorAll<HTMLElement>('span.chord'));
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
            title {
              locale
              text
              transliterated
            }
            timeSignature
            tempo
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

    const songData: SongData = res.data as SongData;
    const song = songData.correctedSong;
    const singlish = this.singlish;

    const titleData = song.title?.filter(t => t?.locale == 'si_LKA')[0];

    this.songTitle = titleData?.transliterated ? singlish.parse(titleData?.text) : titleData?.text;
    this.timeSignature = song.timeSignature ?? undefined;

    if (song.tempo) {
      this.tempo = song.tempo;
    }

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

  playPause(): void {
    if (this.playState == PlayerState.STOPPED) {
      this.playState = PlayerState.PLAYING;
    } else if (this.playState == PlayerState.PAUSED) {
      this.playState = PlayerState.PLAYING;
    } else {
      this.playState = PlayerState.PAUSED;
    }

    console.log(6e5 / this.tempo);

    if (this.playState == PlayerState.PLAYING) {
      this.playInterval = setInterval(() => {
        console.log("PLAYING");
        if (this.currentChordIndex > this.chordSpans.length - 1) {
          this.stop();
          return;
        }

        const currentChord = this.chordSpans[this.currentChordIndex];
        if (currentChord.childNodes[1]?.textContent) {
          const stayOnCount = parseInt(currentChord.childNodes[1]?.textContent);

          if (this.beatCounter == BEAT_START) {
            let previousChord = null;

            if (this.currentChordIndex > 0) {
              previousChord = this.chordSpans[this.currentChordIndex - 1];
            }

            if (previousChord) {
              previousChord.classList.remove(CLASS_CURRENT_PLAYING_CHORD);
            }

            currentChord.classList.add(CLASS_CURRENT_PLAYING_CHORD);
            currentChord.scrollIntoView();
          }

          if (this.beatCounter <= stayOnCount) {
            this.beatCounter++;
          } else {
            this.beatCounter = BEAT_START;
            this.currentChordIndex++;
          }

        } else {
          console.log("Invalid stay-on-count");
        }
      }, this.beatTimeout);
    }

    if (this.playState == PlayerState.PAUSED) {
      clearInterval(this.playInterval);
    }
  }

  setScale(scale: number) {
    this.scale = scale;
    this.transposer.transpose(scale);
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  stop(moveToTop: boolean = false): void {
    clearInterval(this.playInterval);
    this.playState = PlayerState.STOPPED;
    const e = this.chordSpans[this.currentChordIndex];
    e.classList.remove(CLASS_CURRENT_PLAYING_CHORD);

    if (moveToTop) {
      this.currentChordIndex = CHORD_START;
      document.getElementsByClassName('song-section').item(0)?.scrollIntoView();
    }
  }
}
