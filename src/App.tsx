import React, { useState } from 'react';
import './App.css';




function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar-wrapper">
      <div className="main-logo">
        <img src="/Home_image/image_01.png" alt="Logo" className="logo-image" />
      </div>
      {/*hamburger navbar แยกไว้กันงงเฉพาะในโทรศัพท์*/}
      <div className={`berger-menu ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/*กดแล้วเมนูจะโผล่ใช้ Open คุมclass open*/}
      <div className={`glass-menu-capsule ${isOpen ? 'open' : ''}`}>
        <ul className="nav-links-list">
          <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#academic" onClick={() => setIsOpen(false)}>Academic</a></li>
          <li><a href="#admission" onClick={() => setIsOpen(false)}>Admission</a></li>
          <li><a href="#faculty" onClick={() => setIsOpen(false)}>Faculty</a></li>
        </ul>
      </div>
    </nav>
  );
}





function App() {
  return (
      <div className="app-container">
      <div className="main-background-layer">
      <div className="overlay-gradient"></div>
      </div>
      
      

      <Navbar />


{/*้home Section*/}
      <section className="home-section full-page">
      <img src="/Home_image/image_03.png" 
        alt="Background" 
        className="home-background-full"/>
        <div className="home-text">
          <div className="home-content">
          <h1>
            <span className="gradient-blue">Department of IoT</span><br />
            <span className="text-white">and Information</span><br />
            <span className="text-white">Engineering</span>
          </h1>
          <p className="description">
            King Mongkut's Institute of Technology Ladkrabang
          </p>
          <div className="button-group">
            <button className="btn-primary">อะไรไม่รู้</button>
            <button className="btn-secondary">สวยดีแปะไว้ก่อน</button>
          </div>
          </div></div>
</section>


{/*success Section*/}
      <section className="success-section full-page">
        <div className="single-column-content left-align">
          <h2 className="section-title-alt">The secret of success</h2>
          <div className="success-list">
            <div className="success-item">
              <div className="success-icon"><img src="/Home_image/image_10.png" alt="Icon1" className="success-icon-img" /></div>
              <div className="success-text"><h3>กิจกรรมโดดเด่น</h3>
              <p>ภาควิชาของเราจัดกิจกรรมพิเศษตลอดทั้งปี เช่น ค่ายฝึกอบรมและเวิร์กช็อป</p></div>
            </div>
            <div className="success-item">
              <div className="success-icon"><img src="/Home_image/image_11.png" alt="Icon2" className="success-icon-img" /></div>
              <div className="success-text"><h3>อาจารย์ผู้เชี่ยวชาญ</h3>
              <p>เรียนรู้จากทีมและอาจารย์ผู้เชี่ยวชาญจากหลากหลายสายงาน</p></div>
            </div>
            <div className="success-item">
              <div className="success-icon"><img src="/Home_image/image_12.png" alt="Icon3" className="success-icon-img" /></div>
              <div className="success-text"><h3>โอกาสที่ไม่มีสิ้นสุด</h3>
              <p>สร้างโอกาสใหม่ ๆ ผ่านเครือข่ายของเรา ทั้งในด้านการศึกษาและการวิจัย</p></div>
            </div>
            <div className="success-item">
              <div className="success-icon"><img src="/Home_image/image_13.png" alt="Icon4" className="success-icon-img" /></div>
              <div className="success-text"><h3>โครงการเด่น</h3>
              <p>ร่วมเป็นส่วนหนึ่งในโครงการที่ขับเคลื่อนงานในด้านนวัตกรรม</p></div>
            </div>
          </div>
        </div>
      </section>


{/*IoT Section*/}
      <section className="activity-section full-page">
        <div className="single-column-content right-align">
          <h2 className="section-title-alt">IoT Activity</h2>
            <h3 className="section-subtitle">กิจกรรมมากมายในภาควิชา</h3>
            <p className="section-description">
              มีกิจกรรมให้ร่วมสนุกมากมาย รอต้อนรับทุกคนเสมอ  เช่น  IoTE Camp สำหรับน้อง ๆ นักเรียนชั้น ม.4-6 เพื่อเรียนรู้และปฏิบัติการเกี่ยวกับ IoT 
              รวมถึงลงมือการทำเวิร์กช็อป Smart Manufacturing หรือ Hardware, Software ในเบื้องต้น และโครงการหรือโปรเจคจริงที่เกี่ยวกับงาน
              Smart City หรือ Smart Farming ผ่านภาควิชาวิศวกรรมไอโอทีและสารสนเทศ (IOTE) ซึ่งมีทั้งกิจกรรมเชิงวิชาการและเชิงปฏิบัติในอีกหลายๆ
              ด้านด้วย เพื่อสร้างทักษะและเปิดโอกาสให้ทุกคนได้มาทำความรู้จักกับภาควิชามากขึ้น รวมถึงได้มารู้จักกับการเรียนการสอนของอาจารย์
              ความสัมพันธ์พี่และน้อง ผ่านกิจกรรมสนุกๆ สิ่งที่ได้จากการเรียน องค์ความรู้ต่างๆและอาชีพที่ สามารถนำความรู้เหล่านี้ไปประกอบได้ในอนาคตอย่างกว้างขวาง
              อีกด้วยนอกจากนี้พี่ๆและน้องๆทุกคนยังได้รู้จักกับการทำงานอย่างเป็นระบบแบบแผน การทำงานเป็นทีมการสื่อสารและความรับผิดชอบในหน้าที่ของตนเอง
              ผ่านการจัดกิจกรรมใหญ่มากมาย 
            </p>
          <div className="section-social-footer">
            <ul className="contact-list">
              <li><img src="/Home_image/image_04.png" alt="Email" className="contact-icon-mini" /><span>iote@kmitl.ac.th</span></li>
              <li><img src="/Home_image/image_07.png" alt="Facebook" className="contact-icon-mini" /><span>Department of IoT and Information Engineering, KMITL</span></li>
            </ul>
          </div>
        </div>
      </section>


{/*Project Section*/}
      <section className="project-section full-page">
        <div className="project-combined-container single-column-content left-align">
          <div className="project-text-side">
            <h2 className="section-title-alt">PROJECT FROM THE IoT COMMUNITY</h2>
            <h3 className="section-subtitle">การนำความรู้ที่ได้มาลงมือปฏิบัติงานจริง</h3>
          <p className="section-description">
              โดยในหลักสูตรจะมีการทำโปรเจคอย่างสม่ำเสมอเพื่อให้นักศึกษานำความรู้ที่ได้ศึกษาในรายวิชาหรือภาคการศึกษานั้นมาประยุกต์ใช้
              เพื่อทำโปรเจคหรืองานจริงออกมา สำหรับแก้ไขปัญหาในอุตสาหกรรมหรือชีวิตประจำวันเบื้องต้นซึ่งในโลกของการศึกษายุคใหม่ 
              ที่ความรู้ไม่ได้จำกัดอยู่เพียงในตำรา จึงออกแบบหลักสูตรที่มีประสิทธิภาพ ต้องมุ่งเน้นไปที่การสร้างเสริมทักษะทางปัญญา 
              ควบคู่ไปกับการปฏิบัติจริง ดังนั้นหัวใจสำคัญของหลักสูตรนี้คือ การกำหนดให้มีการทำโปรเจกต์อย่างสม่ำเสมอ ในทุกช่วงของการเรียนรู้ 
              เพื่อเป็นสะพานเชื่อมโยงระหว่างทฤษฎีอันซับซ้อนกับแนวทางการประยุกต์ใช้งานที่จับต้องได้ โดยการมุ่งเน้นไปที่การแก้ไขปัญหาในภาคอุตสาหกรรม
              หรือชีวิตประจำวัน นักศึกษาจะได้ฝึกฝนการสังเกตและระบุปัญหาที่เกิดขึ้นจริง เช่น การออกแบบระบบเพื่อเพิ่มประสิทธิภาพในสายการผลิต
              สำหรับโรงงานอุตสาหกรรม การพัฒนาแอปพลิเคชันขึ้น เพื่อใช้อำนวยความสะดวกในชีวิตประจำวันคนในเมืองหรือการสร้างนวัตกรรมเพื่อสิ่งแวดล้อม 
              การเผชิญหน้ากับข้อจำกัด ไม่ว่าจะเป็นด้านงบประมาณ ด้านระยะเวลา หรือเทคโนโลยี ซึ่งจะหล่อหลอมให้นักศึกษามีทักษะการคิดวิเคราะห์
              และการแก้ไขปัญหาเฉพาะหน้าอย่างมีกลยุทธ์
            </p>
            <div className="section-social-footer">
            <ul className="contact-list">
              <li><img src="/Home_image/image_04.png" alt="Email" className="contact-icon-mini" /><span>iote@kmitl.ac.th</span></li>
              <li><img src="/Home_image/image_07.png" alt="Facebook" className="contact-icon-mini" /><span>Department of IoT and Information Engineering, KMITL</span></li>
            </ul>
          </div>
        </div></div>

          
      </section>

      <Footer />

    </div>
  );
}





interface ActivityCard {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  author: string;
  role: string;
}

// 2. ข้อมูลการ์ดสไลด์
const activityData: ActivityCard[] = [
  {
    id: 1,
    category: 'DEVELOPMENT',
    title: 'Best Frontend Frameworks',
    description: 'การเปรียบเทียบเชิงลึกของเฟรมเวิร์กและไลบรารีส่วนหน้าที่ได้รับความนิยมมากที่สุดซึ่งนักพัฒนากำลังใช้เพื่อสร้างเว็บแอปพลิเคชันสมัยใหม่ในปัจจุบันเพื่อให้ได้ประสิทธิภาพสูงสุด',
    image: '/Home_image/image_d9c9bf.jpg',
    author: 'Jessica Chen',
    role: 'Developer'
  },
  {
    id: 2,
    category: 'AI',
    title: 'AI User Experience Design',
    description: 'วิธีที่ปัญญาประดิษฐ์กำลังปฏิวัติการออกแบบประสบการณ์ผู้ใช้ และช่วยให้สร้างอินเทอร์เฟซที่ปรับแต่งได้ตามความต้องการและใช้งานง่ายยิ่งขึ้นสำหรับผลิตภัณฑ์ดิจิทัล',
    image: '/Home_image/image_d9c9bf.jpg',
    author: 'Marcus Johnson',
    role: 'UX Researcher'
  },
  {
    id: 3,
    category: 'PRODUCTIVITY',
    title: 'Workspace Design for Focus',
    description: 'การออกแบบพื้นที่ทำงานที่ช่วยเพิ่มประสิทธิภาพการทำงานสูงสุดและลดสิ่งรบกวนสมาธิสำหรับมืออาชีพด้านความคิดสร้างสรรค์ในสภาพแวดล้อมการทำงานแบบไฮบริดในปัจจุบัน',
    image: '/Home_image/image_d9c9bf.jpg',
    author: 'Sarah Miller',
    role: 'Interior Designer'
  }
];




function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* ฝั่งซ้าย: Logo & Copyright */}
        <div className="footer-brand">
          <img src="/Home_image/image_01.png" alt="Logo" className="footer-logo" />
          <p className="copyright-text">
            Developed © 2025 IoT and Information Engineering <br />
            of King Mongkut's Institute of Technology Ladkrabang
          </p>
        </div>


        {/* ฝั่งกลาง: Contact */}
        <div className="footer-contact">
          <h3 className="footer-title">Contact us</h3>
          <ul className="contact-list">
            <li><img src="/Home_image/image_04.png" alt="Email" className="contact-icon-mini" />
            <span>iote@kmitl.ac.th</span></li>
            <li><img src="/Home_image/image_05.png" alt="Instagram" className="contact-icon-mini" />
            <span>kmitl.iot.official</span></li>
            <li><img src="/Home_image/image_06.png" alt="Line" className="contact-icon-mini" />
            <span>@iotekmitl</span></li>
            <li><img src="/Home_image/image_07.png" alt="Facebook" className="contact-icon-mini" />
            <span>Department of IoT and Information Engineering, KMITL</span></li>
            <li><img src="/Home_image/image_08.png" alt="Phone" className="contact-icon-mini" />
            <span>02-329-8000 ext.5129</span></li>
          </ul>
        </div>


        {/*Mapนรก*/}
        <div className="footer-map">
          <h3 className="footer-title">Map</h3>
          <div className="map-wrapper-frame">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3876.13620863683!2d100.7766!3d13.725!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d66487e852955%3A0xc3f60f64c6a61f5c!2sDepartment%20of%20IoT%20and%20Information%20Engineering!5e0!3m2!1sen!2sth!4v1709400000000!5m2!1sen!2sth" 
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="IoTE KMITL Map"
            ></iframe>
          </div>
          {/*กดไป Google Maps ด้วยเลยละกัน*/}
          <a 
            href="https://maps.app.goo.gl/D5m3PsRrYjjKj9Zq7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-view-map"
          >
            View IoTE KMIT on Google Maps
          </a>
        </div>

      </div>
    </footer>
  );
}




//Component ย่อยสำหรับ Card จะได้ไม่เขียนซ้ำ
interface FeatureProps {
  icon: string;
  title: string;
  desc: string;
}

const FeatureCard = ({ icon, title, desc }: FeatureProps) => (
  <div className="feature-card">
    <div className="icon-wrapper">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default App;
