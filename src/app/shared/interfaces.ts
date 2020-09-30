export interface User {
  email: string
  password: string

  // ? -  необезательно
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}
