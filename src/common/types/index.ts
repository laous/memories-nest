export type MemorieType = {
  memorieId: string;
  title: string;
  description: string;
  image: string;
  hashtags: string[];
  ownerId: string;
};

export type CommentType = {
  commentId: string;
  title: string;
  content: string;
  authorId: string;
  memorieId: string;
};

export type ProfileType = {
  profileId: string;
  bio: string | null;
  image: string | null;
  userId: string;
  name: string | null;
};

export type UserType = {
  userId: string;
  email: string;
  username: string;
  password: string;
};

export type JwtType = {
  access_token: string;
  refresh_token: string;
};
