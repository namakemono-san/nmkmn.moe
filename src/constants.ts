import {
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaDiscord,
  FaSteam,
  FaEnvelope,
} from "react-icons/fa6";
import { SiOsu } from "react-icons/si";

export const DISCORD_USER_ID = "641555810325102593";
export const AVATAR_URL = "/avatar.png";
export const BANNER_URL = "/banner.png";
export const SITE_TITLE = "Ciallo～(∠・ω< )⌒☆";
export const BG_IMAGES = ["/bg/1.png", "/bg/2.png", "/bg/3.png", "/bg/4.png"];
export const BG_DURATION = 24;

export const TYPING_WORDS = [
  "Full Stack Developer",
  "High School Student",

];

export const socials = [
  { label: "X", url: "https://x.com/nmkmn_moe", icon: FaXTwitter },
  { label: "GitHub", url: "https://github.com/namakemono-san", icon: FaGithub },
  { label: "YouTube", url: "https://www.youtube.com/@nmkmn_moe", icon: FaYoutube },
  { label: "Discord", url: "https://discord.com/users/641555810325102593", icon: FaDiscord },
  { label: "Steam", url: "https://steamcommunity.com/id/namakemono_san", icon: FaSteam },
  { label: "osu!", url: "https://osu.ppy.sh/users/21719026", icon: SiOsu },
  { label: "Mail", url: "mailto:contact@nmkmn.moe", icon: FaEnvelope },
];

export interface SubLink {
  label: string;
  url: string;
}

export const subLinks: SubLink[] = [
  { label: "みゅー (3yu)", url: "https://e-z.bio/3yu" },
  { label: "てる (ter3q)", url: "https://ter3q.com/" },
  { label: "だるかす (darui3018823)", url: "https://solo.to/darui3018823" },
  { label: "ねみー (nmy)", url: "https://solo.to/nmy" },
];

export interface Track {
  title: string;
  artist: string;
  src: string;
}

export const playlist: Track[] = [
  { title: "wwss @f [flip]", artist: "f", src: "/music/track_2.mp3" },
  { title: "monitoring 【lynU bootleg】", artist: "lynU", src: "/music/track_1.mp3" },
  { title: "allnight flipers on Summer end", artist: "allnight flipers", src: "/music/track_3.mp3" },
  { title: "LUV of Despair ｡･ﾟ･(ﾉД`)･ﾟ･｡ (we love to hug u VIP)", artist: "ric3show3r, Pvin Connect Reason, u_ni", src : "/music/track_4.mp3" },
  { title: "Kotoha - 雪は何色 (Sana Logic Bootleg)", artist: "Sana Logic", src: "/music/track_5.mp3" },
];

export const statusColors: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

export const statusLabels: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

export const activityTypeLabels: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  5: "Competing in",
};

export interface Project {
  name: string;
  repo: string;
  url?: string;
  blog?: string;
  video?: string;
}

export const projects: Project[] = [
  {
    name: "nmkmn.moe",
    repo: "namakemono-san/nmkmn.moe",
    url: "https://nmkmn.moe",
  },
  {
    name: "osu! mapping utility",
    repo: "namakemono-san/osu-mapping-utility",
  },
  {
    name: "osu-mirror-rs",
    repo: "namakemono-san/osu-mirror-rs",
  },
  {
    name: "YMM-RPC",
    repo: "namakemono-san/YMM-RPC",
  },
  {
    name: "YMM4-CloudSync",
    repo: "namakemono-san/YMM4-CloudSync",
  },
  {
    name: "TaikoStar",
    repo: "namakemono-san/TaikoStar",
  },
];
