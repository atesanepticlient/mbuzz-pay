"use client";

import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
const Instruction = ({
  trxType,
  walletNumber,
  warning,
  children,
}: {
  trxType: string;
  walletNumber: string;
  warning: string | null;
  children: React.ReactNode;
}) => {
  const nagadSendMoneySteps = [
    "Open Nagad app",
    "Login",
    "Tap 'Send Money'",
    `Enter recipient number -${walletNumber}`,
    "Enter amount",
    "Confirm with PIN",
    "Get Transaction ID",
  ];
  const nagadCashoutSteps = [
    "Open Nagad app or dial *167#",
    "Login",
    "Tap 'Cash Out'",
    "Choose Agent",
    `Enter Agent ${walletNumber} number`,
    "Confirm with PIN",
    "Get Transaction ID",
  ];

  const instructions =
    trxType.toLocaleLowerCase() === "cash-out"
      ? nagadCashoutSteps
      : nagadSendMoneySteps;

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">{children}</button>
        </DialogTrigger>
        <DialogContent className="!bg-white">
          <DialogHeader className=" bg-gradient-to-r from-[#F95F35] to-[#F98D2B]">
            <DialogDescription>
              How to {trxType} in <strong>Bkash</strong>
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-6  flex justify-center flex-col items-start">
              {instructions.map((s, i) => (
                <p key={i} className="my-1 text-base text-gray-600 ">
                  {i + 1}. {s}
                </p>
              ))}
            </div>
          </div>
        </DialogContent>
        {warning && (
          <DialogFooter className="flex justify-start items-center gap-2 bg-white">
            <IoWarningOutline className="w-4 h-4 text-gray-700" />
            <p className="text-sm text-gray-800">{warning}</p>
          </DialogFooter>
        )}
      </Dialog>
    </div>
  );
};

export default Instruction;


