export interface ProductRequestBody {
  name: string;
  price: number;
  priceSale: number;
  color: string;
  status: "SALE" | "NEW" | "REGULAR";
  userId: string;
}
