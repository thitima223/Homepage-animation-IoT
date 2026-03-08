import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
	// สร้าง State สำหรับเปิด/ปิดเมนูบนมือถือ (ค่าเริ่มต้นคือ false = ปิดอยู่)
	const [isOpen, setIsOpen] = useState(false);

	// ฟังก์ชันสลับสถานะเปิด/ปิด
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// ฟังก์ชันปิดเมนูเวลาที่กดเลือกลิงก์แล้ว (สำหรับมือถือ)
	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="nav-brand">
				{/* <img src="/logo.png" alt="Logo" className="logo-img" /> ภาพมาเอามาใส่ด้วย!!! */}
				<span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '1.5rem' }}>
					IOTE <span style={{ color: 'white', fontSize: '1rem' }}>KMITL</span>
				</span>
			</div>
			<button className="hamburger" onClick={toggleMenu}>
				{isOpen ? '✖' : '☰'}
			</button>

			{/* ส่วนกล่องแคปซูลเมนูฝั่งขวา */}
			<div className={`nav-links-container ${isOpen ? 'open' : ''}`}>
				<div className="nav-links">
					<NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
					<NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink>
					<NavLink to="/academic" className="nav-link" onClick={closeMenu}>Academic</NavLink>
					<NavLink to="/admission" className="nav-link" onClick={closeMenu}>Admission</NavLink>
					<NavLink to="/faculty" className="nav-link" onClick={closeMenu}>Faculty</NavLink>
				</div>
			</div>
		</nav>
	);
}