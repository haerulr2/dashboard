import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

const CardPrice = ({ currency, price }: { currency: string; price: number }) => {
  return (
    <Card>
      <CardTitle className="text-lg font-medium mb-2">
        {currency} Price
      </CardTitle>
      <CardContent className="text-2xl font-bold">
        {price.toLocaleString()} {currency}
      </CardContent>
    </Card>
  );
};

export default CardPrice;
