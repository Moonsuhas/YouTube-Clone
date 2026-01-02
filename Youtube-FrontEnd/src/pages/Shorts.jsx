/**
 * Shorts Component
 * ----------------------------------------------------------
 * Displays a grid of placeholder "Shorts" videos.
 * Each video is represented as a black box with text.
 * Responsive layout adjusts based on screen size:
 *   - 1 column on mobile
 *   - 2 columns on small screens
 *   - 3 columns on medium and larger screens
 */
const Shorts = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[1,2,3,4,5,6].map((s) => (
        <div
          key={s}
          className="h-[400px] bg-black text-white flex items-center justify-center rounded-xl"
        >
          Shorts Video {s}
        </div>
      ))}
    </div>
  );
};
export default Shorts;
