import CardPrice from "@/components/shared/card_price";

export default function Home() {
  return (
    <main className="main">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardPrice currency="USD" price={29.99} />
        <CardPrice currency="EUR" price={24.99} />
        <CardPrice currency="GBP" price={19.99} />
      </div>
    </main>
  );
}
