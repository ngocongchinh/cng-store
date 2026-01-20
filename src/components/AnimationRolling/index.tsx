import { useEffect, useState, memo } from "react";

export const TYPES_ICON = ["shoe", "dress", "ring", "bag", "lipstick", "hat"];

const AnimationRolling = memo(() => {
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const interverl = setInterval(() => {
      const type = position >= TYPES_ICON.length - 1 ? 0 : position + 1;
      setPosition(type);
    }, 1500);
    return () => {
      clearInterval(interverl);
    };
  }, [position]);

  const renderIcon = (pos: number) => {
    const type = TYPES_ICON[pos];
    switch (type) {
      case "shoe":
        return <span>👠</span>;
      case "dress":
        return <span>👗</span>;
      case "ring":
        return <span>💍</span>;
      case "bag":
        return <span>🎒</span>;
      case "lipstick":
        return <span>💄</span>;
      case "hat":
        return <span>👒</span>;
    }
  };

  return (
    <span className="relative mx-[10px] inline-block lg:-top-[10px]">
      <span className="relative inline-block overflow-hidden top-[15px] lg:top-[20px] h-[35px] lg:h-[45px] w-[20px] lg:w-[40px]">
        <span
          key={TYPES_ICON[position]}
          className={`absolute top-[-50px] left-0 animation-rolling`}
        >
          {renderIcon(position)}
        </span>
        <span
          key={TYPES_ICON[position - 1]}
          className={`absolute top-0 left-0 animation-rolling-last`}
        >
          {renderIcon(position - 1)}
        </span>
      </span>
    </span>
  );
});

AnimationRolling.displayName = "AnimationRolling";
export default AnimationRolling;
