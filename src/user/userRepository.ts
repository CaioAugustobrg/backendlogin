import { User } from "../domain/entities/user";
import { HttpResponse } from "../ports/http";

export interface UserRepository {
  findUserByUsername: (username: string) => Promise<User | null>;
  createUser: (userData: User) => Promise<HttpResponse>;
  findUserByEmail: (email: string) => Promise<User | null>;
}
