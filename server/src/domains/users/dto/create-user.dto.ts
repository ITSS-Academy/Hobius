export class CreateUserDto {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatarURL: string;
  wallPaperURL: string;
  role: string;
  joinedDate: string;
}

export class FirebaseUserDto {
  uid: string;
  email: string;
  name: string;
  picture: string;
}
