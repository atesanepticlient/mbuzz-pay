import React from "react";

import invalid from "@/../public/no-credit-card.png";
import Image from "next/image";
import Link from "next/link";

const AlreadySubmited = () => {
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
          Aready Submited
        </h4>
        <p className="text-xs text-gray-600 text-center antialiased">
          We have accept Your deposit request. if you don&apos;t get the deposit
          to your account within 24h! contact to{" "}
          <Link
            href="#"
            className="text-gray-700 font-semibold hover:text-gray-600"
          >
            Agents
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default AlreadySubmited;
