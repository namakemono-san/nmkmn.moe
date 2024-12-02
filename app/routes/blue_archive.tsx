import "../css/blue_archive.css";

import Level from "~/components/blue_archive/Level";
import Background from "~/components/blue_archive/Background";
import ToolBox from "~/components/blue_archive/ToolBox";

export default function BlueArchive() {
    return (
        <main>
            <div id="background"></div>
            <Level />
            <Background />
            <ToolBox />
        </main>
    );
};
