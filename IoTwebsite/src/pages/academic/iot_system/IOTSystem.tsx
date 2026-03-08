import './IOTSystem.css';
import universityIcon from '../../../assets/university_icon.svg';
import CourseStructureIoT from './course_structure/CourseStructure';

const careersiot = [
    'วิศวกรระบบไอโอที (IoT Engineer)',
    'วิศวกรระบบสารสนเทศ (Information System Engineer)',
    'วิศวกรระบบสมองกลฝังตัว (Embedded System Engineer)',
    'วิศวกรซอฟต์แวร์ระบบสมองกลฝังตัว (Embedded Software Engineer)',
    'นักพัฒนาแอปพลิเคชัน (Application Developer)',
    'โปรแกรมเมอร์ (Programmer)',
    'วิศวกรซอฟต์แวร์ (Software Engineer)',
    'นักพัฒนาส่วนหน้า (Front End Developer)',
    'นักพัฒนาส่วนเบื้องหลัง (Back End Developer)',
    'นักพัฒนาฟูลสแต็ก (Full Stack Developer)',
    'วิศวกรระบบคลาวด์ (Cloud Engineer)',
    'วิศวกรระบบเครือข่าย (Network Engineer)',
    'นักวิทยาการข้อมูล (Data Scientist)',
    'วิศวกรข้อมูล (Data Engineer)',
    'ผู้ดูแลระบบ (System Administrator)',
    'นักวิจัย นักวิชาการ เจ้าของธุรกิจส่วนตัว และอาชีพอื่นๆ',
    'ที่เกี่ยวข้องกับทางด้านคอมพิวเตอร์ หรือไอที ทั้งหมด',
];

export default function IOTSystem() {
    return (
        <div className="iot-system-page">
            <div className="iot-system-header">
                <h1 className="iot-system-title-en">IOT SYSTEM AND INFORMATION</h1>
                <p className="iot-system-subtitle-en">Bachelor of Engineering</p>
            </div>

            <div className="iot-system-card-container">
                <div className="iot-system-info-card">
                    <h2 className="iot-system-card-title">ทำไมต้องไอโอทีลาดกระบัง ?</h2>
                    <div className="iot-system-card-divider"></div>

                    <p className="iot-system-card-text">
                        หลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ มุ่งเน้นการศึกษาการเชื่อมองค์ประกอบของโลกดิจิทัลเข้าด้วยกัน ทั้งศึกษาที่เรียน
                        ในหลักสูตรนี้จะได้ศึกษาและปฏิบัติเกี่ยวกับด้านเทคโนโลยี<br />
                        ระบบไอโอทีและสารสนเทศโดยอาศัยความรู้พื้นฐาน<br />
                        ทั้งด้านซอฟต์แวร์ประกอบด้วย การเขียนโปรแกรมคอมพิวเตอร์<br />
                        การพัฒนาระบบซอฟต์แวร์และแอปพลิเคชัน และ ด้านฮาร์ดแวร์ได้แก่<br />
                        การพัฒนาอุปกรณ์อิเล็กทรอนิกส์อัจฉริยะ และ สมาร์ทเซ็นเซอร์<br />
                        รวมถึงการเชื่อมโยงเข้าหากันด้วย การศึกษาด้านการสื่อสาร และ<br />
                        เครือข่ายไปจนถึงการประยุกต์ใช้เทคโนโลยีปัญญาประดิษฐ์และวิทยาการข้อมูล โดยผสมผสานความรู้ต่างๆ <br />
                        เหล่านี้เข้ากับกระบวนการทางวิศวกรรมศาสตร์ คณิตศาสตร์ <br />
                        เพื่อออกแบบสร้างนวัตกรรมใหม่ ๆ รวมถึงการใช้งานในอุตสาหกรรม<br />
                        ที่ต้องการระบบไอโอทีและไอที<br />
                        ส่งเสริมให้นักศึกษาต่อยอดนวัตกรรมของตนเอง<br />
                        เพื่อผลิตใช้หรือทำเป็นสตาร์ทอัปเพื่อสร้างธุรกิจของตนเองได้
                    </p>
                </div>
            </div>

            <div className="iot-system-career-section">
                <div className="iot-system-career-header-row">
                    <h2 className="iot-system-career-title">
                        อาชีพที่ประกอบได้หลัง<br />จบการศึกษา
                    </h2>

                    <div className="iot-system-fee-badge">
                        <img src={universityIcon} alt="University" className="fee-badge-icon" />
                        <p className="fee-badge-title">ค่าธรรมเนียม<br />การศึกษา</p>
                        <p className="fee-badge-amount">25,000</p>
                        <p className="fee-badge-unit">บาท/ภาคการศึกษา</p>
                    </div>
                </div>

                <div className="iot-system-career-list-box">
                    <ul className="iot-system-career-list">
                        {careersiot.map((career, index) => (
                            <li key={index}>{career}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Curriculum Structure */}
            <CourseStructureIoT />
        </div>
    );
}
