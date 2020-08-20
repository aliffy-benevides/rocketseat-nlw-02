export default interface IUser {
  id?: number;

  first_name: string;
  last_name: string;
  email: string;
  password: string;

  avatar?: string;
  whatsapp?: string;
  bio?: string;
}