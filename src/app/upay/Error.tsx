/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
const Error = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    // if (reason === "backdropClick") return; // prevent closing on backdrop click
    // if (reason === "escapeKeyDown") return; // prevent closing on ESC key
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
          <Box className="!border-none !outline-none !w-[300px] mx-auto !rounded-lg mt-[200px] shadow-sm">
            <div className="bg-gradient-to-r from-pink-600 to-pink-800 w-full h-[80px] flex justify-center items-center">
              <IoIosCloseCircleOutline className="w-8 h-8 text-white" />
            </div>
            <div className="bg-white">
              <h4 className="text-center text-lg font-semibold text-slate-800">
                Error
              </h4>
              <p className="text-xs text-gray-500 text-center my-3 px-3">
                {message}
              </p>
              <div className="flex justify-center pb-7 mt-3">
                <Link
                  href="#"
                  style={{ borderRadius: "10px" }}
                  className="bg-gradient-to-r from-pink-600 to-pink-800 text-white block !rounded-md border-none cursor-pointer px-4 py-2  w-max mx-auto"
                >
                  Try later
                </Link>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Error;
