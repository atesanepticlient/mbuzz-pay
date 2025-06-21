/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
const Success = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: any, reason: any) => {
    if (reason === "backdropClick") return; // prevent closing on backdrop click
    if (reason === "escapeKeyDown") return; // prevent closing on ESC key
    setOpen(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="!border-none !bg-transparent "
        >
          <Box className="!border-none !outline-none !w-[300px] mx-auto mt-[200px] !rounded-lg shadow-sm">
            <div className="bg-gradient-to-r from-[#F95F35] to-[#F98D2B] w-full h-[80px] flex justify-center items-center">
              <FaCheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="bg-white">
              <h4 className="text-center text-lg font-semibold text-slate-800">
                Success
              </h4>
              <p className="text-xs text-gray-500 text-center my-3 px-3">
                {message}
              </p>
              <div className="flex justify-center pb-7 mt-3">
                <Link
                  style={{ borderRadius: "10px" }}
                  href={`${process.env.MAIN_APP_URL}/history`}
                  className="bg-gradient-to-r from-[#F95F35] to-[#F98D2B] text-white block !rounded-md border-none cursor-pointer px-4 py-2  w-max mx-auto"
                >
                  Check Deposit
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Success;
