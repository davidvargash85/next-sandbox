export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type Transaction = {
  date: string;
  description: string;
  amount: number;
};

export type AccountInfo = {
  id: number,
  accountName: string;
  balance: number;
  transactions: Transaction[];
};

export type ApiError = {
  message: string;
};

export type Input = {
  email: string;
  name: string;
  phone: string;
};
