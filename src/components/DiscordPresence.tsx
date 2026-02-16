import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa6";
import { useLanyard } from "../hooks/useLanyard";
import type { LanyardActivity, LanyardSpotify } from "../hooks/useLanyard";
import {
  DISCORD_USER_ID,
  statusColors,
  statusLabels,
  activityTypeLabels,
} from "../constants";

function getActivityAssetUrl(
  activity: LanyardActivity,
  key: "large_image" | "small_image"
): string | null {
  const raw = activity.assets?.[key];
  if (!raw) return null;
  if (raw.startsWith("mp:external/")) {
    return `https://media.discordapp.net/external/${raw.replace("mp:external/", "")}`;
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${raw}.png`;
  }
  return null;
}

function formatElapsed(startMs: number): string {
  const diff = Math.floor((Date.now() - startMs) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} elapsed`;
  return `${m}:${s.toString().padStart(2, "0")} elapsed`;
}

function ActivityCard({ activity }: { activity: LanyardActivity }) {
  const [, setTick] = useState(0);
  const hasTimestamp = !!activity.timestamps?.start;

  useEffect(() => {
    if (!hasTimestamp) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [hasTimestamp]);

  const largeImg = getActivityAssetUrl(activity, "large_image");
  const smallImg = getActivityAssetUrl(activity, "small_image");
  const typeLabel = activityTypeLabels[activity.type] ?? "Playing";

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="mb-2 text-[11px] font-bold uppercase text-white/50">
        {typeLabel} {activity.type !== 0 ? activity.name : ""}
      </p>
      <div className="flex gap-3">
        {largeImg && (
          <div className="relative shrink-0">
            <img
              src={largeImg}
              alt={activity.assets?.large_text ?? activity.name}
              className="h-16 w-16 rounded-lg"
            />
            {smallImg && (
              <img
                src={smallImg}
                alt={activity.assets?.small_text ?? ""}
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white/10"
              />
            )}
          </div>
        )}
        <div className="flex min-w-0 flex-col justify-center">
          {activity.type === 0 && (
            <p className="truncate text-sm font-semibold text-white">
              {activity.name}
            </p>
          )}
          {activity.details && (
            <p className="truncate text-xs text-white/70">{activity.details}</p>
          )}
          {activity.state && (
            <p className="truncate text-xs text-white/50">{activity.state}</p>
          )}
          {activity.timestamps?.start && (
            <p className="mt-0.5 text-[11px] text-white/40">
              {formatElapsed(activity.timestamps.start)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SpotifyCard({ spotify }: { spotify: LanyardSpotify }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.max(0, now - spotify.timestamps.start);
  const total = spotify.timestamps.end - spotify.timestamps.start;
  const pct = total > 0 ? Math.min((elapsed / total) * 100, 100) : 0;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="mb-2 text-[11px] font-bold uppercase text-green-400">
        Listening to Spotify
      </p>
      <div className="flex gap-3">
        <img
          src={spotify.album_art_url}
          alt={spotify.album}
          className="h-16 w-16 shrink-0 rounded-lg"
        />
        <div className="flex min-w-0 flex-col justify-center">
          <p className="truncate text-sm font-semibold text-white">
            {spotify.song}
          </p>
          <p className="truncate text-xs text-white/70">by {spotify.artist}</p>
          <p className="truncate text-xs text-white/50">on {spotify.album}</p>
        </div>
      </div>
      <div className="mt-2.5">
        <div className="h-1 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-pink-400 to-indigo-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-0.5 flex justify-between text-[10px] tabular-nums text-white/40">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}

function DiscordPresence() {
  const lanyard = useLanyard(DISCORD_USER_ID);

  if (!lanyard) {
    return (
      <div className="flex items-center gap-3">
        <FaDiscord className="h-5 w-5 text-[#5865F2]" />
        <p className="text-xs text-white/40">Connecting...</p>
      </div>
    );
  }

  const {
    discord_user,
    discord_status,
    activities,
    spotify,
    listening_to_spotify,
  } = lanyard;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=80`;
  const displayName = discord_user.global_name || discord_user.username;
  const gameActivities = activities.filter(
    (a) => a.type !== 2 && a.type !== 4
  );

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-10 w-10 rounded-full"
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-white/5 ${statusColors[discord_status]}`}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white/90">
            {displayName}
          </p>
          <p className="text-xs text-white/40">
            {statusLabels[discord_status]}
          </p>
        </div>
        <FaDiscord className="ml-auto h-5 w-5 shrink-0 text-[#5865F2]/60" />
      </div>

      <div className="flex flex-col gap-2">
        {listening_to_spotify && spotify && <SpotifyCard spotify={spotify} />}
        {gameActivities.map((activity, i) => (
          <ActivityCard key={i} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default DiscordPresence;
