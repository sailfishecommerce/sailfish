import useCurrency, { currencySymbolFormatter } from "@/hooks/useCurrency";
import { useAppSelector } from "@/hooks/useRedux";

export function formatPrice(price: number) {
  const productPrice = price?.toFixed(2);
  const splitPrice = productPrice?.split(".");
  console.log("price-price", price, "splitPrice", splitPrice);
  const mainPrice =
    splitPrice !== undefined ? Number(splitPrice[0])?.toLocaleString() : 0;
  const centPrice = splitPrice !== undefined ? splitPrice[1] : 0;
  return { mainPrice, centPrice };
}

interface formattedPriceProps {
  price: number;
}

export default function FormattedPrice({
  price,
}: formattedPriceProps): JSX.Element {
  const { currencies } = useCurrency();
  const { currency } = useAppSelector((state) => state.currencyLanguage);

  const selectedCurrency = currencies
    ? currencies.filter(
        (currencyP: { code: string }) => currencyP.code === currency
      )
    : [{ symbol: "$", rate: 1 }];

  const priceRate =
    currency === "HKD" ? price : price * selectedCurrency[0].rate;

  return (
    <div className="d-flex align-items-baseline">
      {currencies ? currencySymbolFormatter(selectedCurrency[0]) : "HKD $"}
      {formatPrice(priceRate).mainPrice}.
      <small>{formatPrice(priceRate).centPrice}</small>
    </div>
  );
}

export function HkdPrice({ price }: formattedPriceProps): JSX.Element {
  const { currencies } = useCurrency();
  const { currency } = useAppSelector((state) => state.currencyLanguage);

  const selectedCurrency = currencies
    ? currencies.filter(
        (currencyP: { code: string }) => currencyP.code === currency
      )
    : [{ symbol: "$", rate: 1 }];

  return (
    <div className="d-flex align-items-baseline">
      {currencies ? currencySymbolFormatter(selectedCurrency[0]) : "HKD $"}
      {formatPrice(price).mainPrice}.
      <small>{formatPrice(price).centPrice}</small>
    </div>
  );
}
