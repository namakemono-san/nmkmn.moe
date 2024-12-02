import grid from "/blue_archive/icons/grid.svg"

export default function Header() {
    return (
        <div className="header">
            <div className="toolbox">
                <img src="/blue_archive/icons/ap.png" />
                <span>100/100</span>
            </div>
            <div className="toolbox">
                <img src="/blue_archive/icons/gold.png" />
                <span>100,000,000</span>
            </div>
            <div className="toolbox">
                <img src="/blue_archive/icons/pyroxene.png" />
                <span>1200</span>
            </div>
            <div className="menu toolbox">
                <div className="button">
                    <img src="/blue_archive/icons/pyroxene.png" />
                </div>
                <div className="line" />
                <div className="button">
                    <img src="/blue_archive/icons/pyroxene.png" />
                </div>
                <div className="line" />
                <div className="button">
                    <img src={grid} />
                </div>
            </div>
        </div>
    )
}