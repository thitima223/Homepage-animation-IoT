import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './course.css';

const PhysIoT = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string | null>(
    location.state?.activeTab || null
  );

  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  const admissionData: any = {
    PORTFOLIO: [
      {
        name: "โครงการเรียนดี 1-1 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการความสามารถพิเศษทางวิทยาศาสตร์ 1-1 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการบุตรของบุคลากรสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง 1-1 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการเรียนดี 1-2 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการความสามารถพิเศษทางวิทยาศาสตร์ 1-2 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการบุตรของบุคลากรสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง 1-2 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการการให้โควตานักเรียนมูลนิธิส่งเสริมโอลิมปิกวิชาการและพัฒนามาตรฐานวิทยาศาสตร์ศึกษาในพระอุปถัมภ์สมเด็จพระเจ้าพี่นางเธอ เจ้าฟ้ากัลยาณิวัฒนา กรมหลวงนราธิวาสราชนครินทร์(สอวน.)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "5 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการส่งเสริมนักเรียนผู้มีคุณธรรม จริยธรรม และบำเพ็ญประโยชน์ (โครงการเด็กดีมีที่เรียน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "2 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      }
    ],
    QUOTA: [
      {
        name: "โควตาทักษะพิเศษทางวิทยาศาสตร์ (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โควตาสถานศึกษาที่มีความร่วมมือ (MOU) สถาบันฯ หรือ สถานศึกษาที่อยู่ในเขตพื้นที่...",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "10 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      }
    ],
    ADMISSION: [
      {
        name: "วุฒิ GED ใช้คะแนน TGAT และ TPAT3 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบหลักสูตร GED"],
        cond: "รับผู้สำเร็จการศึกษาวุฒิ GED และต้องมีคะแนน TGAT, TPAT3",
        scores: [
          { label: "ใช้รูปแบบคะแนน", val: "T-Score" },
          { label: "ความถนัดทั่วไป (TGAT)", val: "20 %" },
          { label: "ความถนัดวิทยาศาสตร์ (TPAT3)", val: "80 %" }
        ],
        slots: "8 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "นักเรียนสายวิทยาศาสตร์-คณิตศาสตร์ ใช้คะแนน TGAT และ TPAT3 (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง"],
        cond: "กลุ่มสาระวิทย์ไม่น้อยกว่า 21 หน่วยกิต คณิตไม่น้อยกว่า 12 หน่วยกิต และมีคะแนน TGAT, TPAT3",
        scores: [
          { label: "ใช้รูปแบบคะแนน", val: "T-Score" },
          { label: "ความถนัดทั่วไป (TGAT)", val: "20 %" },
          { label: "ความถนัดวิทยาศาสตร์ (TPAT3)", val: "80 %" }
        ],
        slots: "8 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "นักเรียนสายวิทยาศาสตร์-คณิตศาสตร์ ใช้คะแนน TGAT และ A-Level (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง"],
        cond: "กลุ่มสาระวิทย์ไม่น้อยกว่า 21 หน่วยกิต คณิตไม่น้อยกว่า 12 หน่วยกิต และมีคะแนน TGAT, A-Level Math1, A-Level Phy",
        scores: [
          { label: "ใช้รูปแบบคะแนน", val: "T-Score" },
          { label: "ความถนัดทั่วไป (TGAT)", val: "20 %" },
          { label: "A-Level คณิตศาสตร์ประยุกต์ 1 (พื้นฐาน+เพิ่มเติม)", val: "40 %" },
          { label: "A-Level ฟิสิกส์", val: "40 %" }
        ],
        slots: "8 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      }
    ]
  };


  const handleTabClick = (tab: string) => {
    if (activeTab === tab) {
      setActiveTab(null);
      setOpenIndices([]);
    } else {
      setActiveTab(tab);
      setOpenIndices([]);

      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="iot-page-container">
      <div className="iot-header-white">
        <button className="btn-back-link" onClick={() => navigate('/admission')}>
          ← Back to Admission
        </button>
        <h1 className="course-main-title">B.SC. INDUSTRIAL PHYSICS AND B.ENG. IOT SYSTEM AND INFORMATION</h1>
        <p className="course-type-label">Bachelor of Science and Engineering</p>
      </div>

      <div className="iot-dark-body">
        <div className="iot-tabs-navigation">
          {['PORTFOLIO', 'QUOTA', 'ADMISSION'].map((tab) => (
            <button
              key={tab}
              className={`iot-tab-box ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <span className="tab-primary-wrapper">
                <span className="tab-primary">{tab}</span>
              </span>

              {activeTab === tab && (
                <span className="tab-secondary">
                  {tab === 'PORTFOLIO' && 'รับ 27 คน'}
                  {tab === 'QUOTA' && 'รับ 10 คน'}
                  {tab === 'ADMISSION' && 'รับ 8 คน'}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* จุดเชื่อมต่อ: ref={contentRef} */}
        {activeTab && (
          <div className="iot-accordion-list-bg" ref={contentRef}>
            {admissionData[activeTab].map((item: any, index: number) => (
              <div key={`${activeTab}-${index}`} className="accordion-item-wrap">
                <div
                  className={`accordion-head-click ${openIndices.includes(index) ? 'is-expanded' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="proj-name-text">{item.name}</span>
                  <span className="proj-arrow-icon">{openIndices.includes(index) ? '▲' : '▼'}</span>
                </div>

                {openIndices.includes(index) && (
                  <div className="accordion-body-info">
                    <div className="info-content-box">
                      <h4 className="info-topic">คุณสมบัติ</h4>
                      <ul className="info-bullet-list">
                        {item.qual.map((q: string, i: number) => <li key={i}>{q}</li>)}
                      </ul>

                      <h4 className="info-topic">เงื่อนไขการรับสมัคร</h4>
                      <p className="info-plain-text">{item.cond}</p>

                      {item.scores && (
                        <>
                          <h4 className="info-topic">สัดส่วนคะแนน</h4>
                          <ul className="info-bullet-list">
                            {item.scores.map((s: any, i: number) => (
                              <li key={i}>{s.label}: <span style={{ fontWeight: 'bold', color: '#0e34de' }}>{s.val}</span></li>
                            ))}
                          </ul>
                        </>
                      )}

                      <h4 className="info-topic">จำนวนที่เปิดรับ</h4>
                      <p className="info-plain-text">{item.slots}</p>

                      <h4 className="info-topic">รายละเอียดเพิ่มเติม</h4>
                      <a href={item.link} target="_blank" rel="noreferrer" className="info-link-text">
                        {item.link}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysIoT;