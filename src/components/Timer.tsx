/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface TimerCountdownProps {
  targetTime: Date | any;
  onEnd: () => void;

  style?: string;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  targetTime,
  onEnd,

  style = "bg-[#D91B21]/30 border-[#D91B21]",
}) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = new Date(targetTime).getTime() - now.getTime();

      if (difference <= 0) {
        setMinutes(0);
        setSeconds(0);
        setIsTimeUp(true);
        onEnd();
        clearInterval(intervalId); // Clear interval to prevent multiple calls
      } else {
        const minutesLeft = Math.floor(difference / 1000 / 60);
        const secondsLeft = Math.floor((difference / 1000) % 60);

        setMinutes(minutesLeft);
        setSeconds(secondsLeft);
      }
    };

    updateTimer(); // Initial call to set the initial values
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [targetTime, onEnd]);

  return (
    <div className="flex justify-end mt-2" title="Submission DeadLine">
      {isTimeUp ? (
        <p>Time&apos;s up!</p>
      ) : (
        <p
          className={`px-4 py-2 rounded-full  border ${style}  text-white text-[10px]`}
        >
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export default TimerCountdown;
