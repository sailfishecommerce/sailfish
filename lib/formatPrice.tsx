import useCurrency, { currencySymbolFormatter } from "@/hooks/useCurrency";
import { useAppSelector } from "@/hooks/useRedux";

export function formatPrice(price: number) {
  const productPrice = price?.toFixed(2);
  const splitPrice = productPrice?.split(".");
  const mainPrice =
    splitPrice !== undefined ? Number(splitPrice[0])?.toLocaleString() : 0;
  const centPrice = splitPrice !== undefined ? splitPrice[1] : 0;
  return { mainPrice, centPrice };
}

interface formattedPriceProps {
  price: number;
  oldPrice?: boolean;
}

export default function FormattedPrice({
  price,
  oldPrice,
}: formattedPriceProps): JSX.Element {
  const { currencies } = useCurrency();
  const { currency } = useAppSelector((state) => state.currencyLanguage);

  const selectedCurrency = currencies
    ? currencies.filter(
        (currencyP: { code: string }) => currencyP.code === currency
      )
    : [{ symbol: "$", rate: 1 }];
  const siteCurriences =
    currencies !== undefined ? currencies : [{ symbol: "$", rate: 1 }];
  const currencyRate =
    currencies !== undefined ? currencies[1].rate : siteCurriences[0].rate;

  const priceRate = oldPrice
    ? (price / currencyRate) * selectedCurrency[0].rate
    : price * selectedCurrency[0].rate;

  console.log("currencies", currencies);
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
