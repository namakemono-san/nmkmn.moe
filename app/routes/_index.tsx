import { Link } from "@remix-run/react";

import { useEffect, useState } from "react";

import { IconType } from "react-icons";
import { BsBadgeVr } from "react-icons/bs";
import { LuSquareDot } from "react-icons/lu";
import { MdLink } from "react-icons/md";
import {
  SiDiscord,
  SiGithub,
  SiMisskey,
  SiOsu,
  SiSteam,
  SiTwitch,
  SiX,
  SiYoutube,
} from "react-icons/si";

import { TbSquareChevronDown } from "react-icons/tb";
import "swiper/css";
import "swiper/css/effect-fade";
import "../css/index.css";

import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SocialLink {
  name: string;
  user_id: string;
  url: string;
  icon: IconType | null;
  color: string;
}

interface Activity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    small_image?: string;
  };
  application_id?: string;
}

interface DiscordData {
  discord_user: {
    display_name: string;
  };
  discord_status: keyof typeof StatusColor;
  activities: Activity[];
}

const ActivityType = [
  " Playing ",
  " Streaming to ",
  " Listening to ",
  " Watching ",
  " Custom status ",
  " Competing in ",
] as const;

const StatusColor = {
  online: "#4b8",
  idle: "#fa1",
  dnd: "#f44",
  offline: "#778",
} as const;

const social_links: SocialLink[] = [
  {
    name: "YouTube",
    user_id: "namakemono_san",
    url: "https://www.youtube.com/@namakemono_san",
    icon: SiYoutube,
    color: "#f00",
  },
  {
    name: "Twitch",
    user_id: "namakemono_san",
    url: "https://www.twitch.tv/namakemono_san",
    icon: SiTwitch,
    color: "#a970ff",
  },
  {
    name: "GitHub",
    user_id: "namakemono-san",
    url: "https://github.com/namakemono-san",
    icon: SiGithub,
    color: "#000",
  },
  {
    name: "X",
    user_id: "nmkmn_moe",
    url: "https://x.com/nmkmn_moe",
    icon: SiX,
    color: "#000",
  },
  {
    name: "Misskey",
    user_id: "namakemono_san",
    url: "https://misskey.io/@namakemono_san",
    icon: SiMisskey,
    color: "#b4e900",
  },
  {
    name: "Discord",
    user_id: "nmkmn.moe",
    url: "https://discord.com/users/641555810325102593",
    icon: SiDiscord,
    color: "#56f",
  },
  {
    name: "Steam",
    user_id: "namakemono_san",
    url: "https://steamcommunity.com/id/namakemono_san/",
    icon: SiSteam,
    color: "#171d25",
  },
  {
    name: "osu!",
    user_id: "namakemono_san",
    url: "https://osu.ppy.sh/u/namakemono_san",
    icon: SiOsu,
    color: "#f6a",
  },
  {
    name: "BeatLeader",
    user_id: "namakemono_san",
    url: "https://beatleader.xyz/u/namakemono_san/",
    icon: LuSquareDot,
    color: "#1a1a1a",
  },
  {
    name: "ScoreSaber",
    user_id: "なまけもの",
    url: "https://scoresaber.com/u/76561199195728244",
    icon: TbSquareChevronDown,
    color: "#ffde18",
  },
  {
    name: "VRChat",
    user_id: "なまけものだよ",
    url: "https://vrchat.com/home/user/usr_7db411b6-f45d-4cdf-976f-7ab010a8ccaf",
    icon: BsBadgeVr,
    color: "#07242b",
  },
  {
    name: "みゅー (myu)",
    user_id: "3yu",
    url: "https://solo.to/3yu",
    icon: MdLink,
    color: "#1f70ff",
  },
];

export default function Index() {
  const [name, setName] = useState<string>("");
  const [dotColor, setDotColor] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [largeImage, setLargeImage] = useState<string>("");
  const [smallImage, setSmallImage] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [timestampRaw, setTimestampRaw] = useState<number | null>();
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    connectWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timestamp) {
        setTimestamp(formatTimestamp(timestampRaw));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timestamp, timestampRaw]);

  const capitalize = function (value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  function connectWebSocket() {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.addEventListener("open", () =>
      ws.send(
        JSON.stringify({ op: 2, d: { subscribe_to_id: "641555810325102593" } })
      )
    );

    ws.addEventListener("error", () => ws.close());
    ws.addEventListener("close", () =>
      setTimeout(() => connectWebSocket(), 1000)
    );

    ws.addEventListener("message", ({ data }) => {
      const { t, d }: { t: string; d: DiscordData } = JSON.parse(data);
      if (t !== "INIT_STATE" && t !== "PRESENCE_UPDATE") return;

      setName(d.discord_user.display_name);
      setDotColor(StatusColor[d.discord_status]);

      const activities = d.activities.filter((a) => a.type !== 4);
      if (activities.length === 0) {
        setStatus("  " + capitalize(d.discord_status));
        setLargeImage("");
        setSmallImage("");
        setActivity("");
        setDetails("");
        setState("");
        setTimestamp("");
        return;
      }

      const activity = activities[0];
      setStatus(ActivityType[activity.type]);
      setActivity(activity.name);
      setDetails(activity.details || "");
      setState(activity.state || "");

      const largeImageUrl = getImageUrl(
        activity.assets?.large_image,
        activity.application_id,
        "large_image"
      );
      const smallImageUrl = getImageUrl(
        activity.assets?.small_image,
        activity.application_id,
        "small_image"
      );
      setLargeImage(largeImageUrl);
      setSmallImage(smallImageUrl);

      const newTimestamp =
        activity.timestamps?.end || activity.timestamps?.start || null;
      setTimestamp(formatTimestamp(newTimestamp));
      setTimestampRaw(newTimestamp);
    });
  }

  function getImageUrl(
    image: string | undefined,
    applicationId: string | undefined,
    size: "large_image" | "small_image"
  ): string {
    if (!image) return "";
    const sizeValue = size === "large_image" ? 96 : 40;
    return image.startsWith("mp:")
      ? `url(https://media.discordapp.net/${image.slice(
          3
        )}?width=${sizeValue}&height=${sizeValue})`
      : image.startsWith("spotify:")
      ? `url(https://i.scdn.co/image/${image.slice(8)})`
      : `url(https://cdn.discordapp.com/app-assets/${applicationId}/${image}.png?size=${sizeValue})`;
  }

  function formatTimestamp(timestamp: number | null | undefined): string {
    if (!timestamp) return "";
    const diff = Math.abs(timestamp - Date.now());
    const hour = Math.floor(diff / 1000 / 60 / 60);
    const minute = Math.floor(diff / 1000 / 60) % 60;
    const second = Math.floor(diff / 1000) % 60;
    const format = (n: number) => n.toString().padStart(2, "0");
    return `${hour ? `${format(hour)}:` : ""}${format(minute)}:${format(
      second
    )} ${timestamp > Date.now() ? "left" : "elapsed"}`;
  }

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        speed={2000}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        effect={"fade"}
        modules={[Autoplay, EffectFade]}
      >
        <SwiperSlide>
          <img src="/images/bg_1.png" alt="bg-1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/bg_2.png" alt="bg-2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/bg_3.png" alt="bg-3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/bg_4.png" alt="bg-4" />
        </SwiperSlide>
      </Swiper>
      <div className="main">
        <main>
          {social_links.map((link: SocialLink) => (
            <div className="widget" key={link.name}>
              <Link to={link.url} target="_blank" rel="noreferrer">
                <div className="content">
                  <div
                    className="icon"
                    style={{ backgroundColor: link.color, color: "#fff" }}
                  >
                    {link.icon && <link.icon />}
                  </div>
                  <div className="meta">
                    <b>{link.name}</b>
                    <p>{link.user_id}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <div
            className="widget js"
            style={{ "--columns": "4", height: "178px" } as React.CSSProperties}
          >
            <div id="discord">
              <div className="content">
                <div className="icon">
                  <img
                    src="/images/avatar.webp"
                    alt="avatar"
                    draggable="false"
                  />
                </div>
                <div className="meta">
                  <b id="name">{name}</b>
                  <p>
                    <span id="dot" style={{ backgroundColor: dotColor }}></span>
                    <span id="status">{status}</span>
                    <b id="activity">{activity}</b>
                  </p>
                </div>
              </div>
              <div className="rpc">
                <div>
                  <div
                    id="large_image"
                    style={{ "--image": largeImage } as React.CSSProperties}
                  ></div>
                  <div
                    id="small_image"
                    style={{ "--image": smallImage } as React.CSSProperties}
                  ></div>
                </div>
                <div className="meta">
                  <div id="details">{details}</div>
                  <div id="state">{state}</div>
                  {timestamp && <div id="timestamp">{timestamp}</div>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
