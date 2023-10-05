export type AuthenticationError = {
  method: string,
  url: string,
  statusText: string,
  statusCode: number,
  error: string,
  errorCode: string,
  link: string,
}

export type AtlasUserIdentity = {
  id?: string,
  providerType?: string
}

export type AtlasUserData = {
  name?: string
}

export type UserProfile = {
  type?: string,
  identities?: Array<AtlasUserIdentity>,
  data?: AtlasUserData
}
