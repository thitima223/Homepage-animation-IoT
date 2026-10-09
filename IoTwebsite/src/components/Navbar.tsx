import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const controlNavbar = () => {
			if (window.scrollY > lastScrollY && window.scrollY > 100) {
				// Scrolling down
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}
			setLastScrollY(window.scrollY);
		};

		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	return (
		<nav className={`navbar ${!isVisible ? 'navbar-hidden' : ''}`}>
			<div className="nav-brand">
				<NavLink to="/">
					<img src="/Home_image/image_01.png" alt="Logo" className="logo-img" />
				</NavLink>
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