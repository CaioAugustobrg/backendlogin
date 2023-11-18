import { Entity } from "../../core/domain/Entity";

export type TransactionsProps = {
  debitedAccountId: string;
  value: number;
};

export class Transactions extends Entity<TransactionsProps> {
  public debitedAccountId: string;
  public value: number;

  public constructor(props: TransactionsProps) {
    super();
    this.debitedAccountId = props.debitedAccountId;
    this.value = props.value;
  }
}
