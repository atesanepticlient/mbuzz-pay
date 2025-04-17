import React from "react";

import invalid from "@/../public/no-credit-card.png";
import Image from "next/image";
import Link from "next/link";

const InvalidPayment = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-[250px] mx-auto">
        <Image
          alt="invalid payment"
          src={invalid}
          placeholder="blur"
          className="w-[120px] h-full"
        />
        <h4 className="text-xl font-bold text-center text-[#057CEE]">
          Invalid Pyament!
        </h4>
        <p className="text-xs text-gray-600 text-center antialiased">
          Please go to the{" "}
          <Link
            href="#"
            className="text-gray-700 font-semibold hover:text-gray-600"
          >
            Deposit Page
          </Link>{" "}
          and make another deposit
        </p>
      </div>
    </div>
  );
};

export default InvalidPayment;
