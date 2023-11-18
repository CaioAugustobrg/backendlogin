import { Entity } from "../../core/domain/Entity";

export type AccountProps = {
  userId: string;
  balance: number;
};

export class Account extends Entity<AccountProps> {
  public userId: string;
  public balance: number;

  public constructor(props: AccountProps) {
    super();
    this.userId = props.userId;
    this.balance = props.balance;
  }
}
