import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './course.css';

const IoT = () => {

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
        name: "โครงการ Engineering Top Talents (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "30 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการ K-Engineering Incubator (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "30 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการเรียนดี ช้างเผือก กลุ่มโรงเรียนสามัญ (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "30 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการผลการทดสอบวัดความรู้ทางวิชาการ (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "30 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการ K-Engineer Pathway (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "30 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการการให้โควตานักเรียนมูลนิธิส่งเสริมโอลิมปิกวิชาการและพัฒนามาตรฐานวิทยาศาสตร์ศึกษาในพระอุปถัมภ์สมเด็จพระเจ้าพี่นางเธอ เจ้าฟ้ากัลยาณิวัฒนา กรมหลวงนราธิวาสราชนครินทร์(สอวน.)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "40 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โครงการบุตรของบุคลากรสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "5 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      }
    ],
    QUOTA: [
      {
        name: "โควตาเรียนดี (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "15 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      },
      {
        name: "โควตา Engineering Pathway (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "คุณสมบัติผู้สมัครและเงื่อนไขการรับเป็นไปตามประกาศสถาบันฯ",
        slots: "15 คน",
        link: "https://admission.reg.kmitl.ac.th/#/undergraduate/announcement_tcas"
      }
    ],
    ADMISSION: [
      {
        name: "รอบที่ 3 Admission (รับร่วมกัน)",
        qual: ["รับผู้สมัครที่จบจาก รร. หลักสูตรแกนกลาง", "รับผู้สมัครที่จบจาก รร. หลักสูตรนานาชาติ", "รับผู้สมัครที่จบจาก รร. หลักสูตรอาชีวะ"],
        cond: "กำลังศึกษาหรือสำเร็จการศึกษาระดับมัธยมศึกษาตอนปลายสาย วิทย์-คณิต หรือประกาศนียบัตรวิชาชีพ (ปวช.) สายช่างอุตสาหกรรม ผู้สมัครต้องมีคะแนน TGAT , TPAT3 , A-level Math 1 และ Physics",
        scores: [
          { label: "ใช้รูปแบบคะแนน", val: "T-Score" },
          { label: "ความถนัดทั่วไป (TGAT)", val: "20 %" },
          { label: "ความถนัดวิทยาศาสตร์ (TPAT3)", val: "25 %" },
          { label: "A-Level คณิตศาสตร์ประยุกต์ 1 (พื้นฐาน+เพิ่มเติม)", val: "25 %" },
          { label: "A-Level ฟิสิกส์", val: "30 %" }
        ],
        slots: "5 คน",
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
        <h1 className="course-main-title">B.ENG. IOT SYSTEM AND INFORMATION</h1>
        <p className="course-type-label">Bachelor of Engineering</p>
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
                  {tab === 'PORTFOLIO' && 'รับ 75 คน'}
                  {tab === 'QUOTA' && 'รับ 15 คน'}
                  {tab === 'ADMISSION' && 'รับ 5 คน'}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab && (
          <div
            className={`iot-accordion-list-bg ${activeTab === 'PORTFOLIO' ? 'port-active' :
              activeTab === 'QUOTA' ? 'quota-active' :
                activeTab === 'ADMISSION' ? 'admission-active' : ''
              }`}
            ref={contentRef}
          >
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

export default IoT;