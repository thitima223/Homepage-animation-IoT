import React, { useState } from 'react';
import './App.css';

{/*4 ปุ่มนอก*/}
const contentData: Record<string, { images: string[], bgColor: string }> = {
  btn1: { 
    images: ["/Home_image/image_20.png", "/Home_image/image_21.png", "/Home_image/image_22.png"],
    bgColor: "#597167"},
  btn2: { 
    images: ["/Home_image/image_23.png", "/Home_image/image_24.png", "/Home_image/image_25.png"],
    bgColor: "#51668A"},
  btn4: { 
    images: ["/Home_image/image_26.png", "/Home_image/image_27.png", "/Home_image/image_28.png"],
    bgColor: "#97799D"},
  btn5: { 
    images: ["/Home_image/image_29.png", "/Home_image/image_30.png", "/Home_image/image_31.png"],
    bgColor: "#634D2F"},
};

const buttonConfig: Record<string, { normal: string, active: string }> = {
  btn1: { normal: "/Home_image/image_32.png", active: "/Home_image/image_33.png" },
  btn2: { normal: "/Home_image/image_34.png", active: "/Home_image/image_35.png" },
  btn4: { normal: "/Home_image/image_36.png", active: "/Home_image/image_37.png" },
  btn5: { normal: "/Home_image/image_38.png", active: "/Home_image/image_39.png" },
};

const IoTLayout: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<string>('btn1');
  const currentContent = contentData[activeBtn];

  const renderNavButton = (id: string) => {
    const isActive = activeBtn === id;
    const btnImage = isActive ? buttonConfig[id].active : buttonConfig[id].normal;
    return (
      <button className={`nav-btn ${isActive ? 'active' : ''}`} onClick={() => setActiveBtn(id)}>
        <img src={btnImage} alt={`Icon ${id}`} className="btn-icon-img" />
      </button>
    );
  };

  return (
    <div className="iot-container">
      {/* ส่วนบน */}
      <div className="btn-row">
        {renderNavButton('btn1')}
        {renderNavButton('btn2')}
      </div>

      {/*ปุ่ม 3 inline style เปลี่ยนสีพื้นหลัง */}
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

      {/* ส่วนล่าง */}
      <div className="btn-row">
        {renderNavButton('btn4')}
        {renderNavButton('btn5')}
      </div>
    </div>
  );
};

export default IoTLayout;