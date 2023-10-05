export type Name = {
  text: string;
  transliterated: boolean;
}

export type EditableArtist = {
  name: Map<string, Name>
  type: Array<string>
}

export const artistRoles = [
  'SINGER',
  'COMPOSER',
  'LYRICIST',
  'INSTRUMENTALIST',
  'BAND'
];
