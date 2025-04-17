import React from "react";
import timeout from "@/../public/deadline.png";
import Image from "next/image";
import Link from "next/link";

const TimerOut = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center items-center w-[250px] mx-auto">
        <Image
          alt="time out"
          src={timeout}
          placeholder="blur"
          className="w-[120px] h-full"
        />
        <h4 className="text-xl font-bold text-center text-[#FE4040] uppercase mb-1">
          timeout!
        </h4>
        <p className="text-xs text-gray-600 text-center antialiased">
          You missed the payment submission! don&apos;t worry you can contact to
          the Agents about your Deposit
        </p>
        <Link
          href="#"
          className="bg-black text-white font-semibold text-sm w-max px-3 py-2 rounded-sm block mx-auto mt-2"
        >
          Contact Agent
        </Link>
      </div>
    </div>
  );
};

export default TimerOut;
