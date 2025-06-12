import { NextResponse } from 'next/server'

export async function GET() {
  const receiverAddress = process.env.USDT_RECEIVER_2;

  if (!receiverAddress) {
    return NextResponse.json({ error: 'Receiver address not configured' }, { status: 500 });
  }

  return NextResponse.json({ address: receiverAddress });
} 