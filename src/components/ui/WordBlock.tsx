const WordBlock = ({
  text,
  index,
  showIndicators = false,
}: {
  text: string;
  index: bigint;
  showIndicators?: boolean;
}) => (
  <div className="pointers-events-none relative select-none">
    <span className="inline-block text-[10rem] leading-[0.8] font-bold">
      {text}
    </span>
    {showIndicators && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base text-red-500">
        {index}
      </span>
    )}
  </div>
);

export default WordBlock;
