import React, { useState } from 'react';
import './IoTLayout.css';

const contentData: Record<string, { images: string[], bgColor: string }> = {
    btn1: {
        images: ["/Home_image/image_20.png", "/Home_image/image_21.png", "/Home_image/image_22.png"],
        bgColor: "#597167"
    },
    btn2: {
        images: ["/Home_image/image_23.png", "/Home_image/image_24.png", "/Home_image/image_25.png"],
        bgColor: "#51668A"
    },
    btn4: {
        images: ["/Home_image/image_26.png", "/Home_image/image_27.png", "/Home_image/image_28.png"],
        bgColor: "#97799D"
    },
    btn5: {
        images: ["/Home_image/image_29.png", "/Home_image/image_30.png", "/Home_image/image_31.png"],
        bgColor: "#634D2F"
    },
};

const buttonConfig: Record<string, { normal: string, active: string }> = {
    btn1: { normal: "/Home_image/image_32.png", active: "/Home_image/image_33.png" },
    btn2: { normal: "/Home_image/image_34.png", active: "/Home_image/image_35.png" },
    btn4: { normal: "/Home_image/image_36.png", active: "/Home_image/image_37.png" },
    btn5: { normal: "/Home_image/image_38.png", active: "/Home_image/image_39.png" },
};

const IoTLayout: React.FC = () => {
    const [selectedBtn, setSelectedBtn] = useState<string>('btn1');
    const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

    const activeBtn = hoveredBtn || selectedBtn;
    const currentContent = contentData[activeBtn];

    const renderNavButton = (id: string) => {
        const isSelected = selectedBtn === id;
        const isHovered = hoveredBtn === id;
        const btnImage = (isSelected || isHovered) ? buttonConfig[id].active : buttonConfig[id].normal;
        return (
            <button
                className={`iot-nav-btn ${isSelected ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    if (selectedBtn !== id) setSelectedBtn(id);
                }}
                onMouseEnter={() => {
                    if (hoveredBtn !== id) setHoveredBtn(id);
                }}
                onMouseLeave={() => {
                    if (hoveredBtn === id) setHoveredBtn(null);
                }}
                onFocus={() => {
                    if (hoveredBtn !== id) setHoveredBtn(id);
                }}
                onBlur={() => {
                    if (hoveredBtn === id) setHoveredBtn(null);
                }}
            >
                <div className="iot-nav-inner">
                    <img src={btnImage} alt={`Icon ${id}`} className="btn-icon-img" />
                </div>
            </button>
        );
    };

    return (
        <div className="iot-container">
            <div className="btn-row">
                {renderNavButton('btn1')}
                {renderNavButton('btn2')}
            </div>

            <div className="display-panel" style={{ backgroundColor: currentContent.bgColor }}>
                <div className="panel-inner">
                    <div className="main-view">
                        <img key={`m-${activeBtn}`} src={currentContent.images[0]} className="fade-in" alt="Main" />
                    </div>
                    <div className="side-view">
                        <div className="sub-box">
                            <img key={`s1-${activeBtn}`} src={currentContent.images[1]} className="fade-in" alt="Sub 1" />
                        </div>
                        <div className="sub-box">
                            <img key={`s2-${activeBtn}`} src={currentContent.images[2]} className="fade-in" alt="Sub 2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn-row">
                {renderNavButton('btn4')}
                {renderNavButton('btn5')}
            </div>
        </div>
    );
};

export default IoTLayout;
