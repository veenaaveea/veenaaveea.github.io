import {Artist as ArtistData} from "../../graphql/songs.service";

export type LocalisedText = {
  locale?: string;
  text?: string;
  transliterated?: boolean;
}

export type EditableArtist = {
  name: Map<string, LocalisedText>
  type: Array<string>
}

export const artistRoles = [
  'SINGER',
  'COMPOSER',
  'LYRICIST',
  'INSTRUMENTALIST',
  'BAND'
];

export class Artist {
  readonly id?: string;
  readonly name?: LocalisedText;

  constructor(id: string, name: LocalisedText) {
    this.id = id;
    this.name = name;
  }

  static retrieve(data: ArtistData): Artist {
    return {
      id: data._id,
      name: Artist.resolveName(data)
    }
  }

  private static resolveName(artist: ArtistData): LocalisedText | undefined {
    let name: LocalisedText | undefined = undefined;
    const nameInLang = artist.name?.filter(n => n?.text?.trim() != '')[0];

    if (nameInLang) {
      name = {
        text: nameInLang.text ?? undefined,
        transliterated: nameInLang.transliterated ?? false
      }
    }

    return name;
  }
}
