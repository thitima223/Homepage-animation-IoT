import { useState } from 'react';
import './App.css';

const cardData = [
  {
    id: 1,
    tag: 'CNC',
    title: 'CNC LASER ETCHING & ENGRAVING ',
    desc: 'พัฒนาเครื่อง CNC Laser Etching & Engraving Machine ที่มีความแม่นยํา เพื่อแกปัญหาหลักของการผลิตแผงวงจรพิมพ์ (PCB) แบบดั้งเดิม',
    author: 'Project team skenn',
    role: 'PhysIoT',
    img: '/Home_image/image_14.png',
    avatar: '/Home_image/image_15.png'
  },
  {
    id: 2,
    tag: 'Game',
    title: 'Prototype Game Console Controlled by Pedal Interfaces',
    desc: 'รูปแบบการโต้ตอบใหม่ผ่านอุปกรณ์ แป้นเหยียบ (Foot Pedal) และ Rotary Sensor  ที่เชื่อมต่อกับ Raspberry Pi 4 เพื่อสำรวจพลวัต ระหว่าง  “จิตใจ” และ “สมอง”',
    author: 'Project quepern family',
    role: 'PhysIoT',
    img: '/Home_image/image_16.png',
    avatar: '/Home_image/image_17.png'
  },
  {
    id: 3,
    tag: 'Robot',
    title: 'หุ่นยนต์อัตโนมัติด้วย ROS2 และ 3D LiDAR',
    desc: 'ROS2 ร่วมกับ Cartographer สำหรับทำแผนที่(SLAM)ด้วย 3D LiDARได้ข้อมูลสภาพแวดล้อมใช้ Navigation2 NAV2 วางแผนเส้นทางและควบคุม',
    author: 'Project team ranger',
    role: 'PhysIoT',
    img: '/Home_image/image_18.png',
    avatar: '/Home_image/image_19.png'
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < cardData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const current = cardData[currentIndex];

  return (
    <section className="full-page slider-section">
      <div className="slider-container-wrapper">
        <div className="slider-main-content">
          
          {/*ลูกศรซ้าย*/}
          <div className="nav-btn-container">
            {currentIndex > 0 && (
              <button className="slider-arrow-btn" onClick={prevSlide}>&#10094;</button>
            )}
          </div>

          {/*ตัวการ์ด*/}
          <div className="slider-card">
            <div className="slider-image-box">
              <span className="slider-tag">{current.tag}</span>
              <img src={current.img} alt={current.title} />
            </div>
            <div className="slider-info">
              <h2>{current.title}</h2>
              <p>{current.desc}</p>
              <div className="slider-footer">
                <div className="slider-user">
                  <img src={current.avatar} alt="avatar" />
                  <div className="slider-user-text">
                    <strong>{current.author}</strong>
                    <span>{current.role}</span>
                  </div>
                </div>
                <button className="slider-read-btn">Read More</button>
              </div>
            </div>
          </div>

          {/*ลูกศรขวา*/}
          <div className="nav-btn-container">
            {currentIndex < cardData.length - 1 && (
              <button className="slider-arrow-btn" onClick={nextSlide}>&#10095;</button>
            )}
          </div>
          
        </div>

        {/*Dotsล่าง*/}
        <div className="slider-dots">
          {cardData.map((_, i) => (
            <span 
              key={i} 
              className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}