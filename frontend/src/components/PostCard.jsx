import { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { SlOptions } from "react-icons/sl";
import { BsDot } from "react-icons/bs";

function PostCard({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);

  // Only for heart toggle
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    setLiked(prev => !prev);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 100);
  };

  const MAX_LENGTH = 60;

  const isLong = post.caption.length > MAX_LENGTH;
  const displayedText = isExpanded
    ? post.caption
    : post.caption.slice(0, MAX_LENGTH);

  // ⏱ Time formatter
  function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return "Just now";
    if (diff < 3600) return Math.floor(diff / 60) + "m";
    if (diff < 86400) return Math.floor(diff / 3600) + "h";
    if (diff < 604800) return Math.floor(diff / 86400) + "d";
    if (diff < 2592000) return Math.floor(diff / 604800) + "w";

    return Math.floor(diff / 2592000) + "mo";
  }

  return (
    <div className="bg-white rounded-lg">

      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.profilePic}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div>
            <p className="font-semibold text-sm cursor-pointer">
              {post.username}
              <span className="text-[14px] text-gray-500 font-normal">
                {" "}
                <BsDot size={20} className="inline" />
                {formatTime(post.createdAt)}
              </span>
            </p>
            <p className="text-[12px] text-gray-900">
              {!isFollowing && "Suggested for you"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 ">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`text-sm font-semibold ${
              isFollowing ? "hidden" : "text-blue-600"
            }`}
          >
            Follow
          </button>
          <SlOptions className="mt-1 cursor-pointer" />
        </div>
      </div>

      {/* Image */}
      <img
        src={post.image}
        className="w-full h-[300px] object-cover rounded mb-1"
      />

      {/* Actions */}
      <div className="flex items-center gap-4 px-3 py-2 ">
        
        {/* LIKE BUTTON */}
        <div>
          {liked ? (
            <FaHeart
              size={23}
              onClick={handleLike}
              className={`inline mr-2 cursor-pointer text-red-500 hover:scale-110 transition-transform duration-200 ${
                animate ? "scale-[1.2]" : "scale-100"
              }`}
            />
          ) : (
            <FaRegHeart
              size={23}
              onClick={handleLike}
              className={`inline mr-2 cursor-pointer hover:scale-110 transition-transform duration-200 ${
                animate ? "scale-[1.2]" : "scale-100"
              }`}
            />
          )}

          {/* count stays same */}
          <span className="text-sm font-semibold">{post.likes}</span>
        </div>

        {/* COMMENTS */}
        <div>
          <FaRegComment
            size={23}
            className="inline mr-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          />
          <span className="text-sm font-semibold">{post.comments}</span>
        </div>

        {/* SHARE */}
        <LiaTelegramPlane
          size={26}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Caption */}
      <p className="px-3 text-sm">
        <span className="font-semibold">{post.username}</span>{" "}
        {displayedText}

        {isLong && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 cursor-pointer ml-1"
          >
            {isExpanded ? " less" : "...more"}
          </span>
        )}
      </p>
    </div>
  );
}

export default PostCard;