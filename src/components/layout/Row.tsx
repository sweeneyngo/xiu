import WordBlock from "@/components/ui/WordBlock";
/**
 * Row renders a horizontal row of WordBlocks.
 * @param startIndex - The index of the first word in this row
 * @param wordsPerRow - How many words to render in this row
 * @param text - The text to render (e.g., "XIU")
 * @param showIndicators - Whether to show index indicators on each WordBlock
 */
const Row = ({
  startIndex,
  wordsPerRow,
  text,
  showIndicators,
}: {
  startIndex: bigint;
  wordsPerRow: number;
  text: string;
  showIndicators: boolean;
}) => (
  <div className="flex flex-row flex-nowrap justify-start overflow-visible whitespace-nowrap">
    {Array.from({ length: wordsPerRow }, (_, offset) => (
      <WordBlock
        key={startIndex + BigInt(offset)}
        text={text}
        index={startIndex + BigInt(offset)}
        showIndicators={showIndicators}
      />
    ))}
  </div>
);

export default Row;
