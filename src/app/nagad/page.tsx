/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { MdContentCopy } from "react-icons/md";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import InvalidPayment from "../../components/InvalidPayment";
import TimerOut from "../../components/TimerOut";
import {
  useFindDepositQuery,
  useMakeDepositMutation,
} from "@/lib/features/paymentApiSlice";

import TimerCountdown from "./../../components/Timer";
import AlreadySubmited from "../../components/AlreadySubmited";
import Error from "./Error";
import { INTERNAL_SERVER_ERROR } from "@/error";
import Success from "./Success";
import Instruction from "./Instruction";

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
      const err = error as any
      const statusCode = err?.status;
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
            <div className='px-5 bg-no-repeat bg-cover border-solid bg-[50%_50%] bg-[url("https://payment.mynagad.com:30000/img/bg.png")] border-[5.55556px] border-stone-800 min-h-[628px]'>
              <TimerCountdown
                targetTime={deposit.expire}
                onEnd={() => {
                  setTimeOut(true);
                }}
              />
              <div className="flex justify-center flex-col py-4">
                <img
                  alt="Nagad Logo"
                  src="https://payment.mynagad.com:30000/img/logo.png"
                  className="  mx-auto w-[80px] text-center  overflow-x-clip overflow-y-clip"
                />
                <h4 className="text-[#ccc] text-lg font-semibold">
                  Nagad Payment
                </h4>
              </div>
              <InvoiceDetails
                walletNumber={deposit.wallet.walletNumber}
                totalAmount={+deposit.amount}
                charge="0"
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

// interface MerchantInfoProps {
//   merchantName: string;
//   logoUrl: string;
// }

//  function MerchantInfo({ merchantName, logoUrl }: MerchantInfoProps) {
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
  charge: string;
}

 function InvoiceDetails({
  walletNumber,
  totalAmount,
  charge,
}: InvoiceDetailsProps) {
  return (
    <section className="py-6 text-left">
      <div className=" py-2 mx-1.5 my-3 leading-5 text-center text-red-800 align-middle bg-white rounded rounded-tl rounded-tr rounded-br rounded-bl border-solid  select-none border-[1.11111px] border-black border-opacity-0 decoration-red-800 delay-[0s,0s,0s,0s] duration-[0.15s,0.15s,0.15s,0.15s] ease-[ease-in-out,ease-in-out,ease-in-out,ease-in-out]  outline-red-800 transition-[color,background-color,border-color,box-shadow]">
        <span>
          We accept <strong>Cashout</strong> to the Number
        </span>
      </div>
      <div className="flex items-start gap-2">
        <p className="h-8 leading-4 text-left text-[#ccc] ">
          <strong className="font-bold leading-4 text-left ">
            Wallet Number:
          </strong>
          <span className="leading-4 text-left ml-1 ">{walletNumber}</span>
        </p>
        <button onClick={() => navigator.clipboard.writeText(walletNumber)}>
          <MdContentCopy className="w-3 h-3 text-[#ccc] " />
        </button>
      </div>
      <div className="flex items-start gap-2 ">
        <p className="h-8 leading-4 text-left text-[#ccc]">
          <strong className="font-bold leading-4 text-left">
            Total Amount:
          </strong>
          <span className="leading-4 text-left ml-1">{totalAmount}</span>
        </p>
        <button
          onClick={() => navigator.clipboard.writeText(totalAmount.toString())}
        >
          <MdContentCopy className="w-3 h-3 text-[#ccc]" />
        </button>
      </div>

      <div className="flex items-start gap-2 text-[#ccc]">
        <p className="h-8 leading-4 text-left">
          <strong className="font-bold leading-4 text-left">Charge:</strong>
          <span className="leading-4 text-left ml-1">{charge}</span>
        </p>
        <p className="h-8 leading-4 text-left">
          <strong className="inline font-bold leading-4 text-left" />
          <span className="inline leading-4 text-left" />
        </p>
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
    <section className="text-center min-h-[150px]">
      <form className="text-center" onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <label
            htmlFor="otp-input"
            className="mb-2 text-base font-bold text-center cursor-default block text-white"
          >
            Enter Transaction ID
          </label>
          <input
            disabled={pending}
            id="otp-input"
            inputMode="numeric"
            placeholder="TrxID"
            type="string"
            required
            name="trxid"
            value={trxID}
            onChange={handleTrxIdChange}
            ref={inputRef}
            className="px-3 py-1.5 mx-auto border-none outline-none text-base leading-6 text-center bg-white rounded-lg cursor-text overflow-x-clip overflow-y-clip w-[70%]"
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
          <p className="text-center  cursor-pointer font-bold mt-2 text-xs text-white">
            See The Instruction
          </p>
        </Instruction>

        <div className="flex justify-center mt-4 text-center ">
          <button
            disabled={pending}
            type="submit"
            className="box-border px-1.5 py-2 mx-1.5 font-bold leading-5 text-center text-red-800 align-middle bg-white rounded rounded-tl rounded-tr rounded-br rounded-bl border-solid cursor-pointer select-none border-[1.11111px] border-black border-opacity-0 decoration-red-800 delay-[0s,0s,0s,0s] duration-[0.15s,0.15s,0.15s,0.15s] ease-[ease-in-out,ease-in-out,ease-in-out,ease-in-out] min-w-20 outline-red-800 transition-[color,background-color,border-color,box-shadow]"
          >
            {pending ? (
              <ScaleLoader color="#991b1b" className="text-sm " />
            ) : (
              "Proceed"
            )}
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

// function Alert({ alert }: { alert: string }) {
//   return (
//     <p className="p-2 text-sm border border-white text-white rounded-sm my-2">
//       *{alert}
//     </p>
//   );
// }
