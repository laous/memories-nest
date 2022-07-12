export type User = {
  userId: string;
  email: string;
  username: string;
  name?: string;
  hashedRT?: string;
};

export type JwtType = {
  access_token: string;
  refresh_token: string;
};
