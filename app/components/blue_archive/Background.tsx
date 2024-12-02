import React, { useEffect, useState } from "react";
import { Spine } from "pixi-spine";
import { Application, Assets } from "pixi.js";

import ShirokoRidingSuit from "/blue_archive/live2d/shiroko/Shiroko_ridingsuit_home.skel?url";

const Background: React.FC = () => {
    const [animation, setAnimation] = useState<Spine | null>(null);

    useEffect(() => {
        const app = new Application<HTMLCanvasElement>({
            width: 2560,
            height: 1440,
            backgroundAlpha: 0,
        });

        document.querySelector("#background")?.appendChild(app.view);

        const loadAnimation = async () => {
            if (animation) app.stage.removeChild(animation);

            const assets = await Assets.load(ShirokoRidingSuit);
            const newAnimation = new Spine(assets.spineData);

            if (newAnimation.state.hasAnimation("Idle_01")) {
                newAnimation.scale.set(0.85);
                newAnimation.state.setAnimation(0, "Idle_01", true);
                newAnimation.state.timeScale = 1;
                newAnimation.autoUpdate = true;
                newAnimation.position.set(2560 / 2, 1440);
            }

            app.stage?.addChild(newAnimation);

            setAnimation(newAnimation);
        };

        loadAnimation();

        return () => app.destroy(true, true);
    }, []);

    return <></>;
};

export default Background;
