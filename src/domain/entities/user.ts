import { Entity } from "../../core/domain/Entity";

export interface UserProps {
  username: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  public username: string;
  public email: string;
  public password: string;

  public constructor(props: UserProps) {
    super();
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
  }
}
