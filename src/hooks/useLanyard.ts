import { useState, useEffect } from "react";

export interface LanyardActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start?: number; end?: number };
  application_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardSpotify {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    global_name: string | null;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  spotify: LanyardSpotify | null;
  listening_to_spotify: boolean;
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeat: ReturnType<typeof setInterval>;

    function connect() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.op === 1) {
          heartbeat = setInterval(() => {
            ws.readyState === WebSocket.OPEN &&
              ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);

          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: userId },
            })
          );
        }

        if (
          msg.op === 0 &&
          (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")
        ) {
          setData(msg.d as LanyardData);
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      clearInterval(heartbeat);
      ws?.close();
    };
  }, [userId]);

  return data;
}
