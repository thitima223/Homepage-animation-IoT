import 'IoTwebsite\src\pages\home';
// import './Animations.css';
import NodeLayout from '../../components/NodeLayout';
import IoTLayout from '../../components/IoTLayout';
import SliderLayout from '../../components/SliderLayout';

function Home() {
  return (
    <div className="home-page-container">
      <div className="main-background-layer">
        <div className="overlay-gradient"></div>
      </div>

      {/*้home Section*/}
      <section className="home-section full-page" id="home">
        <img src="/Home_image/image_03.png"
          alt="Background"
          className="home-background-full" />
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
            {/* <div className="button-group">
              <button className="btn-primary">อะไรไม่รู้</button>
              <button className="btn-secondary">สวยดีแปะไว้ก่อน</button>
            </div> */}
          </div>
        </div>
      </section>

      {/*success Section + NodeLayout*/}
      <section className="success-section full-page" id="admission">
        <div className="container-split">
          <div className="split-left">
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
          <div className="split-right node-layout-wrapper">
            <NodeLayout />
          </div>
        </div>
      </section>

      {/*IoT Section + IoTLayout*/}
      <section className="activity-section full-page" id="about">
        <div className="container-split">
          <div className="split-left iot-layout-wrapper">
            <IoTLayout />
          </div>
          <div className="split-right right-align-text">
            <h2 className="section-title-alt">IoT Activity</h2>
            <h3 className="section-subtitle">กิจกรรมมากมายในภาควิชา</h3>
            <p className="section-description">
              มีกิจกรรมให้ร่วมสนุกมากมาย รอต้อนรับทุกคนเสมอ เช่น IoTE Camp สำหรับน้อง ๆ นักเรียนชั้น ม.4-6 เพื่อเรียนรู้และปฏิบัติการเกี่ยวกับ IoT
              รวมถึงลงมือการทำเวิร์กช็อป Smart Manufacturing หรือ Hardware, Software ในเบื้องต้น และโครงการหรือโปรเจคจริงที่เกี่ยวกับงาน
              Smart City หรือ Smart Farming ผ่านภาควิชาวิศวกรรมไอโอทีและสารสนเทศ (IOTE) ซึ่งมีทั้งกิจกรรมเชิงวิชาการและเชิงปฏิบัติในอีกหลายๆ
              ด้านด้วย เพื่อสร้างทักษะและเปิดโอกาสให้ทุกคนได้มาทำความรู้จักกับภาควิชามากขึ้น รวมถึงได้มารู้จักกับการเรียนการสอนของอาจารย์
              ความสัมพันธ์พี่และน้อง ผ่านกิจกรรมสนุกๆ สิ่งที่ได้จากการเรียน องค์ความรู้ต่างๆและอาชีพที่ สามารถนำความรู้เหล่านี้ไปประกอบได้ในอนาคตอย่างกว้างขวาง
              อีกด้วยนอกจากนี้พี่ๆและน้องๆทุกคนยังได้รู้จักกับการทำงานอย่างเป็นระบบแบบแผน การทำงานเป็นทีมการสื่อสารและความรับผิดชอบในหน้าที่ของตนเอง
              ผ่านการจัดกิจกรรมใหญ่มากมาย
            </p>
            <div className="section-social-footer">
              <ul className="contact-list">
                <li><span>iote@kmitl.ac.th</span><img src="/Home_image/image_04.png" alt="Email" className="contact-icon-mini" /></li>
                <li><span>Department of IoT and Information Engineering, KMITL</span><img src="/Home_image/image_07.png" alt="Facebook" className="contact-icon-mini" /></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*Project Section + SliderLayout*/}
      <section className="project-section full-page" id="academic">
        <div className="container-split">
          <div className="split-left project-text-side left-align-text">
            <h2 className="section-title-alt">PROJECT FROM THE IoT COMMUNITY</h2>
            <h3 className="section-subtitle">การนำความรู้ที่ได้มาลงมือปฏิบัติงานจริง</h3>
            <p className="section-description" style={{ maxWidth: '100%' }}>
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
              <ul className="contact-list" style={{ alignItems: 'flex-start' }}>
                <li style={{ flexDirection: 'row' }}><img src="/Home_image/image_04.png" alt="Email" className="contact-icon-mini" /><span>iote@kmitl.ac.th</span></li>
                <li style={{ flexDirection: 'row' }}><img src="/Home_image/image_07.png" alt="Facebook" className="contact-icon-mini" /><span>Department of IoT and Information Engineering, KMITL</span></li>
              </ul>
            </div>
          </div>
          <div className="split-right slider-layout-wrapper">
            <SliderLayout />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;