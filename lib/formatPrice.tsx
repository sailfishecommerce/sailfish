import { currencySymbolFormatter } from "@/hooks/useCurrency";
import useQueryData from "@/hooks/useQueryData";
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
  isProduct?: boolean;
}

export default function FormattedPrice({
  price,
  oldPrice,
  isProduct,
}: formattedPriceProps): JSX.Element {
  const currencies: any = useQueryData("currencies");
  const { currency } = useAppSelector((state) => state.currencyLanguage);

  const selectedCurrency = currencies
    ? currencies?.filter(
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

  const productItemPrice = isProduct ? priceRate : price;

  return (
    <div className="d-flex align-items-baseline">
      {currencies ? currencySymbolFormatter(selectedCurrency[0]) : "HKD $"}
      {formatPrice(productItemPrice).mainPrice}.
      <small>{formatPrice(productItemPrice).centPrice}</small>
    </div>
  );
}

export function HkdPrice({ price }: formattedPriceProps): JSX.Element {
  const currencies: any = useQueryData("currencies");
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
