import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (title === '') {
      throw Error('Título obrigatório');
    }
    if (value <= 0) {
      throw Error('Valor inválido');
    }
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Tipo inválido');
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance().total;
      if (value > balance) {
        throw Error('Saldo insuficiente para realizar essa transação');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
