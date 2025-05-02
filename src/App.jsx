import { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state for pause/resume
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev); // Toggle pause/resume
  };

  

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-6">01_Stopwatch</h2>
      <div className="flex space-x-2 text-3xl font-mono bg-gray-800 p-4 rounded-lg shadow-lg">
        <span className="px-2 py-1 rounded bg-gray-700">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
        </span>
        <span className="px-2 py-1 rounded bg-gray-700">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <span className="px-2 py-1 rounded bg-gray-700">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div className="mt-6 space-x-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition"
        >
          Reset
        </button>
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePauseResume}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        
      </div>
    </div>
  );
}

export default App;
