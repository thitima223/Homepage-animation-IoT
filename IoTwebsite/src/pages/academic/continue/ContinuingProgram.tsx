import './ContinuingProgram.css';
import universityIcon from '../../../assets/university_icon.svg';
import CourseStructureContinue from './course_structure/CourseStructure';

const careersContinue = [
    'วิศวกรรมระบบไอโอที (IoT Engineer)',
    'วิศวกรรมระบบสารสนเทศ (Information System Engineer)',
    'วิศวกรรมระบบสมองกลฝังตัว (Embedded System Engineer)',
    'วิศวกรรมซอฟต์แวร์ระบบสมองกลฝังตัว (Embedded Software Engineer)',
    'นักพัฒนาแอพพลิเคชัน (Application Developer)',
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
    'นักวิจัย นักวิชาการ เจ้าของธุรกิจส่วนตัว และอาชีพอื่นๆ ที่เกี่ยวข้องกับทางด้านคอมพิวเตอร์ หรือไอที ทั้งหมด',
];

export default function ContinuingProgram() {
    return (
        <div className="continuing-program-page">
            <div className="continuing-program-header">
                <h1 className="continuing-program-title-en">
                    COMPUTER AND IOT <span>(Continuing program)</span>
                </h1>
                <p className="continuing-program-subtitle-en">Bachelor of Engineering</p>
            </div>

            <div className="continuing-program-content">
                <div className="continuing-program-hero-card">
                    <h2 className="continuing-program-card-title">
                        ทำไมต้องเรียนไอโอทีหลักสูตร<br />ต่อเนื่องที่ลาดกระบัง?
                    </h2>
                    <div className="continuing-program-divider"></div>
                    <p className="continuing-program-card-text">
                        หลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ มุ่งเน้นไปที่การศึกษา
                        การเชื่อมโยงองค์ประกอบของโลกดิจิทัลเข้าด้วยกัน ทั้งศึกษาที่เรียน
                        ในหลักสูตรนี้จะได้ศึกษาและปฏิบัติเกี่ยวข้องกับด้านเทคโนโลยี ระบบ
                        ไอโอทีและสารสนเทศโดยอาศัยความรู้พื้นฐาน ทั้งด้านซอฟต์แวร์
                        ประกอบด้วย การเขียนโปรแกรมคอมพิวเตอร์ การพัฒนาระบบ
                        ซอฟต์แวร์และแอพพลิเคชัน และ ด้านฮาร์ดแวร์ได้แก่ การพัฒนา
                        อุปกรณ์อิเล็กทรอนิกส์อัจฉริยะ และ สมาร์ทเซนเซอร์ รวมถึงการ
                        เชื่อมโยงเข้าหากันด้วย การศึกษาด้านการสื่อสาร และ เครือข่าย
                        ไปจนถึงการประยุกต์ใช้เทคโนโลยีปัญญาประดิษฐ์และวิทยาการ
                        ข้อมูล โดยผสมผสานความรู้ต่างๆ เหล่านี้เข้ากับกระบวนการทาง
                        วิศวกรรมศาสตร์ คณิตศาสตร์ เพื่อออกแบบสร้างนวัตกรรมใหม่ๆ
                        รวมถึงการใช้งานในอุตสาหกรรม ที่ต้องการระบบไอโอทีและไอที
                        ส่งเสริมให้นักศึกษาต่อยอดนวัตกรรมของตนเอง เพื่อผลิตใช้หรือ
                        ทำเป็นสตาร์ทอัพเพื่อสร้างธุรกิจของตนเองได้
                    </p>
                </div>
            </div>

            <div className="continuing-program-career-section">
                <div className="continuing-program-career-header">
                    <h2 className="continuing-program-career-title">
                        อาชีพที่ประกอบได้หลังจบการศึกษา
                    </h2>
                    <div className="continuing-program-fee-ribbon">
                        <div className="ribbon-border-inner">
                            <img src={universityIcon} alt="University" className="ribbon-icon" />
                            <p className="ribbon-text">ค่าธรรมเนียมการศึกษา</p>
                            <p className="ribbon-amount">25,000</p>
                            <p className="ribbon-unit">บาท/ภาคการศึกษา</p>
                        </div>
                    </div>
                </div>

                <div className="continuing-program-career-list-box">
                    <ul className="continuing-program-career-grid">
                        {careersContinue.map((career, index) => (
                            <li key={index} className="continuing-program-career-item">
                                <span className="career-bullet"></span>
                                {career}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Curriculum Structure */}
            <CourseStructureContinue />
        </div>
    );
}
