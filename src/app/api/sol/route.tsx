import { NextResponse } from 'next/server';

export async function GET() {
  const coingeckoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

  try {
    const response = await fetch(coingeckoURL, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from CoinGecko, status: ${response.status}`);
    }

    const data = await response.json();
    const price = data.solana.usd;

    return NextResponse.json({ price });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Solana price data.' },
      { status: 500 }
    );
  }
}
