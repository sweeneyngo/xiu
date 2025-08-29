import { forwardRef } from "react";
import WordBlock from "@/components/ui/WordBlock";
import { TEXT } from "@/utils/constants";

const Ghost = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none invisible absolute top-0 left-0"
    >
      <WordBlock text={TEXT} index={0n} />
    </div>
  );
});

export default Ghost;
