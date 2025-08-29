import { useCallback, useEffect, useRef, useState } from "react";
import Cascade from "@/components/layout/Cascade";
import Ghost from "@/components/layout/Ghost";
import Header from "@/components/layout/Header";
import Title from "@/components/layout/Title";
import { SCROLL_EASE_FACTOR, SCROLL_THRESHOLD } from "@/utils/constants";

const App = () => {
  // Dimensions of a single WordBlock
  const [wordSize, setWordSize] = useState({ width: 0, height: 0 });

  // Number of words that fit in a single row
  const [wordsPerRow, setWordsPerRow] = useState(0);

  // Index of the first word currently displayed
  const [firstIndex, setFirstIndex] = useState(0n);

  // Pixel-level scroll offset
  const [scrollOffset, setScrollOffset] = useState(0);

  // Show indicators toggle
  const [showIndicators, setShowIndicators] = useState(false);

  // Target scroll offset, updated by scroll wheel
  const targetOffsetRef = useRef(0);

  // Ghost element to measure size
  const ghostRef = useRef<HTMLDivElement>(null);

  const scrollToNumber = useCallback(
    (n: bigint) => {
      if (wordsPerRow === 0) return;
      const row = n - (n % BigInt(wordsPerRow));
      targetOffsetRef.current = 0;
      setScrollOffset(0);
      setFirstIndex(row);
    },
    [wordsPerRow],
  );

  const scrollToTop = useCallback(() => {
    scrollToNumber(0n);
  }, [scrollToNumber]);

  /**
   * Measure the size of a single WordBlock and calculate words per row.
   * Also updates the number of words per row when window resizes.
   */
  useEffect(() => {
    const measure = () => {
      if (!ghostRef.current) return;
      const rect = ghostRef.current.getBoundingClientRect();
      setWordSize({
        width: rect.width,
        height: rect.height,
      });
      setWordsPerRow(Math.ceil(window.innerWidth / rect.width));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Only run after wordsPerRow has been measured
    if (wordsPerRow === 0) return;

    const params = new URLSearchParams(window.location.search);
    const index = params.get("n"); // e.g., ?n=123
    if (index) {
      const n = BigInt(index);
      scrollToNumber(n);
    }
  }, [wordsPerRow, scrollToNumber]);

  /**
   * Animate the scroll offset using easing.
   * Runs continuously via requestAnimationFrame.
   */
  useEffect(() => {
    const animate = () => {
      setScrollOffset((prev) => {
        const delta = (targetOffsetRef.current - prev) * SCROLL_EASE_FACTOR;
        if (Math.abs(delta) < SCROLL_THRESHOLD) return prev;
        return prev + delta;
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  /**
   * Update the firstIndex when scrollOffset exceeds row height.
   * This effectively "consumes" fully-scrolled rows and resets the partial offset.
   */
  useEffect(() => {
    const rowHeight = wordSize.height;
    if (rowHeight === 0 || wordsPerRow === 0) return;

    const fullRows = Math.floor(scrollOffset / rowHeight);
    if (fullRows !== 0) {
      setFirstIndex((prev) => {
        const next = prev + BigInt(fullRows * wordsPerRow);
        return next < 0n ? 0n : next;
      });

      setScrollOffset((prev) => prev - fullRows * rowHeight);
      targetOffsetRef.current -= fullRows * rowHeight;
    }
  }, [scrollOffset, wordsPerRow, wordSize.height]);

  if (!wordSize.width || !wordSize.height) {
    return <Ghost ref={ghostRef} />;
  }

  const rowsToRender = Math.ceil(window.innerHeight / wordSize.height) + 1;
  const partialOffset = scrollOffset % wordSize.height;

  /**
   * Handle wheel events for scrolling.
   * Updates the target scroll offset for smooth animation.
   */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetOffsetRef.current += e.deltaY;
    if (firstIndex === 0n && targetOffsetRef.current < 0) {
      targetOffsetRef.current = 0;
      setScrollOffset(0);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col">
      <Title showIndicators={showIndicators} onChange={setShowIndicators} />
      <div
        className="relative flex-1 overflow-hidden outline outline-1 outline-gray-600/40 outline-dashed"
        onWheel={handleWheel}
      >
        <Ghost ref={ghostRef} />
        <Header firstIndex={firstIndex} onClick={scrollToTop} />
        <Cascade
          firstIndex={firstIndex}
          wordsPerRow={wordsPerRow}
          rowsToRender={rowsToRender}
          partialOffset={partialOffset}
          showIndicators={showIndicators}
        />
      </div>
    </div>
  );
};

export default App;
