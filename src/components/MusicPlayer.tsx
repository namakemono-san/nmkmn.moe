import { useState, useRef, useEffect } from "react";
import { HiPlay, HiPause, HiForward, HiBackward } from "react-icons/hi2";
import { playlist } from "../constants";

function MusicPlayer({ entered }: { entered: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const track = playlist[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !entered) return;
    audio.volume = 0.15;
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [entered]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.15;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleEnded = () => {
    setCurrentIndex((i) => (i === playlist.length - 1 ? 0 : i + 1));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? playlist.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === playlist.length - 1 ? 0 : i + 1));

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="mb-3 flex items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white/90">
            {track.title}
          </p>
          <p className="truncate text-xs text-white/50">{track.artist}</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <button
            onClick={prev}
            className="text-white/60 transition-colors hover:text-white"
          >
            <HiBackward className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105"
          >
            {isPlaying ? (
              <HiPause className="h-4 w-4" />
            ) : (
              <HiPlay className="h-4 w-4 translate-x-px" />
            )}
          </button>
          <button
            onClick={next}
            className="text-white/60 transition-colors hover:text-white"
          >
            <HiForward className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="group relative mb-1 h-1 cursor-pointer rounded-full bg-white/10"
        onClick={handleSeek}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all"
          style={{
            width: duration ? `${(progress / duration) * 100}%` : "0%",
          }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow transition-opacity opacity-0 group-hover:opacity-100"
          style={{
            left: duration ? `${(progress / duration) * 100}%` : "0%",
            marginLeft: "-6px",
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] tabular-nums text-white/40">
        <span>{fmt(progress)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

export default MusicPlayer;
