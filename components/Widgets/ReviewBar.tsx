interface Props {
  barWidth: number;
  count: number;
}
export default function ReviewBars({ barWidth, count }: Props) {
  const barPerentage = barWidth > 0 ? `${barWidth} %` : "0";
  return (
    <div className="review-bar d-flex align-items-center">
      <h4 className="count ms-6">{count}</h4>
      <div className="w-100 bar-wrapper bg-seondary rounded-full">
        <div className="bar rounded-full" />
      </div>
      <p className="percentage">{barPerentage}</p>
      <style jsx>
        {`
          .bar-wrapper {
            height: 10px;
            margin: 0px 10px;
            background-color: var(--bs-gray-300);
            border-radius: 5px;
          }
          .bar {
            width: ${barWidth}%;
            background-color: var(--bs-blue);
            height: 10px;
            border-radius: 5px;
          }
          .percentage {
            width: 50px;
            margin: 0px;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}
