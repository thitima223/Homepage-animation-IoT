import './phyIOTSystem.css';
import universityIcon from '../../../assets/university_icon.svg';
import CourseStructurePhyIoT from './course_structure/CourseStructure';

const careersphysiot = [
    'ผู้ประกอบการทางธุรกิจในเทคโนโลยีวิศวกรไอโอที (IoT Engineer)',
    'วิศวกรระบบไอโอที (IoT Engineer)',
    'วิศวกรซอฟต์แวร์ระบบสมองกลฝังตัว (Embedded Software Engineer)',
    'นักพัฒนาแอปพลิเคชัน (Application Developer)',
    'โปรแกรมเมอร์ (Programmer)',
    'วิศวกรซอฟต์แวร์ (Software Engineer)',
    'นักพัฒนาส่วนหน้า (Front End Developer)',
    'นักพัฒนาส่วนเบื้องหลัง (Back End Developer)',
    'นักพัฒนาฟูลสแต็ก (Full Stack Developer)',
    'วิศวกรระบบเครือข่าย (Network Engineer)',
    'นักวิทยาการข้อมูล (Data Scientist)',
    'วิศวกรข้อมูล (Data Engineer)',
    'ผู้ดูแลระบบ (System Administrator)',
    'นักวิจัยในภาครัฐและเอกชน',
    'วิศวกรควบคุมคุณภาพ',
    'วิศวกรฝ่ายวิจัยและพัฒนา',
    'นักวิจัย นักวิชาการ เจ้าของธุรกิจส่วนตัว และอาชีพอื่นๆ ที่เกี่ยวข้องกับทางด้านคอมพิวเตอร์หรือไอที ทั้งหมด',
];

export default function PHYIOTSystem() {
    return (
        <div className="phy-iot-system-page">
            <div className="phy-iot-system-header">
                <h1 className="phy-iot-system-title-en">INDUSTRIAL PHYSICS AND IOT SYSTEM INFORMATION</h1>
                <p className="phy-iot-system-subtitle-en">Bachelor of Science and Engineering</p>
            </div>

            <div className="phy-iot-system-intro-section">
                <h2 className="phy-iot-system-intro-title">สองปริญญาคืออะไร ?</h2>
                <p className="phy-iot-system-intro-text">
                    คือบูรณาการองค์ความรู้ด้านวิศวกรรมศาสตร์<br />และวิทยาศาสตร์
                </p>
            </div>

            <div className="phy-iot-system-card-container">
                <div className="phy-iot-system-info-card">
                    <h2 className="phy-iot-system-card-title">ฟิสิกส์อุตสาหกรรม</h2>
                    <p className="phy-iot-system-card-text">
                        มีความเข้าใจลึกซึ้งแห่งศาสตร์ฟิสิกส์พื้นฐานและฟิสิกส์ประยุกต์
                        เพื่อบูรณาการความรู้เข้ากับเทคโนโลยีสมัยใหม่ Digital Disruption
                        ประยุกต์สร้างนวัตกรรมและร่วมงานกับภาคอุตสาหกรรม องค์กรชั้นนำ
                    </p>
                </div>
                <div className="phy-iot-system-info-card">
                    <h2 className="phy-iot-system-card-title">วิศวกรรมศาสตร์</h2>
                    <p className="phy-iot-system-card-text">
                        การประยุกต์ใช้ความรู้ทางวิศวกรรมและคณิตศาสตร์เพื่อการวิเคราะห์
                        คำนวณ และออกแบบสร้างนวัตกรรมเพื่อสร้างสรรค์โลกในยุคแห่งการเปลี่ยนแปลง
                    </p>
                </div>
                <div className="phy-iot-system-info-card">
                    <h2 className="phy-iot-system-card-title">ระบบไอโอทีและสารสนเทศ</h2>
                    <p className="phy-iot-system-card-text">
                        บูรณาการเทคโนโลยีระบบไอโอทีเพื่อสร้างระบบอัจฉริยะด้วยเทคโนโลยีดิจิทัล ปัญญาประดิษฐ์
                        ฐานข้อมูลขนาดใหญ่ รวมถึงการเขียนโปรแกรมและการพัฒนาแอพพลิเคชัน
                    </p>
                </div>
            </div>

            <div className="phy-iot-system-career-section">
                <div className="phy-iot-system-career-header-row">
                    <h2 className="phy-iot-system-career-title">
                        อาชีพที่ประกอบได้หลัง<br />จบการศึกษา
                    </h2>

                    <div className="phy-iot-system-fee-badge">
                        <img src={universityIcon} alt="University" className="phy-iot-system-fee-badge-icon" />
                        <p className="phy-iot-system-fee-badge-title">ค่าธรรมเนียม<br />การศึกษา</p>
                        <p className="phy-iot-system-fee-badge-amount">40,000</p>
                        <p className="phy-iot-system-fee-badge-unit">บาท/ภาคการศึกษา</p>
                    </div>
                </div>

                <div className="phy-iot-system-career-list-box">
                    <ul className="phy-iot-system-career-list">
                        {careersphysiot.map((career, index) => (
                            <li key={index}>{career}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Curriculum Structure */}
            <CourseStructurePhyIoT />
        </div>
    );
}
