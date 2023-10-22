import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Long: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  _id: Scalars['ObjectId']['output'];
  name?: Maybe<Array<Maybe<ArtistName>>>;
  type?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type ArtistInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  name?: InputMaybe<Array<InputMaybe<ArtistNameInsertInput>>>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArtistName = {
  __typename?: 'ArtistName';
  locale?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  transliterated?: Maybe<Scalars['Boolean']['output']>;
};

export type ArtistNameInsertInput = {
  locale?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArtistNameQueryInput = {
  AND?: InputMaybe<Array<ArtistNameQueryInput>>;
  OR?: InputMaybe<Array<ArtistNameQueryInput>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  locale_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locale_gt?: InputMaybe<Scalars['String']['input']>;
  locale_gte?: InputMaybe<Scalars['String']['input']>;
  locale_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locale_lt?: InputMaybe<Scalars['String']['input']>;
  locale_lte?: InputMaybe<Scalars['String']['input']>;
  locale_ne?: InputMaybe<Scalars['String']['input']>;
  locale_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_gt?: InputMaybe<Scalars['String']['input']>;
  text_gte?: InputMaybe<Scalars['String']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_lt?: InputMaybe<Scalars['String']['input']>;
  text_lte?: InputMaybe<Scalars['String']['input']>;
  text_ne?: InputMaybe<Scalars['String']['input']>;
  text_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_exists?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArtistNameUpdateInput = {
  locale?: InputMaybe<Scalars['String']['input']>;
  locale_unset?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_unset?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArtistQueryInput = {
  AND?: InputMaybe<Array<ArtistQueryInput>>;
  OR?: InputMaybe<Array<ArtistQueryInput>>;
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  _id_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  _id_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  name?: InputMaybe<Array<InputMaybe<ArtistNameQueryInput>>>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<ArtistNameQueryInput>>>;
  name_nin?: InputMaybe<Array<InputMaybe<ArtistNameQueryInput>>>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_exists?: InputMaybe<Scalars['Boolean']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum ArtistSortByInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type ArtistUpdateInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_unset?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Array<InputMaybe<ArtistNameUpdateInput>>>;
  name_unset?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ClSong = {
  __typename?: 'ClSong';
  _id?: Maybe<Scalars['ObjectId']['output']>;
  hasProcessed?: Maybe<Scalars['Boolean']['output']>;
  songData?: Maybe<Scalars['String']['output']>;
  songMeta?: Maybe<Scalars['String']['output']>;
  sourceId?: Maybe<Scalars['Int']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
};

export type ClSongInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  hasProcessed?: InputMaybe<Scalars['Boolean']['input']>;
  songData?: InputMaybe<Scalars['String']['input']>;
  songMeta?: InputMaybe<Scalars['String']['input']>;
  sourceId?: InputMaybe<Scalars['Int']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
};

export type ClSongQueryInput = {
  AND?: InputMaybe<Array<ClSongQueryInput>>;
  OR?: InputMaybe<Array<ClSongQueryInput>>;
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  _id_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  _id_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  hasProcessed?: InputMaybe<Scalars['Boolean']['input']>;
  hasProcessed_exists?: InputMaybe<Scalars['Boolean']['input']>;
  hasProcessed_ne?: InputMaybe<Scalars['Boolean']['input']>;
  songData?: InputMaybe<Scalars['String']['input']>;
  songData_exists?: InputMaybe<Scalars['Boolean']['input']>;
  songData_gt?: InputMaybe<Scalars['String']['input']>;
  songData_gte?: InputMaybe<Scalars['String']['input']>;
  songData_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  songData_lt?: InputMaybe<Scalars['String']['input']>;
  songData_lte?: InputMaybe<Scalars['String']['input']>;
  songData_ne?: InputMaybe<Scalars['String']['input']>;
  songData_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  songMeta?: InputMaybe<Scalars['String']['input']>;
  songMeta_exists?: InputMaybe<Scalars['Boolean']['input']>;
  songMeta_gt?: InputMaybe<Scalars['String']['input']>;
  songMeta_gte?: InputMaybe<Scalars['String']['input']>;
  songMeta_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  songMeta_lt?: InputMaybe<Scalars['String']['input']>;
  songMeta_lte?: InputMaybe<Scalars['String']['input']>;
  songMeta_ne?: InputMaybe<Scalars['String']['input']>;
  songMeta_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceId?: InputMaybe<Scalars['Int']['input']>;
  sourceId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceId_gt?: InputMaybe<Scalars['Int']['input']>;
  sourceId_gte?: InputMaybe<Scalars['Int']['input']>;
  sourceId_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sourceId_lt?: InputMaybe<Scalars['Int']['input']>;
  sourceId_lte?: InputMaybe<Scalars['Int']['input']>;
  sourceId_ne?: InputMaybe<Scalars['Int']['input']>;
  sourceId_nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl_gt?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_gte?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceUrl_lt?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_lte?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_ne?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum ClSongSortByInput {
  SongdataAsc = 'SONGDATA_ASC',
  SongdataDesc = 'SONGDATA_DESC',
  SongmetaAsc = 'SONGMETA_ASC',
  SongmetaDesc = 'SONGMETA_DESC',
  SourceidAsc = 'SOURCEID_ASC',
  SourceidDesc = 'SOURCEID_DESC',
  SourceurlAsc = 'SOURCEURL_ASC',
  SourceurlDesc = 'SOURCEURL_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type ClSongUpdateInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_unset?: InputMaybe<Scalars['Boolean']['input']>;
  hasProcessed?: InputMaybe<Scalars['Boolean']['input']>;
  hasProcessed_unset?: InputMaybe<Scalars['Boolean']['input']>;
  songData?: InputMaybe<Scalars['String']['input']>;
  songData_unset?: InputMaybe<Scalars['Boolean']['input']>;
  songMeta?: InputMaybe<Scalars['String']['input']>;
  songMeta_unset?: InputMaybe<Scalars['Boolean']['input']>;
  sourceId?: InputMaybe<Scalars['Int']['input']>;
  sourceId_inc?: InputMaybe<Scalars['Int']['input']>;
  sourceId_unset?: InputMaybe<Scalars['Boolean']['input']>;
  sourceUrl?: InputMaybe<Scalars['String']['input']>;
  sourceUrl_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CorrectedSong = {
  __typename?: 'CorrectedSong';
  _id?: Maybe<Scalars['ObjectId']['output']>;
  artist?: Maybe<Array<Maybe<Artist>>>;
  chords?: Maybe<Array<Maybe<CorrectedSongChord>>>;
  composer?: Maybe<Array<Maybe<Artist>>>;
  lyricist?: Maybe<Array<Maybe<Artist>>>;
  srcId?: Maybe<Scalars['ObjectId']['output']>;
  tempo?: Maybe<Scalars['Long']['output']>;
  timeSignature?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Array<Maybe<CorrectedSongTitle>>>;
};

export type CorrectedSongArtistRelationInput = {
  create?: InputMaybe<Array<InputMaybe<ArtistInsertInput>>>;
  link?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
};

export type CorrectedSongChord = {
  __typename?: 'CorrectedSongChord';
  content?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CorrectedSongChordInsertInput = {
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CorrectedSongChordQueryInput = {
  AND?: InputMaybe<Array<CorrectedSongChordQueryInput>>;
  OR?: InputMaybe<Array<CorrectedSongChordQueryInput>>;
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  content_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_ne?: InputMaybe<Scalars['String']['input']>;
  title_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CorrectedSongChordUpdateInput = {
  content?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  content_unset?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CorrectedSongComposerRelationInput = {
  create?: InputMaybe<Array<InputMaybe<ArtistInsertInput>>>;
  link?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
};

export type CorrectedSongInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  artist?: InputMaybe<CorrectedSongArtistRelationInput>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordInsertInput>>>;
  composer?: InputMaybe<CorrectedSongComposerRelationInput>;
  lyricist?: InputMaybe<CorrectedSongLyricistRelationInput>;
  srcId?: InputMaybe<Scalars['ObjectId']['input']>;
  tempo?: InputMaybe<Scalars['Long']['input']>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Array<InputMaybe<CorrectedSongTitleInsertInput>>>;
};

export type CorrectedSongLyricistRelationInput = {
  create?: InputMaybe<Array<InputMaybe<ArtistInsertInput>>>;
  link?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
};

export type CorrectedSongQueryInput = {
  AND?: InputMaybe<Array<CorrectedSongQueryInput>>;
  OR?: InputMaybe<Array<CorrectedSongQueryInput>>;
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  _id_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  _id_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  artist?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  artist_exists?: InputMaybe<Scalars['Boolean']['input']>;
  artist_in?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  artist_nin?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  chords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  chords_in?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  chords_nin?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  composer?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  composer_exists?: InputMaybe<Scalars['Boolean']['input']>;
  composer_in?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  composer_nin?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  lyricist?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  lyricist_exists?: InputMaybe<Scalars['Boolean']['input']>;
  lyricist_in?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  lyricist_nin?: InputMaybe<Array<InputMaybe<ArtistQueryInput>>>;
  srcId?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_exists?: InputMaybe<Scalars['Boolean']['input']>;
  srcId_gt?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_gte?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_in?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  srcId_lt?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_lte?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_ne?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_nin?: InputMaybe<Array<InputMaybe<Scalars['ObjectId']['input']>>>;
  tempo?: InputMaybe<Scalars['Long']['input']>;
  tempo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tempo_gt?: InputMaybe<Scalars['Long']['input']>;
  tempo_gte?: InputMaybe<Scalars['Long']['input']>;
  tempo_in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  tempo_lt?: InputMaybe<Scalars['Long']['input']>;
  tempo_lte?: InputMaybe<Scalars['Long']['input']>;
  tempo_ne?: InputMaybe<Scalars['Long']['input']>;
  tempo_nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
  timeSignature_exists?: InputMaybe<Scalars['Boolean']['input']>;
  timeSignature_gt?: InputMaybe<Scalars['String']['input']>;
  timeSignature_gte?: InputMaybe<Scalars['String']['input']>;
  timeSignature_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timeSignature_lt?: InputMaybe<Scalars['String']['input']>;
  timeSignature_lte?: InputMaybe<Scalars['String']['input']>;
  timeSignature_ne?: InputMaybe<Scalars['String']['input']>;
  timeSignature_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Array<InputMaybe<CorrectedSongTitleQueryInput>>>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<CorrectedSongTitleQueryInput>>>;
  title_nin?: InputMaybe<Array<InputMaybe<CorrectedSongTitleQueryInput>>>;
};

export enum CorrectedSongSortByInput {
  SrcidAsc = 'SRCID_ASC',
  SrcidDesc = 'SRCID_DESC',
  TempoAsc = 'TEMPO_ASC',
  TempoDesc = 'TEMPO_DESC',
  TimesignatureAsc = 'TIMESIGNATURE_ASC',
  TimesignatureDesc = 'TIMESIGNATURE_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type CorrectedSongTitle = {
  __typename?: 'CorrectedSongTitle';
  locale?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  transliterated?: Maybe<Scalars['Boolean']['output']>;
};

export type CorrectedSongTitleInsertInput = {
  locale?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CorrectedSongTitleQueryInput = {
  AND?: InputMaybe<Array<CorrectedSongTitleQueryInput>>;
  OR?: InputMaybe<Array<CorrectedSongTitleQueryInput>>;
  locale?: InputMaybe<Scalars['String']['input']>;
  locale_exists?: InputMaybe<Scalars['Boolean']['input']>;
  locale_gt?: InputMaybe<Scalars['String']['input']>;
  locale_gte?: InputMaybe<Scalars['String']['input']>;
  locale_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  locale_lt?: InputMaybe<Scalars['String']['input']>;
  locale_lte?: InputMaybe<Scalars['String']['input']>;
  locale_ne?: InputMaybe<Scalars['String']['input']>;
  locale_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_gt?: InputMaybe<Scalars['String']['input']>;
  text_gte?: InputMaybe<Scalars['String']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_lt?: InputMaybe<Scalars['String']['input']>;
  text_lte?: InputMaybe<Scalars['String']['input']>;
  text_ne?: InputMaybe<Scalars['String']['input']>;
  text_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_exists?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CorrectedSongTitleUpdateInput = {
  locale?: InputMaybe<Scalars['String']['input']>;
  locale_unset?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_unset?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated?: InputMaybe<Scalars['Boolean']['input']>;
  transliterated_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CorrectedSongUpdateInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_unset?: InputMaybe<Scalars['Boolean']['input']>;
  artist?: InputMaybe<CorrectedSongArtistRelationInput>;
  artist_unset?: InputMaybe<Scalars['Boolean']['input']>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordUpdateInput>>>;
  chords_unset?: InputMaybe<Scalars['Boolean']['input']>;
  composer?: InputMaybe<CorrectedSongComposerRelationInput>;
  composer_unset?: InputMaybe<Scalars['Boolean']['input']>;
  lyricist?: InputMaybe<CorrectedSongLyricistRelationInput>;
  lyricist_unset?: InputMaybe<Scalars['Boolean']['input']>;
  srcId?: InputMaybe<Scalars['ObjectId']['input']>;
  srcId_unset?: InputMaybe<Scalars['Boolean']['input']>;
  tempo?: InputMaybe<Scalars['Long']['input']>;
  tempo_unset?: InputMaybe<Scalars['Boolean']['input']>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
  timeSignature_unset?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Array<InputMaybe<CorrectedSongTitleUpdateInput>>>;
  title_unset?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeleteManyPayload = {
  __typename?: 'DeleteManyPayload';
  deletedCount: Scalars['Int']['output'];
};

export type InsertManyPayload = {
  __typename?: 'InsertManyPayload';
  insertedIds: Array<Maybe<Scalars['ObjectId']['output']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteManyArtists?: Maybe<DeleteManyPayload>;
  deleteManyClSongs?: Maybe<DeleteManyPayload>;
  deleteManyCorrectedSongs?: Maybe<DeleteManyPayload>;
  deleteOneArtist?: Maybe<Artist>;
  deleteOneClSong?: Maybe<ClSong>;
  deleteOneCorrectedSong?: Maybe<CorrectedSong>;
  insertManyArtists?: Maybe<InsertManyPayload>;
  insertManyClSongs?: Maybe<InsertManyPayload>;
  insertManyCorrectedSongs?: Maybe<InsertManyPayload>;
  insertOneArtist?: Maybe<Artist>;
  insertOneClSong?: Maybe<ClSong>;
  insertOneCorrectedSong?: Maybe<CorrectedSong>;
  replaceOneArtist?: Maybe<Artist>;
  replaceOneClSong?: Maybe<ClSong>;
  replaceOneCorrectedSong?: Maybe<CorrectedSong>;
  updateManyArtists?: Maybe<UpdateManyPayload>;
  updateManyClSongs?: Maybe<UpdateManyPayload>;
  updateManyCorrectedSongs?: Maybe<UpdateManyPayload>;
  updateOneArtist?: Maybe<Artist>;
  updateOneClSong?: Maybe<ClSong>;
  updateOneCorrectedSong?: Maybe<CorrectedSong>;
  upsertOneArtist?: Maybe<Artist>;
  upsertOneClSong?: Maybe<ClSong>;
  upsertOneCorrectedSong?: Maybe<CorrectedSong>;
};


export type MutationDeleteManyArtistsArgs = {
  query?: InputMaybe<ArtistQueryInput>;
};


export type MutationDeleteManyClSongsArgs = {
  query?: InputMaybe<ClSongQueryInput>;
};


export type MutationDeleteManyCorrectedSongsArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
};


export type MutationDeleteOneArtistArgs = {
  query: ArtistQueryInput;
};


export type MutationDeleteOneClSongArgs = {
  query: ClSongQueryInput;
};


export type MutationDeleteOneCorrectedSongArgs = {
  query: CorrectedSongQueryInput;
};


export type MutationInsertManyArtistsArgs = {
  data: Array<ArtistInsertInput>;
};


export type MutationInsertManyClSongsArgs = {
  data: Array<ClSongInsertInput>;
};


export type MutationInsertManyCorrectedSongsArgs = {
  data: Array<CorrectedSongInsertInput>;
};


export type MutationInsertOneArtistArgs = {
  data: ArtistInsertInput;
};


export type MutationInsertOneClSongArgs = {
  data: ClSongInsertInput;
};


export type MutationInsertOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
};


export type MutationReplaceOneArtistArgs = {
  data: ArtistInsertInput;
  query?: InputMaybe<ArtistQueryInput>;
};


export type MutationReplaceOneClSongArgs = {
  data: ClSongInsertInput;
  query?: InputMaybe<ClSongQueryInput>;
};


export type MutationReplaceOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
  query?: InputMaybe<CorrectedSongQueryInput>;
};


export type MutationUpdateManyArtistsArgs = {
  query?: InputMaybe<ArtistQueryInput>;
  set: ArtistUpdateInput;
};


export type MutationUpdateManyClSongsArgs = {
  query?: InputMaybe<ClSongQueryInput>;
  set: ClSongUpdateInput;
};


export type MutationUpdateManyCorrectedSongsArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
  set: CorrectedSongUpdateInput;
};


export type MutationUpdateOneArtistArgs = {
  query?: InputMaybe<ArtistQueryInput>;
  set: ArtistUpdateInput;
};


export type MutationUpdateOneClSongArgs = {
  query?: InputMaybe<ClSongQueryInput>;
  set: ClSongUpdateInput;
};


export type MutationUpdateOneCorrectedSongArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
  set: CorrectedSongUpdateInput;
};


export type MutationUpsertOneArtistArgs = {
  data: ArtistInsertInput;
  query?: InputMaybe<ArtistQueryInput>;
};


export type MutationUpsertOneClSongArgs = {
  data: ClSongInsertInput;
  query?: InputMaybe<ClSongQueryInput>;
};


export type MutationUpsertOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
  query?: InputMaybe<CorrectedSongQueryInput>;
};

export type Query = {
  __typename?: 'Query';
  artist?: Maybe<Artist>;
  artists: Array<Maybe<Artist>>;
  clSong?: Maybe<ClSong>;
  clSongs: Array<Maybe<ClSong>>;
  correctedSong?: Maybe<CorrectedSong>;
  correctedSongs: Array<Maybe<CorrectedSong>>;
};


export type QueryArtistArgs = {
  query?: InputMaybe<ArtistQueryInput>;
};


export type QueryArtistsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<ArtistQueryInput>;
  sortBy?: InputMaybe<ArtistSortByInput>;
};


export type QueryClSongArgs = {
  query?: InputMaybe<ClSongQueryInput>;
};


export type QueryClSongsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<ClSongQueryInput>;
  sortBy?: InputMaybe<ClSongSortByInput>;
};


export type QueryCorrectedSongArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
};


export type QueryCorrectedSongsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<CorrectedSongQueryInput>;
  sortBy?: InputMaybe<CorrectedSongSortByInput>;
};

export type UpdateManyPayload = {
  __typename?: 'UpdateManyPayload';
  matchedCount: Scalars['Int']['output'];
  modifiedCount: Scalars['Int']['output'];
};
