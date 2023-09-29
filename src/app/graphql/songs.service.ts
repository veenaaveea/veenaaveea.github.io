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
  ObjectId: { input: any; output: any; }
};

export type CorrectedSong = {
  __typename?: 'CorrectedSong';
  _id: Scalars['ObjectId']['output'];
  artist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  chords?: Maybe<Array<Maybe<CorrectedSongChord>>>;
  composer?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  lyricist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  timeSignature?: Maybe<Scalars['String']['output']>;
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

export type CorrectedSongInsertInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  artist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordInsertInput>>>;
  composer?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lyricist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
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
  artist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  artist_exists?: InputMaybe<Scalars['Boolean']['input']>;
  artist_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  artist_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  chords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  chords_in?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  chords_nin?: InputMaybe<Array<InputMaybe<CorrectedSongChordQueryInput>>>;
  composer?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  composer_exists?: InputMaybe<Scalars['Boolean']['input']>;
  composer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  composer_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lyricist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lyricist_exists?: InputMaybe<Scalars['Boolean']['input']>;
  lyricist_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lyricist_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
  timeSignature_exists?: InputMaybe<Scalars['Boolean']['input']>;
  timeSignature_gt?: InputMaybe<Scalars['String']['input']>;
  timeSignature_gte?: InputMaybe<Scalars['String']['input']>;
  timeSignature_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timeSignature_lt?: InputMaybe<Scalars['String']['input']>;
  timeSignature_lte?: InputMaybe<Scalars['String']['input']>;
  timeSignature_ne?: InputMaybe<Scalars['String']['input']>;
  timeSignature_nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export enum CorrectedSongSortByInput {
  TimesignatureAsc = 'TIMESIGNATURE_ASC',
  TimesignatureDesc = 'TIMESIGNATURE_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type CorrectedSongUpdateInput = {
  _id?: InputMaybe<Scalars['ObjectId']['input']>;
  _id_unset?: InputMaybe<Scalars['Boolean']['input']>;
  artist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  artist_unset?: InputMaybe<Scalars['Boolean']['input']>;
  chords?: InputMaybe<Array<InputMaybe<CorrectedSongChordUpdateInput>>>;
  chords_unset?: InputMaybe<Scalars['Boolean']['input']>;
  composer?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  composer_unset?: InputMaybe<Scalars['Boolean']['input']>;
  lyricist?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lyricist_unset?: InputMaybe<Scalars['Boolean']['input']>;
  timeSignature?: InputMaybe<Scalars['String']['input']>;
  timeSignature_unset?: InputMaybe<Scalars['Boolean']['input']>;
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
  deleteManyCorrectedSongs?: Maybe<DeleteManyPayload>;
  deleteOneCorrectedSong?: Maybe<CorrectedSong>;
  insertManyCorrectedSongs?: Maybe<InsertManyPayload>;
  insertOneCorrectedSong?: Maybe<CorrectedSong>;
  replaceOneCorrectedSong?: Maybe<CorrectedSong>;
  updateManyCorrectedSongs?: Maybe<UpdateManyPayload>;
  updateOneCorrectedSong?: Maybe<CorrectedSong>;
  upsertOneCorrectedSong?: Maybe<CorrectedSong>;
};


export type MutationDeleteManyCorrectedSongsArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
};


export type MutationDeleteOneCorrectedSongArgs = {
  query: CorrectedSongQueryInput;
};


export type MutationInsertManyCorrectedSongsArgs = {
  data: Array<CorrectedSongInsertInput>;
};


export type MutationInsertOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
};


export type MutationReplaceOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
  query?: InputMaybe<CorrectedSongQueryInput>;
};


export type MutationUpdateManyCorrectedSongsArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
  set: CorrectedSongUpdateInput;
};


export type MutationUpdateOneCorrectedSongArgs = {
  query?: InputMaybe<CorrectedSongQueryInput>;
  set: CorrectedSongUpdateInput;
};


export type MutationUpsertOneCorrectedSongArgs = {
  data: CorrectedSongInsertInput;
  query?: InputMaybe<CorrectedSongQueryInput>;
};

export type Query = {
  __typename?: 'Query';
  correctedSong?: Maybe<CorrectedSong>;
  correctedSongs: Array<Maybe<CorrectedSong>>;
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
