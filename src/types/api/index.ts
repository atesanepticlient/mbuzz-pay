import { Prisma } from "@prisma/client";

export interface FindDepositInput {
  trackingNumber: string;
}

export interface FindDepositOutput {
  payload:  Prisma.DepositGetPayload<{ include: { wallet: true } }>;
}

export interface MakeDepositInput {
  id: string;
  trackingNumber: string;
  walletNumber: string;
  trxID: string;
}

