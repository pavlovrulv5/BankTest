
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


export interface Transaction {
  id: number;
  sender: string;
  recipient: string;
  amount: number;
  commission: number;
  total: number;
  date: string;
}


interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  removeTransaction: (id: number) => void;
  clearTransactions: () => void;
}


export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
   
      transactions: [],
      
      
      addTransaction: (transaction) => 
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: state.transactions.length > 0 
                ? Math.max(...state.transactions.map(t => t.id)) + 1 
                : 1,
              date: new Date().toISOString()
            }
          ]
        })),
      
      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(transaction => transaction.id !== id)
        })),
      
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'transaction-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
