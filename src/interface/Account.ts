import { User } from "./User";
import { BankAccount } from "./BankAccount";

export interface Account {
  user: User;
  bankAccount: BankAccount[];
}
