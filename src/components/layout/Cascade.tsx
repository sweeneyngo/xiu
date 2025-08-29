import Row from "@/components/layout/Row";
import { TEXT } from "@/utils/constants";

const Cascade = ({
  firstIndex,
  wordsPerRow,
  rowsToRender,
  partialOffset,
  showIndicators,
}: {
  firstIndex: bigint;
  wordsPerRow: number;
  rowsToRender: number;
  partialOffset: number;
  showIndicators: boolean;
}) => {
  return (
    <div
      className="relative inline-block align-top"
      style={{ transform: `translateY(${-partialOffset}px)` }}
    >
      {Array.from({ length: rowsToRender }, (_, rowIdx) => (
        <Row
          key={rowIdx}
          startIndex={firstIndex + BigInt(rowIdx * wordsPerRow)}
          wordsPerRow={wordsPerRow}
          text={TEXT}
          showIndicators={showIndicators}
        />
      ))}
    </div>
  );
};

export default Cascade;
