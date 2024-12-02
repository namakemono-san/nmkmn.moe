export default function Level() {
    return (
        <div className="level-box">
            <div className="container">
                <div className="level">
                    <span className="text">Lv.</span>
                    <span className="value">42</span>
                </div>
                <div className="right">
                    <span className="name">なまけもの</span>
                    <div className="progress-bar">
                        <div className="progress-filled"></div>
                    </div>
                    <p className="progress-text">577/1645</p>
                </div>
            </div>
        </div>
    )
}