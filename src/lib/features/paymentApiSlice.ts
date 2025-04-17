import {
  FindDepositInput,
  FindDepositOutput,
  MakeDepositInput,
} from "@/types/api";
import { apiSlice } from "./apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findDeposit: builder.query<FindDepositOutput, FindDepositInput>({
      query: ({ trackingNumber }) => ({
        url: `api/deposit?trackingNumber=${trackingNumber}`,
        method: "GET",
      }),
    }),
    makeDeposit: builder.mutation<{ success: boolean }, MakeDepositInput>({
      query: (body) => ({
        url: "api/deposit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useFindDepositQuery, useMakeDepositMutation } = paymentApiSlice;
