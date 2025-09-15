import CardPrice from "@/components/shared/card_price";

export default function Home() {
  return (
    <main className="main">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardPrice currency="Bitcoin (BTC)" price={299923.962323} />
        <CardPrice currency="Ethereum (ETH)" price={224.99} />
        <CardPrice currency="GBP" price={19.99} />
      </div>
    </main>
  );
}
