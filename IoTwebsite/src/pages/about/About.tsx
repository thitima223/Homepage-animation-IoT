import React from 'react';
import './style.css'; 
import { Briefcase, Cpu, Brain, Database, Flame , Antenna } from 'lucide-react';

const About: React.FC = () => {
  return (

    <>
        <div className="about-container">
          
          {/* 🔴 ส่วนที่เพิ่มเข้ามาใหม่: ข้อความ Intro ด้านบน */}
          <section className="intro-section">
            <h1 className="intro-title">ภาคเราเกี่ยวกับอะไร</h1>
            <p className="intro-text">
              ภาควิศวกรรมระบบ IoT และสารสนเทศ ก่อตั้งขึ้นเพื่อตอบสนองความต้องการของอุตสาหกรรม 4.0 และการพัฒนา
              ประเทศไทยสู่ยุคดิจิทัล ด้วยการผลิตวิศวกรที่มีความเชี่ยวชาญในการออกแบบ พัฒนา และบริหารจัดการระบบเทคโนโลยีสมัยใหม่
            </p>
          </section>

          {/* 🔴 ส่วนที่เพิ่มเข้ามาใหม่: กล่องห่อหุ้มการ์ดทั้ง 3 ใบให้อยู่ในแนวนอน */}
          <div className="cards-wrapper">
            
            {/* การ์ดใบที่ 1 */}
            <div className="course-card">
              <header className="card-header">
                <img src="/About__picture/iot-bg.png" alt="IoT Hardware Background" className="header-bg-img" />
                <div className="header-overlay"></div>
                <div className="header-content">
                  <div className="icon-container">
                    <Cpu size={28} className="icon-orange" />
                  </div>
                  <div className="title-group">
                    <h1 className="course-title-en">IoT system and Information Engineering</h1>
                    <p className="course-title-th">วิศวกรรมระบบไอโอทีและสารสนเทศ</p>
                  </div>
                </div>
              </header>
              <main className="card-body">
                <p className="course-description">
                  เรียนรู้การออกแบบและพัฒนาระบบ IoT ตั้งแต่ Hardware เซ็นเซอร์ ระบบควบคุมอัตโนมัติ การสื่อสารไร้สาย และการเชื่อมต่อกับ Cloud Platform
                </p>
                <section className="subjects-section">
                  <h2 className="subjects-title">ตัวอย่างวิชา:</h2>
                  <ul className="subjects-list">
                    <li><span className="bullet"></span>Principles of Communication</li>
                    <li><span className="bullet"></span>Cyber Security</li>
                    <li><span className="bullet"></span>MCU and Embedded</li>
                    <li><span className="bullet"></span>IoT and Data Communication</li>
                  </ul>
                </section>
              </main>
            </div>

            {/* การ์ดใบที่ 2 */}
            <div className="course-card">
              <header className="card-header">
                <img src="/About__picture/phys-bg.png" alt="IoT Hardware Background" className="header-bg-img" />
                <div className="header-overlay"></div>
                <div className="header-content">
                  <div className="icon-container">
                    <Brain size={28} className="icon-orange" />
                  </div>
                  <div className="title-group">
                    <h1 className="course-title-en">Industrial Physics</h1>
                    <p className="course-title-th">ฟิสิกส์อุตสาหกรรม</p>
                  </div>
                </div>
              </header>
              <main className="card-body">
                <p className="course-description">
                  เรียนรู้การนำหลักการทางฟิสิกส์มาแก้ปัญหาและสร้างนวัตกรรม และเน้นการออกแบบและสร้างเครื่องมือวัดขั้นสูงรวมไปถึงระบบเซ็นเซอร์ในระดับโครงสร้าง
                </p>
                <section className="subjects-section">
                  <h2 className="subjects-title">ตัวอย่างวิชา:</h2>
                  <ul className="subjects-list">
                    <li><span className="bullet"></span>Electromagnetic Field</li>
                    <li><span className="bullet"></span>Physics and Application</li>
                    <li><span className="bullet"></span>Industrial Physics Laboratory</li>
                    <li><span className="bullet"></span>Sensors and Transducers</li>
                  </ul>
                </section>
              </main>

            </div>

            {/* การ์ดใบที่ 3 */}
            <div className="course-card">
              <header className="card-header">
                <img src="/About__picture/physiot-bg.png" alt="IoT Hardware Background" className="header-bg-img" />
                <div className="header-overlay"></div>
                <div className="header-content">
                  <div className="icon-container">
                    <Database size={28} className="icon-orange" />
                  </div>
                  <div className="title-group">
                    <h1 className="course-title-en">Industrial Physics and IoT Systems and Information Engineering</h1>
                    <p className="course-title-th">ฟิสิกส์อุตสาหกรรมและวิศวกรรมระบบไอโอทีและสารสนเทศ</p>
                  </div>
                </div>
              </header>
              <main className="card-body">
                <p className="course-description">
                  หากคุณได้เรียนสาขานี้ คุณจะเข้าใจ "แก่นแท้ทางฟิสิกส์ของตัวเซ็นเซอร์" ว่ามันทำงานและรับค่าต่างๆได้ยังไง และสามารถเขียนโปรแกรมเพื่อดึงข้อมูลนั้นจากเซนเซอร์ ส่งขึ้น Cloud และนำไปใช้งานต่อได้
                </p>
                <section className="subjects-section">
                  <h2 className="subjects-title">ตัวอย่างวิชา:</h2>
                  <ul className="subjects-list">
                    <li><span className="bullet"></span>Industrial Internet of Things</li>
                    <li><span className="bullet"></span>Mobile Applications Development</li>
                    <li><span className="bullet"></span>Dgital Electronics Laboratory</li>
                    <li><span className="bullet"></span>Quantum Mechanics and Quantum Technology</li>
                  </ul>
                </section>
              </main>
              
            </div>
          </div> {/* จบ cards-wrapper */}

        </div>

        <section className="what-we-learn-section">
            
            {/* หัวข้อ Section */}
            <div className="section-header-center">
              <h2 className="main-heading">เรียนกับเราดียังไง?</h2>
              <p className="sub-heading">
                หลักสูตรครอบคลุมทุกมิติของเทคโนโลยีสมัยใหม่ เน้นการเรียนรู้แบบ Hands-on และโครงงานจริง
              </p>
            </div>

            {/* กริตการ์ด 3 ใบ */}
            <div className="learn-cards-grid">
              
              {/* การ์ดใบที่ 1 */}
              <div className="learn-card">
                <div className="learn-icon-wrapper">
                  <Antenna size={28} className="icon-orange" />
                </div>
                <h3 className="learn-card-title">ครอบคลุมทั้ง Hardware และ Software</h3>
                <p className="learn-card-desc">
                  เรียนรู้ครบถ้วนทั้งการออกแบบและพัฒนาระบบ IoT ตั้งแต่ Hardware เซ็นเซอร์ ระบบควบคุมอัตโนมัติ การสื่อสารไร้สาย และการเชื่อมต่อกับ Cloud Platform
                </p>
              </div>

              {/* การ์ดใบที่ 2 */}
              <div className="learn-card">
                <div className="learn-icon-wrapper">
                  <Briefcase size={28} className="icon-orange" />
                </div>
                <h3 className="learn-card-title">สายงานกว้าง ตอบโจทย์ทุกวงการ</h3>
                <p className="learn-card-desc">
                  เพราะเทคโนโลยีสารสนเทศแทรกซึมอยู่ทุกที่ คุณจึงสามารถประยุกต์ใช้ความรู้เพื่อทำงานได้หลากหลายสาขา ทั้ง Smart City, การแพทย์, การเงิน และความมั่นคงปลอดภัยไซเบอร์
                </p>
              </div>

              {/* การ์ดใบที่ 3 */}
              <div className="learn-card">
                <div className="learn-icon-wrapper">
                  <Flame size={28} className="icon-orange" />
                </div>
                <h3 className="learn-card-title">จบแล้วฮอตสุดไม่มีตกยุค</h3>
                <p className="learn-card-desc">
                  หากได้ลองค้นหาคำว่า “Top 10 อาชีพไม่ตกงาน” แน่นอนว่าจะต้องเจอกับอาชีพด้านไอทีอย่างแน่นอนเพราะเป็นสายงานที่มีความหลากหลายมากในยุคดิจิทัลไทยแลนด์ 4.0 นี้ อุตสาหกรรมดิจิทัลที่รัฐบาลให้มีความต้องการบัณฑิตในสาขานี้อย่างมาก
                </p>
              </div>

            </div>
          </section>      

                  {/* 🔴 ส่วนสุดท้าย: ความเป็นมาของหลักสูตร */}
          <section className="history-section">
            <div className="history-content-wrapper">
              
              {/* ป้าย Badge ด้านบน */}
              <div className="history-badge">
                ความเป็นมาของหลักสูตร
              </div>
              
              {/* หัวข้อ */}
              <h2 className="history-title">วิศวกรรมสารสนเทศ</h2>
              
              {/* เนื้อหาประวัติ (จัดกึ่งกลางตามรูป) */}
              <p className="history-text">
                ภาควิชาวิศวกรรมสารสนเทศ เป็นภาควิชาหนึ่งในคณะวิศวกรรมศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ซึ่งเป็นภาควิชา
                ที่เปลี่ยนชื่อมาจาก ภาควิชาเทคนิคอุตสาหกรรม ซึ่งเปิดรับนักศึกษาในปี พ.ศ.2517
                ในหลักสูตรอุตสาหกรรมศาสตรบัณฑิต แขนงวิชาเทคโนโลยี
                โทรทัศน์ เปิดสอนในระดับปริญญาตรี ซึ่งเป็นการเปิดรับก่อนการได้รับอนุมัติ ต่อมาได้รับอนุมัติหลักสูตรในปี
                พ.ศ.2518 โดยหลักสูตรอุตสาหกรรม
                ศาสตรบัณฑิต
                เป็นหลักสูตรที่เปิดโอกาสให้ผู้ที่จบการศึกษาระดับประกาศนียบัตรวิชาชีพชั้นสูงได้ศึกษาต่อในระดับปริญญาตรี
                โดยเปิดการเรียนการ
                สอนทั้งภาคเช้าและภาคค่ำ มีระยะเวลา 3 ปี เริ่มรับนักศึกษาในภาคการศึกษาที่ 1/2527 หรือในปีที่เริ่มงบประมาณ 2518
                สถานที่ศึกษาที่ศูนย์นนทบุรี
                และลาดกระบัง อาจารย์ผู้สอนจะเป็นอาจารย์จากในภาควิชาเทคนิคอุตสาหกรรม ภาควิชาวิศวกรรมโทรคมนาคม
                ภาควิชาวิศวกรรมไฟฟ้า และจาก
                คณะครุศาสตร์อุตสาหกรรม คณะวิทยาศาสตร์ และ จากอาจารย์พิเศษจากภายนอก และในปี พ.ศ. 2541
                จึงได้รับอนุมัติหลักสูตรให้เป็นหลักสูตร
                วิศวกรรมศาสตรบัณฑิต และเริ่มรับนักศึกษาทั้งที่จบประกาศนียบัตรวิชาชีพชั้นสูง และ
                รับนักศึกษาที่จบชั้นมัธยมศึกษาปีที่ 6 โดยผ่านการสอบเอ็น
              </p>
              
            </div>
          </section>

    </>
  );
};

export default About;