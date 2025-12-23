export interface Transaction {
  date: string;
  description: string;
  type: 0 | 1 | 2; // Use 1 for debit, 0 for credit, and ignore other types. ( Here type can have 0,1 and 2 as value)
  amount: number;
  balance: string;
}
