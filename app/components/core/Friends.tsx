const friends: {
  id: string;
  name: string;
  url: string;
  label: string;
  color: string;
}[] = [
  {
    id: "myu",
    name: "みゅー",
    url: "https://solo.to/3yu",
    label: "@3yu",
    color: "rgba(150, 255, 178, .4)",
  },
  {
    id: "teru",
    name: "てる",
    url: "https://ter3q.com/",
    label: "@ter3q",
    color: "rgba(69, 59, 92, .4)",
  },
  {
    id: "drks",
    name: "だるかす",
    url: "https://solo.to/darui3018823",
    label: "@darui3018823",
    color: "rgba(67, 151, 163, .4)",
  },
  {
    id: "nemmy",
    name: "ねみー",
    url: "https://solo.to/nmy",
    label: "@nmy",
    color: "rgba(54, 252, 121, .4)",
  },
];

const Friends = () => {
  return (
    <div className="flex-col">
      {friends.map((friend) => {
        return (
          <a
            href={friend.url}
            className="mt-2 first:mt-0 block"
            target="_blank"
            rel="noopener me"
            key={friend.id}
          >
            <div className="backdrop-blur-[2px] bg-teal-200 bg-opacity-[8%] hover:bg-opacity-10 rounded-xl flex flex-col md:flex-row overflow-hidden">
              <div
                className="text-white md:w-1/5 p-2 px-4 font-semibold"
                style={{ background: friend.color }}
              >
                {friend.name}
              </div>
              <div className="p-2 flex flex-col md:flex-row md:items-center">
                <div>
                  {friend.label.split("|").map((label) => (
                    <span key={label} className="underline text-theme">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Friends;
