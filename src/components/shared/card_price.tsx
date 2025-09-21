"use client";

import React from "react";

const CardPrice = ({
  currency,
  price,
}: {
  currency: string;
  price: number;
}) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 10,
  }).format(price);

  return (
    <div className="p-4 border-1 rounded-md border-zinc-400 space-y-4 bg-black">
      <div className="text-base text-white">{currency}</div>
      <div className="text-3xl font-semibold text-end text-white">{formattedPrice}</div>
    </div>
  );
};

export default CardPrice;
