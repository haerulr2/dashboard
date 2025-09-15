"use client";
import { Card } from "@heroui/react";
import React from "react";

const CardPrice = ({ currency, price }: { currency: string; price: number; }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 10,
  }).format(price);

  return (
    <Card className="p-4 bg-black border-1 border-zinc-400 space-y-4">
      <div className="text-base text-default-400">{currency}</div>
      <div className="text-3xl font-semibold text-end">{formattedPrice}</div>
    </Card>
  );
};

export default CardPrice;
