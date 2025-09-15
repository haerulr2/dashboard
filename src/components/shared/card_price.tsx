"use client";
import { Card } from "@heroui/react";
import React from "react";

const CardPrice = ({ currency, price }: { currency: string; price: number }) => {
  return (
    <div>
      <h1>{currency} Price</h1>
      <p>{price.toLocaleString()} {currency}</p>
    </div>
    // <Card>
    //   <CardTitle className="text-lg font-medium mb-2">
    //     {currency} Price
    //   </CardTitle>
    //   <CardContent className="text-2xl font-bold">
    //     {price.toLocaleString()} {currency}
    //   </CardContent>
    // </Card>
  );
};

export default CardPrice;
