import { ChevronUp } from "@/components/ui/Icons";

const Header = ({
  firstIndex,
  onClick,
}: {
  firstIndex: bigint;
  onClick: () => void;
}) => {
  const formatIndex = (index: bigint, length = 9) => {
    const str = index.toString();
    const zeros = "0".repeat(Math.max(length - str.length, 0));
    return { zeros, digits: str };
  };

  // In JSX
  const { zeros, digits } = formatIndex(firstIndex);

  return (
    <div className="gap absolute top-5 right-5 z-1 flex">
      <div className="group pointer-events-auto relative inline-block select-none">
        <div className="rounded-lg bg-neutral-100 px-4 py-1 font-medium text-gray-600 shadow-sm outline outline-black/5">
          <p className="flex font-mono">
            <span className="text-gray-400">{zeros}</span>
            <span className="text-gray-800">{digits}</span>
          </p>
        </div>
        <div className="absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
          Starting index
        </div>
      </div>
      <button
        onClick={onClick}
        className="pointer-events-auto flex h-auto w-10 cursor-pointer items-center justify-center rounded-lg bg-amber-300 p-1 text-amber-900 shadow-sm outline outline-black/5 hover:bg-amber-400 active:bg-red-400"
      >
        <ChevronUp />
      </button>
    </div>
  );
};

export default Header;
