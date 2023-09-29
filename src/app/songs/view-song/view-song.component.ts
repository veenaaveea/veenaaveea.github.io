import {Component, OnInit, AfterViewChecked, Input, ViewEncapsulation} from '@angular/core';
// import { SongsService } from '../../service/songs.service';
import {ActivatedRoute} from '@angular/router';
// import { ApiResponse } from '../../shared/model/response.model';
// import { Song } from '../../shared/model/song.model';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {SongData} from "../../shared/http/response/song";

const singlish = require('@_000407/singlish.js');
const {Singlish} = singlish;

@Component({
  selector: 'app-view-song',
  templateUrl: './view-song.component.html',
  styleUrls: ['./view-song.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSongComponent implements OnInit, AfterViewChecked {
  @Input() content: string = "loading...";
  singlish: typeof Singlish;
  private toReposition: Map<string, string[]> = new Map<string, string[]>();

  constructor(private route: ActivatedRoute,
              private apollo: Apollo) {
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

        let c = '';
        for (const s in song.chords!) {
          const section = song.chords[s]!;
          const title = section.title!;
          c += `<h3 class="song-section">${title.charAt(0).toUpperCase() + title.slice(1)}</h3>`;
          c += `<div class='song-sec-content'>`;

          const isChorusOrVerse = title.startsWith('chorus') || title.startsWith('verse');

          for (const i in section.content!) {
            const line = section.content[i]!
              .replace(/\{[a-zA-Z\s\\/.]+}/g, function (m: string) {
                return singlish.parse(m);
              })
              .replace(/ /g, '&nbsp;')
              .replace(/\[/g, `<span class="chord ${isChorusOrVerse ? 'chord-chorus-verse' : ''}">`)
              .replace(/\{/g, '<span class="lyric">')
              .replace(/[}\]]/g, '</span>');

            c += `<p class="song-line ${isChorusOrVerse ? 'song-line-chorus-verse' : 'song-line-intro-inter'} song-${section.title}-line-${i}">${line}</p>`;

            if (isChorusOrVerse) {
              if (this.toReposition.has(title)) {
                this.toReposition?.get(title)?.push(i);
              } else {
                this.toReposition.set(title, [i]);
              }
            }
          }
          c += '</div>';
        }

        this.content = c;
        // document.getElementById('song')!.innerHTML = content;
      });
    });
  }

  positionChords(sec: string, i: string) {
    const offsetY = 20;
    let lyric_acc_offset = 0;
    let chord_acc_offset = 0;

    const chords = Array.from(document.querySelectorAll<HTMLElement>(`p.song-${sec}-line-${i} span.chord`));

    for (const [k, elem] of chords.entries()) {
      lyric_acc_offset += elem.offsetWidth;

      if (k > 0) {
        chord_acc_offset += elem.offsetWidth;
        elem.style.transform = `translate(-${chord_acc_offset}px, -${offsetY}px)`;
      } else {
        elem.style.transform = `translateY(-${offsetY}px)`;
        if (elem.innerHTML.length > 2) {
          chord_acc_offset += Math.round(elem.offsetWidth * 0.8);
        }
      }

      if (elem.nextSibling) {
        (elem.nextSibling as HTMLElement).style.transform = `translate(-${lyric_acc_offset}px)`;
      }
    }
  }
}
