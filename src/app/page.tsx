import CardPrice from "@/components/shared/card_price";
import { headers } from "next/headers";

export default async function Home() {
  const hdrs = await headers();
  const host = hdrs.get("host");
  const protocol = hdrs.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : "";

  let btcPrice = 0, ethPrice = 0, solPrice = 0;
  try {
    if (baseUrl) {
      const [btcRes, ethRes, solRes] = await Promise.all([
        fetch(`${baseUrl}/api/btc`),
        fetch(`${baseUrl}/api/eth`),
        fetch(`${baseUrl}/api/sol`),
      ]);

      if (btcRes.ok) {
        const btcData = await btcRes.json();
        btcPrice = btcData.price ?? 0;
      }

      if (ethRes.ok) {
        const ethData = await ethRes.json();
        ethPrice = ethData.price ?? 0;
      }

      if (solRes.ok) {
        const solData = await solRes.json();
        solPrice = solData.price ?? 0;
      }
    }
  } catch {
    btcPrice = 0;
    ethPrice = 0;
    solPrice = 0;
  }

  return (
    <main className="main">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardPrice currency="Bitcoin (BTC)" price={btcPrice} />
        <CardPrice currency="Ethereum (ETH)" price={ethPrice} />
        <CardPrice currency="Solana (SOL)" price={solPrice} />
      </div>
    </main>
  );
}
