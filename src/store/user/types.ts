export interface UserState {
  username: string
  accessToken: string
  refereshToken?: string
  roles: Array<string>
}
