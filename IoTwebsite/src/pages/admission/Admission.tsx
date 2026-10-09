// Import
import './Admission.css';

import IoTImg from '../../assets/Ad_IoT.png';
import PhysIoTImg from '../../assets/Ad_PhysIoT.png';
import ComIoTImg from '../../assets/Ad_ComIoT.png';
import AIIoTImg from '../../assets/Ad_AIoT.png';

import PortIcon from '../../assets/p.png';
import QuotaIcon from '../../assets/q.png';
import AdminIcon from '../../assets/a.png';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Data
const courses = [
  {
    id: 1,
    title: "B.ENG. IOT SYSTEM AND INFORMATION",
    subTitle: "Bachelor of Engineering",
    thaiMain: "ปริญญาตรี วิศวกรรมศาสตรบัณฑิต วิศวกรรมระบบไอโอทีและสารสนเทศ",
    thaiSub: "วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ",
    engSub: "B.Eng. IoT system and information Engineering",

    image: IoTImg,
    counts: { portfolio: 75, quota: 15, admission: 5 },
    fee: "25,000",
    detailLink: "https://drive.google.com/file/d/1QwCpsDUdwfdnNp4ZKYXeEyMoTk7DBRXQ/view",
    reverse: false
  },
  {
    id: 2,
    title: "B.SC. INDUSTRIAL PHYSICS AND B.ENG. IOT SYSTEM AND INFORMATION",
    subTitle: "(DUAL DEGREE) | Bachelor of Science and Engineering",
    thaiMain: "วท.บ. ฟิสิกส์อุตสาหกรรม และ วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ (หลักสูตรสองปริญญา)",
    thaiSub: "วท.บ. ฟิสิกส์อุตสาหกรรม และ วศ.บ. วิศวกรรมระบบไอโอทีและสารสนเทศ",
    engSub: "B.Sc. Industrial physics and B.Eng. IoT system and information Engineering",

    image: PhysIoTImg,
    counts: { portfolio: 27, quota: 10, admission: 8 },
    fee: "40,000",
    detailLink: "https://docs.google.com/viewerng/viewer?url=http://www.iote.kmitl.ac.th/wp-content/uploads/2024/07/%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3%E0%B8%AA%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%8D%E0%B8%8D%E0%B8%B2PhysIoTE.pdf",
    reverse: true
  },
  {
    id: 3,
    title: "B.ENG. COMPUTER AND IOT (CONTINUING PROGRAM)",
    subTitle: "Bachelor of Engineering",
    thaiMain: "ปริญญาตรี วิศวกรรมศาสตรบัณฑิต (คอมพิวเตอร์และไอโอที) หลักสูตรต่อเนื่อง",
    thaiSub: "วศ.บ. วิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง)",
    engSub: "B.Eng. Computer and IoT (Continuing program)",

    image: ComIoTImg,
    counts: null,
    fee: "35,000",
    detailLink: "https://www.iote.kmitl.ac.th/%E0%B8%A7%E0%B8%A8-%E0%B8%9A-%E0%B8%A7%E0%B8%B4%E0%B8%A8%E0%B8%A7%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%9E%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3/",
    reverse: false
  },
  {
    id: 4,
    title: "M.ENG. (AIOT AND INFORMATION) AND Ph.D. (AIOT AND INFORMATION)",
    subTitle: "Master of Engineering and Doctor of Philosophy",
    thaiMain: "ปริญญาโท วิศวกรรมศาสตรมหาบัณฑิต / ปริญญาเอก ปรัชญาดุษฎีบัณฑิต เอไอโอทีและสารสนเทศ",
    thaiSub: "วศ.ม. เอไอโอทีและสารสนเทศ  (M.Eng. AIoT and information) ",
    engSub: "ปร.ด. เอไอโอทีและสารสนเทศ (Ph.D. AIoT and information)",

    image: AIIoTImg,
    counts: null,
    fee: "ตามระเบียบการ",
    detailLink: "https://office.kmitl.ac.th/oaq/curriculum/",
    reverse: true
  }
];

export default function Admission() {

  const navigate = useNavigate();
  const [searchQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.thaiMain.includes(searchQuery)
  );

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="admission-layout">
      <div className="admission-top-bar">
        <h1 className="header-text">IoT Admission</h1>
        <div className="search-container">
          {/* <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="search" 
              className="search-input" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div> */}
        </div>
      </div>

      {filteredCourses.map((course) => (
        <div key={course.id} className={`course-section ${course.reverse ? 'is-reverse' : ''}`}>
          <div className="course-visual">
            <div className="image-wrapper-fancy">
              <img src={course.image} alt={course.title} />
            </div>
          </div>

          <div className="course-detail-content">
            <h2 className="title-en">{course.title}</h2>
            <p className="subtitle-en">{course.subTitle}</p>

            <div className="thai-info-box">
              <p className="main-th">{course.thaiMain}</p>
            </div>

            {course.counts && (
              <div className="admission-grid-view">
                <button
                  className="type-card-item clickable"
                  onClick={() => {
                    const targetPath = course.id === 1 ? '/course/iot' : '/course/physiot';
                    navigate(targetPath, { state: { activeTab: 'PORTFOLIO' } });
                  }}
                >
                  <img src={PortIcon} alt="Portfolio Icon" className="card-icon-img" />
                  <span className="label">Portfolio</span>
                  <p className="count">จำนวนที่รับ {course.counts.portfolio} คน</p>
                </button>
                <button
                  className="type-card-item clickable"
                  onClick={() => {
                    const targetPath = course.id === 1 ? '/course/iot' : '/course/physiot';
                    navigate(targetPath, { state: { activeTab: 'QUOTA' } });
                  }}
                >
                  <img src={QuotaIcon} alt="Portfolio Icon" className="card-icon-img" />
                  <span className="label">Quota</span>
                  <p className="count">จำนวนที่รับ {course.counts.quota} คน</p>
                </button>
                <button
                  className="type-card-item clickable"
                  onClick={() => {
                    const targetPath = course.id === 1 ? '/course/iot' : '/course/physiot';
                    navigate(targetPath, { state: { activeTab: 'ADMISSION' } });
                  }}
                >
                  <img src={AdminIcon} alt="Portfolio Icon" className="card-icon-img" />
                  <span className="label">Admission</span>
                  <p className="count">จำนวนที่รับ {course.counts.admission} คน</p>
                </button>
              </div>
            )}

            <div className="extra-info-container">
              <h3 className="section-header">รายละเอียดหลักสูตร</h3>
              <div className="info-row">
                <div className="col">
                  <span className="label-gray">ชื่อหลักสูตร</span>
                  <p className="val-text">{course.thaiSub}</p>
                  <p className="val-sub">{course.engSub}</p>
                </div>
              </div>
              <div className="info-row">
                <div className="col">
                  <span className="label-gray">วิทยาเขต</span>
                  <p className="val-text">ลาดกระบัง</p>
                </div>
              </div>
              <div className="fee-box">
                <span className="label-gray">ค่าธรรมเนียมการศึกษา</span>
                <p className="val-text">{course.fee} ต่อภาคการศึกษา</p>
              </div>
              <div className="action-buttons-group">
                <button
                  className="btn-light"
                  onClick={() => handleOpenLink(course.detailLink)}
                >
                  Detail
                </button>
                <button
                  className="btn-dark"
                  onClick={() => handleOpenLink("https://admission.reg.kmitl.ac.th/#/undergraduate/explore")}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}