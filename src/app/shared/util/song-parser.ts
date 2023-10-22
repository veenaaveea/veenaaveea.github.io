import {CorrectedSong} from "../../graphql/songs.service";

export abstract class SongParser {
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

  parse(song: CorrectedSong, singlish: any): ParsedSong {
    let songMarkup = '';
    let toReposition: Map<string, string[]> = new Map<string, string[]>();

    for (const s in song.chords!) {
      const section = song.chords[s]!;
      const title = section.title!;
      songMarkup += `<h6 class="song-section">${title.charAt(0).toUpperCase() + title.slice(1)}</h6>`;
      songMarkup += `<div class='song-sec-content'>`;

      const isChorusOrVerse = title.startsWith('chorus') || title.startsWith('verse');

      for (const i in section.content!) {
        const line = section.content[i]!
          .replace(/\{[a-zA-Z\s\\/.]+}/g, function (m: string) {
            return singlish.parse(m);
          })
          .replace(/ /g, '&nbsp;')
          .replace(/\(/g, '</span><span class="d-none stay-on-count">')
          .replace(/\)/g, '</span>')
          .replace(/\[/g, `<span class="chord ${isChorusOrVerse ? 'chord-chorus-verse' : ''}"><span class="chord-string">`)
          .replace(/\{/g, '<span class="lyric">')
          .replace(/[}\]]/g, '</span>');

        songMarkup += `<p class="song-line ${isChorusOrVerse ? 'song-line-chorus-verse' : 'song-line-intro-inter'} song-${section.title}-line-${i}">${line}</p>`;

        if (isChorusOrVerse) {
          if (toReposition.has(title)) {
            toReposition?.get(title)?.push(i);
          } else {
            toReposition.set(title, [i]);
          }
        }
      }
      songMarkup += '</div>';
    }

    return {
      songMarkup: songMarkup,
      toReposition: toReposition
    };
  }
}

export type ParsedSong = {
  songMarkup: string;
  toReposition: Map<string, string[]>;
}
