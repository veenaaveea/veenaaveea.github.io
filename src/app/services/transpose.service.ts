import {Injectable} from '@angular/core';

const RGX_DIM = /dim(\d)?$/g;
const RGX_MIN = /m$/;
const RGX_MAJ7 = /maj7$/;
const RGX_5_7_9 = /[579]$/;
const RGX_AUG = /aug(\d)?$/g;
const RGX_SUS = /sus(\d)?$/g;
const RGX_ADD = /add(\d)?$/g;

@Injectable({
  providedIn: 'root'
})
export class TransposeService {
  private currentOffset: number;
  private readonly selector: string;

  static get CHORD_ROOTS() {
    return ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];
  }

  static get REPLACEMENTS(): Record<string, string> {
    return {
      'A#': 'Bb',
      'Db': 'C#',
      'D#': 'Eb',
      'Gb': 'F#',
      'G#': 'Ab'
    };
  }

  constructor() {
    this.currentOffset = 0;
    this.selector = 'span.chord-string';
  }

  transpose(offset: number) {
    if (offset === 0) {
      offset = this.currentOffset * -1;
      this.currentOffset = 0;
    } else {
      this.currentOffset = (this.currentOffset + offset) % 12;
    }

    this.renderTransposition(offset);
  }

  private transposeChord(chord: string, offset: number): string | null {
    if (offset < 0) {
      offset = 12 + offset;
    }

    let modifierMatch: RegExpMatchArray | null = null;

    if (chord.match(RGX_DIM)) {
      modifierMatch = chord.match(RGX_DIM);
    } else if (chord.match(RGX_MIN)) {
      modifierMatch = chord.match(RGX_MIN);
    } else if (chord.match(RGX_MAJ7)) {
      modifierMatch = chord.match(RGX_MAJ7);
    } else if (chord.match(RGX_AUG)) {
      modifierMatch = chord.match(RGX_AUG);
    } else if (chord.match(RGX_SUS)) {
      modifierMatch = chord.match(RGX_SUS);
    } else if (chord.match(RGX_ADD)) {
      modifierMatch = chord.match(RGX_ADD);
    } else if (chord.match(RGX_5_7_9)) {
      modifierMatch = chord.match(RGX_5_7_9);
    }

    const modifier = modifierMatch?.pop();
    let [chordRoot] = [chord, false];

    if (modifier) {
      [chordRoot] = this.normalizeChord(chord.replace(modifier, ''));
    }

    const srcIndex = TransposeService.CHORD_ROOTS.indexOf(chordRoot);

    if (srcIndex >= 0) {
      const tgtIndex = (srcIndex + offset) % 12
      return TransposeService.CHORD_ROOTS[tgtIndex] + (modifier ?? '');
    }

    console.error('Invalid chord:', chord);
    return null;
  }


  private renderTransposition(offset: number) {
    for (const chord of Array.from(document.querySelectorAll(this.selector))) {
      const transposed = this.transposeChord(chord.innerHTML, offset);
      if (transposed) {
        chord.innerHTML = transposed;
      }
    }
  }

  private normalizeChord(chord: string): [string, boolean] {
    const replacement = TransposeService.REPLACEMENTS[chord];
    return replacement ? [replacement, true] : [chord, false];
  }
}
