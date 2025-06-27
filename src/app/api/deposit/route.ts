import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const trackingNumber =
      new URL(req.url).searchParams.get("trackingNumber") || "";

    if (!trackingNumber) {
      return Response.json(
        { error: "Invalid Payment Address" },
        { status: 400 }
      );
    }

    const deposit = await db.deposit.findUnique({
      where: { trackingNumber },
      include: { wallet: true },
    });

    if (!deposit) {
      return Response.json(
        { error: "Invalid Payment Address" },
        { status: 400 }
      );
    }
    console.log("X", deposit.trxID);
    if (deposit.trxID) {
      return Response.json(
        { error: "Your Payment Request Already Accepted" },
        { status: 403 }
      );
    }

    if (new Date() > new Date(deposit?.expire)) {
      return Response.json({ error: "Time Out" }, { status: 402 });
    }

    return Response.json({ payload: deposit }, { status: 200 });
  } catch (error) {
    console.log("Payment get ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { id, trackingNumber, walletNumber, trxID } = await req.json();

    const deposit = await db.deposit.findUnique({
      where: {
        id,
        trackingNumber,
        wallet: {
          walletsNumber: { hasSome: walletNumber },
        },
        status: "PENDING",
      },
    });

    if (!deposit) {
      return Response.json({ error: "Deposit Not Found!" }, { status: 404 });
    }
    if (new Date() > new Date(deposit?.expire)) {
      return Response.json({ error: "Time Out" }, { status: 402 });
    }
    await db.deposit.update({ where: { id: deposit.id }, data: { trxID } });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("Payment POST ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
