import { XIUXIU_URL } from "@/utils/constants";
import { Code, Info } from "@/components/ui/Icons";
const Title = ({
  showIndicators,
  onChange,
}: {
  showIndicators: boolean;
  onChange: (newValue: boolean) => void;
}) => (
  <div className="z-10 flex items-start justify-between p-4">
    <div>
      <h1 className="text-xl font-bold">xiu</h1>
      <p className="max-w-60 text-gray-600 sm:max-w-none">
        Black hair, infinite —{" "}
        <a
          href={XIUXIU_URL}
          className="underline hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Xiu Xiu
        </a>
        .
      </p>
    </div>
    <div className="flex flex-col gap-2 text-right">
      <label className="flex flex-col items-end gap-2 font-medium text-gray-700 sm:flex-row sm:items-center">
        <input
          type="checkbox"
          checked={showIndicators}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        Show indicators?
      </label>
      <div className="flex justify-end gap-2 text-gray-600">
        <a
          href="https://github.com/sweeneyngo/xiu/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-gray-800"
          title="View code"
        >
          <Code />
        </a>

        <a
          href="https://ifuxyl.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-gray-800"
          title="More info"
        >
          <Info />
        </a>
      </div>
    </div>
  </div>
);

export default Title;
