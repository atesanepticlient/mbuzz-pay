/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import InvalidPayment from "@/components/InvalidPayment";
import TimerOut from "@/components/TimerOut";
import {
  useFindDepositQuery,
  useMakeDepositMutation,
} from "@/lib/features/paymentApiSlice";

import TimerCountdown from "./../../components/Timer";
import AlreadySubmited from "@/components/AlreadySubmited";
import Error from "./Error";
import { INTERNAL_SERVER_ERROR } from "@/error";
import Success from "./Sucess";
import Instruction from "./Instruction";

import bkashLogo from "@/../public/wallet/bkash.png";

import Image from "next/image";

import { IoCopy } from "react-icons/io5";

function Payment() {
  const [invalidPayment, setInvalidPayment] = React.useState(false);
  const [timeOut, setTimeOut] = React.useState(false);
  const [alreadySubmited, setAlreadySubmited] = React.useState(false);

  const trackingNumber = useSearchParams().get("trackingNumber") || "";

  const { data, isLoading, status, error } = useFindDepositQuery({
    trackingNumber,
  });

  const deposit = data?.payload;

  React.useEffect(() => {
    console.log("Fetcha query error", error);
    if (error) {
      const err = error as any;
      const statusCode = err.status;
      if (statusCode == 400) {
        setInvalidPayment(true);
      } else if (statusCode == 402) {
        setTimeOut(true);
      } else if (statusCode == 403) {
        setAlreadySubmited(true);
      }
    }
  }, [error, status]);

  return (
    <>
      {invalidPayment && <InvalidPayment />}
      {timeOut && <TimerOut />}
      {alreadySubmited && <AlreadySubmited />}
      {isLoading && <span>Loading...</span>}
      {data &&
        deposit &&
        !isLoading &&
        !invalidPayment &&
        !timeOut &&
        !alreadySubmited && (
          <section className="overflow-x-hidden overflow-y-hidden relative text-center bg-white  w-full h-screen">
            <div className="px-5 min-h-[628px]">
              <TimerCountdown
                targetTime={deposit.expire}
                onEnd={() => {
                  setTimeOut(true);
                }}
                style="bg-[#E1146D]/30 border-[#E1146D]"
              />
              <PaymentHeader />
              <InvoiceDetails
                walletNumber={deposit.wallet.walletNumber}
                totalAmount={+deposit.amount}
                trxType={deposit.wallet.trxType}
              />
              <SubmissionForm
                trxType={deposit.wallet.trxType}
                warning={deposit.wallet.warning}
                trackingNumber={deposit.trackingNumber}
                id={deposit.id}
                walletNumber={deposit.wallet.walletNumber}
              />
            </div>
          </section>
        )}
    </>
  );
}

export default Payment;

const PaymentHeader = () => {
  return (
    <header className="flex justify-center items-center px-4 py-3">
      <Image src={bkashLogo} alt="bkash" className="mx-auto w-[140px] " />
    </header>
  );
};

// interface MerchantInfoProps {
//   merchantName: string;
//   logoUrl: string;
// }

// function MerchantInfo({ merchantName, logoUrl }: MerchantInfoProps) {
//   return (
//     <header className="mt-10 text-center h-[100px]">
//       <div className="text-center">
//         <img
//           alt={`${merchantName} logo`}
//           src={logoUrl}
//           className="inline max-w-full text-center h-[60px] overflow-x-clip overflow-y-clip"
//         />
//       </div>
//       <h1 className="text-base font-bold leading-5 text-center h-[38.4px]">
//         {merchantName}
//       </h1>
//     </header>
//   );
// }

interface InvoiceDetailsProps {
  walletNumber: string;
  totalAmount: number;
  trxType: string;
}

function InvoiceDetails({
  walletNumber,
  totalAmount,
  trxType,
}: InvoiceDetailsProps) {
  return (
    <section className="flex items-center px-4 py-3 text-left min-h-[70px]">
      <img
        alt="Merchant Logo"
        src="https://payment.bkash.com/assets/default-pgw-merchant-logo-a9b89a60.svg"
        className="overflow-x-hidden overflow-y-hidden shrink-0 mr-2 w-8 max-w-full h-8 text-left bg-orange-50 rounded-full"
      />
      <div className="grow mr-1.5 text-left min-w-[100px]">
        <div className="flex items-start gap-2">
          <h4 className="text-left break-all">{walletNumber}</h4>
          <button onClick={() => navigator.clipboard.writeText(walletNumber)}>
            <IoCopy className="w-3 h-3" />
          </button>
        </div>

        <p className="mt-1 text-xs leading-3 text-left break-all border-neutral-500 decoration-neutral-500 outline-neutral-500 text-neutral-500">
          {" "}
          We accept{" "}
          <strong>
            {trxType.toLowerCase() == "cash-out" ? "Cashout" : "Send Money"}{" "}
            Only
          </strong>
        </p>
      </div>
      <div className="grow shrink-0 text-base leading-5 text-right basis-[100px]">
        <p className="text-base leading-5 text-right"> ৳{totalAmount}</p>
      </div>
    </section>
  );
}

interface SubmissionFormProps {
  trackingNumber: string;
  id: string;
  walletNumber: string;
  warning: string | null;
  trxType: string;
}

function SubmissionForm({
  trackingNumber,
  id,
  walletNumber,
  warning,
  trxType,
}: SubmissionFormProps) {
  const [trxID, setTrxID] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [pending, setTransition] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTrxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10 && /^[a-zA-Z0-9-]*$/.test(value)) {
      setTrxID(value);
    }
  };

  const [makeDepositApi] = useMakeDepositMutation();

  const handleSubmit = (e: React.FormEvent) => {
    setTransition(true);
    e.preventDefault();
    if (trxID.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit TrxID");
      setTransition(false);
      return;
    }
    makeDepositApi({ trackingNumber, id, trxID, walletNumber })
      .unwrap()
      .then((res) => {
        if (res.success) {
          setSuccess(true);
          setTransition(false);
        }
      })
      .catch((error: any) => {
        console.log({ error });
        if (error.data.error) {
          setError(error.data.error);
          setTransition(false);
        } else {
          setError(INTERNAL_SERVER_ERROR);
          setTransition(false);
        }
      });
  };

  return (
    <section className="flex flex-col justify-center items-center px-4 w-full leading-4 text-white bg-pink-600 border-white outline-white decoration-white h-[306px]">
      <form className="text-center" onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <label
            htmlFor="verificationCode"
            className="text-sm leading-5 text-white border-white cursor-default outline-white decoration-white"
          >
            Enter Transaction ID
          </label>

          <input
            disabled={pending}
            id="otp-input"
            placeholder="TrxID"
            type="string"
            required
            name="trxid"
            value={trxID}
            onChange={handleTrxIdChange}
            ref={inputRef}
            className="px-3 py-2 my-2 w-full text-base leading-6 bg-white text-black rounded transition-shadow cursor-text duration-[0.3s] ease-[ease-in-out] overflow-x-clip overflow-y-clip"
            aria-label="Enter Transaction ID"
          />
        </div>

        <div className="text-center min-h-5">
          {errorMessage && (
            <span className="inline text-center text-yellow-400">
              {errorMessage}
            </span>
          )}
        </div>

        <Instruction
          trxType={trxType}
          walletNumber={walletNumber}
          warning={warning}
        >
          <p
            className="leading-4
            text-white
            underline
            whitespace-nowrap
            border-white
            cursor-pointer
            outline-white
            decoration-white
            underline-offset-2"
          >
            See The Instruction
          </p>
        </Instruction>
        <div className="flex justify-center mt-4 text-center ">
          <button
            disabled={pending}
            type="submit"
            className="px-4 py-3 mr-3 w-full text-sm leading-4 capitalize rounded border border-solid cursor-pointer bg-pink-600 border-neutral-200 delay-[0s,0s] text-white duration-[0.03s,0.3s] ease-[ease-in-out,ease-in-out] transition-[background-color,box-shadow]"
          >
            {pending ? <ScaleLoader color="#fff" /> : "Submit"}
          </button>
        </div>
      </form>

      {error && <Error message={error} />}
      {success && (
        <Success
          message={
            "We have accept Your deposit request. if you don't get the deposit to your account within 24h! contact to"
          }
        />
      )}
    </section>
  );
}
