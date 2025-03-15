import { IconType } from "react-icons";

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

const accounts: {
  id: string;
  name: string;
  url: string;
  label: string;
  icon: IconType;
  color: string;
}[] = [
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@nmkmn_moe",
    label: "@nmkmn_moe",
    icon: SiYoutube,
    color: "rgba(255, 0, 0, .4)",
  },
  {
    id: "twitch",
    name: "Twitch",
    url: "https://www.twitch.tv/namakemono_san",
    label: "/namakemono_san",
    icon: SiTwitch,
    color: "rgba(169, 112, 255, .4)",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://x.com/nmkmn_moe",
    label: "@nmkmn_moe",
    icon: SiX,
    color: "rgba(0, 0, 0, .6)",
  },
  {
    id: "misskey",
    name: "Misskey",
    url: "https://misskey.io/@namakemono_san",
    label: "@namakemono_san",
    icon: SiMisskey,
    color: "rgba(180, 233, 0, .4)",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/namakemono-san",
    label: "/namakemono-san",
    icon: SiGithub,
    color: "rgba(0, 0, 0, .6)",
  },
  {
    id: "steam",
    name: "Steam",
    url: "https://steamcommunity.com/id/namakemono_san",
    label: "|/id|/namakemono_san",
    icon: SiSteam,
    color: "rgba(23, 29, 37, .8)",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com/users/686547120534454315",
    label: "@nmkmn.moe",
    icon: SiDiscord,
    color: "rgba(85, 102, 255, .6)",
  },
  {
    id: "osu",
    name: "osu!",
    url: "https://osu.ppy.sh/users/21719026",
    label: "|/users|/21719026",
    icon: SiOsu,
    color: "rgba(255, 102, 170, .6)",
  },
  {
    id: "beatleader",
    name: "BeatLeader",
    url: "https://beatleader.xyz/u/namakemono_san",
    label: "|/u|/namakemono_san",
    icon: SiGithub,
    color: "rgba(26, 26, 26, .6)",
  },
  {
    id: "scoresaber",
    name: "ScoreSaber",
    url: "https://scoresaber.com/u/76561199195728244",
    label: "|/u|/76561199195728244",
    icon: SiGithub,
    color: "rgba(255, 222, 24, .6)",
  },
  {
    id: "vrchat",
    name: "VRChat",
    url: "https://vrchat.com/home/user/usr_7db411b6-f45d-4cdf-976f-7ab010a8ccaf",
    label: "|/home/user|/usr_7db411b6-f45d-4cdf-976f-7ab010a8ccaf",
    icon: SiGithub,
    color: "rgba(7, 36, 43, .6)",
  },
];

const Accounts = () => {
  return (
    <div className="flex-col">
      {accounts.map((account) => (
        <a
          href={account.url}
          className="mt-2 first:mt-0 block"
          target="_blank"
          rel="noopener me"
          key={account.id}
        >
          <div className="backdrop-blur-[2px] bg-teal-200 bg-opacity-[8%] hover:bg-opacity-10 rounded-xl flex flex-col md:flex-row overflow-hidden">
            <div
              className="text-white md:w-1/5 p-2 px-4 font-semibold"
              style={{ background: account.color }}
            >
              {account.name}
            </div>
            <div className="p-2 flex flex-col md:flex-row md:items-center">
              <div>
                {account.label.split("|").map((label) => (
                  <span key={label} className="underline text-theme">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Accounts;
