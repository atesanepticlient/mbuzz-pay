"use client";

import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

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
  const [openModal, setOpenModal] = useState(false);

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
    trxType.toLocaleLowerCase() === "cashout"
      ? nagadCashoutSteps
      : nagadSendMoneySteps;

  return (
    <div>
      {" "}
      <button onClick={() => setOpenModal(true)} type="button">
        {children}
      </button>
      <Modal
        position="center"
        show={openModal}
        onClose={() => setOpenModal(false)}
        className=""
      >
        <ModalHeader className=" bg-gradient-to-r from-[#F95F35] to-[#F98D2B]">
          <span className="text-white">
            How to {trxType} in <strong>Nagad</strong>
          </span>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6  flex justify-center flex-col items-start">
            {instructions.map((s, i) => (
              <p key={i} className="my-1 text-base text-gray-600 ">
                {i + 1}. {s}
              </p>
            ))}
          </div>
        </ModalBody>
        {warning && (
          <ModalFooter className="flex justify-start items-center gap-2 bg-white">
            <IoWarningOutline
              className="w-4 h-4 text-gray-700
        "
            />
            <p className="text-sm text-gray-800">{warning}</p>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default Instruction;
