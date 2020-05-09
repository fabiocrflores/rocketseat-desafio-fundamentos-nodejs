import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomesValue = this.sumTransactionByType('income');
    const outcomesValue = this.sumTransactionByType('outcome');
    const totalValue = incomesValue - outcomesValue;

    const balance = {
      income: incomesValue,
      outcome: outcomesValue,
      total: totalValue,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private sumTransactionByType(type: string): number {
    const transactionType = this.transactions.filter(transaction => {
      return transaction.type === type;
    });
    const sumTransaction = transactionType.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);
    return sumTransaction;
  }
}

export default TransactionsRepository;
