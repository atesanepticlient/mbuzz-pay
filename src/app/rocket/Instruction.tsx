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
  const rocketSendMoneySteps = [
    "Open Rocket app or dial *322#",
    "Login",
    "Select 'Send Money'",
    `Enter recipient number - ${walletNumber}`,
    "Enter amount",
    "Enter reference (if any)",
    "Confirm with PIN",
    "Get Transaction ID",
  ];

  const rocketCashoutSteps = [
    "Open Rocket app or dial *322#",
    "Login",
    "Select 'Cash Out'",
    "Choose Agent or ATM",
    `Enter Agent number - ${walletNumber}`,
    "Enter amount",
    "Confirm with PIN",
    "Get Transaction ID",
  ];
  const instructions =
    trxType.toLocaleLowerCase() === "cash-out"
      ? rocketSendMoneySteps
      : rocketCashoutSteps;

  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">{children}</button>
        </DialogTrigger>
        <DialogContent className="!bg-white">
          <DialogHeader className=" bg-gradient-to-r from-[#d33cdb] to-[#89288F]">
            <DialogDescription className="py-6 block">
              How to {trxType} in <strong>Rocket</strong>
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
          {warning && (
            <DialogFooter className="flex justify-start items-center gap-2 bg-white">
              <div className="flex items-center gap-2">
                <IoWarningOutline className="w-4 h-4 text-gray-700" />
                <p className="text-sm text-gray-800">{warning}</p>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Instruction;
