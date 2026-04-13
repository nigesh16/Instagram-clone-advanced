import { useRef, useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft, FaRegHeart, FaHeart } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import stories from "../data/stories";

function Stories() {
  const scrollRef = useRef();

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const [activeIndex, setActiveIndex] = useState(null);

  // LIKE STATE (ONLY THIS ADDED)
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    setLiked(!liked);

    // trigger animation
    setAnimate(true);
    setTimeout(() => setAnimate(false), 100);
  };

  const checkScroll = () => {
    const el = scrollRef.current;

    const isAtStart = el.scrollLeft === 0;
    const isAtEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

    setShowLeft(!isAtStart);
    setShowRight(!isAtEnd);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const openStory = (index) => setActiveIndex(index);
  const closeStory = () => setActiveIndex(null);

  const nextStory = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <>
          {/* STORIES BAR */}
          <div className="relative bg-white h-[130px] rounded-lg py-3">

            {showLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden sm:flex"
              >
                <FaChevronLeft size={14} />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {/* YOUR STORY */}
              <div className="ml-3">
                <div className="relative w-[82px] h-[82px]">
                  <img
                    src="https://randomuser.me/api/portraits/men/9.jpg"
                    className="w-full h-full rounded-full object-cover mt-2"
                  />
                  <div className="absolute bottom-0 right-0 bg-black h-[20px] w-[20px] border-2 border-white flex items-center justify-center rounded-full">
                    <span className="text-white font-bold">+</span>
                  </div>
                </div>
                <p className="text-xs mt-2 text-center">Your story</p>
              </div>

              {stories.map((story, index) => (
                <div
                  key={story.id}
                  onClick={() => openStory(index)}
                  className="flex flex-col items-center min-w-[92px] cursor-pointer"
                >
                  <div className="p-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                    <div className="bg-white p-[3px] rounded-full">
                      <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                        <img
                          src={story.profilePic}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs mt-1 w-[70px] truncate text-center">
                    {story.username}
                  </p>
                </div>
              ))}
            </div>

            {showRight && (
              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden sm:flex"
              >
                <FaChevronRight size={14} />
              </button>
            )}
          </div>

          {/* STORY VIEWER */}
          {activeIndex !== null && (
            <div className="fixed inset-0 h-[100vh] w-full bg-black bg-opacity-90 flex items-center justify-center z-50">

              {/* CLOSE */}
              <button
                onClick={closeStory}
                className="absolute top-5 right-5 text-white text-xl md:text-3xl"
              >
                ✕
              </button>

              {/* LEFT */}
              {activeIndex > 0 && (
                <button
                  onClick={prevStory}
                  className="absolute left-5 z-50  text-white text-3xl"
                >
                  ‹
                </button>
              )}

              {/* CONTENT */}
              <div className="relative w-sm h-[75%] md:h-[85vh] flex items-center justify-center">

                <img
                  src={stories[activeIndex].image}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* TOP INFO */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-white">
                  <img
                    src={stories[activeIndex].profilePic}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-semibold">
                    {stories[activeIndex].username}
                  </span>
                  <span className="text-xs opacity-70">{stories[activeIndex].hours}</span>
                </div>

                {/* BOTTOM */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                  <input
                    placeholder={`Reply to ${stories[activeIndex].username}...`}
                    className="flex-1 bg-transparent border border-white text-white px-4 py-2 rounded-full outline-none text-sm"
                  />

                  {/* Like CHANGE */}
                  {liked ? (
                    <FaHeart
                      onClick={handleLike}
                      className={`text-red-500 text-xl cursor-pointer transition-transform duration-200 ${
        animate ? "scale-[1.3]" : "scale-100"
      }`}

                    />
                  ) : (
                    <FaRegHeart
                      onClick={handleLike}
                      className={`text-white text-xl cursor-pointer transition-transform duration-200 ${
        animate ? "scale-[1.3]" : "scale-100"
      }`}
                    />
                  )}

                  <LiaTelegramPlane className="text-white text-xl cursor-pointer" />
                </div>
              </div>

              {/* RIGHT */}
              {activeIndex < stories.length - 1 && (
                <button
                  onClick={nextStory}
                  className="absolute right-5 text-white text-3xl"
                >
                  ›
                </button>
              )}
            </div>
          )}
        </>
      );
}

export default Stories;