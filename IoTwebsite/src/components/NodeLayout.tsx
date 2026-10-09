import React, { useState, useEffect, useRef } from 'react';
import './NodeLayout.css';

interface NodeData {
    id: string;
    label: string;
    x: number;
    y: number;
    defaultImg: string;
    hoverImg: string;
    link: string;
}

const NodeButton: React.FC<{ node: NodeData, delay: string }> = ({ node, delay }) => {
    const [hover, setHover] = useState(false);

    return (
        <button
            className="node-btn"
            style={{ left: `${node.x}%`, top: `${node.y}%`, '--delay': delay } as React.CSSProperties}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => window.location.href = node.link}
        >
            <img
                src={hover ? node.hoverImg : node.defaultImg}
                alt={node.label}
                className="node-icon"
            />
        </button>
    );
};

const NodeLayout: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsActive(true);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const nodes: NodeData[] = [
        //กลุ่มซ้าย
        { id: 'ierl', label: 'IERL', x: 10, y: 15, defaultImg: '/Home_image/image_40.png', hoverImg: '/Home_image/image_41.png', link: '#' },
        { id: 'aiot', label: 'AIoT', x: 20, y: 15, defaultImg: '/Home_image/image_42.png', hoverImg: '/Home_image/image_43.png', link: '#' },
        { id: 'cyber', label: 'CYBER', x: 30, y: 15, defaultImg: '/Home_image/image_44.png', hoverImg: '/Home_image/image_45.png', link: '#' },
        { id: 'grad', label: 'MASTER AND DOCTOR', x: 20, y: 35, defaultImg: '/Home_image/image_46.png', hoverImg: '/Home_image/image_47.png', link: '#' },
        { id: 'icte', label: 'iCTE', x: 20, y: 70, defaultImg: '/Home_image/image_48.png', hoverImg: '/Home_image/image_49.png', link: '#' },
        { id: 'physio', label: 'PhysIO!', x: 10, y: 85, defaultImg: '/Home_image/image_50.png', hoverImg: '/Home_image/image_51.png', link: '#' },
        { id: 'iota', label: 'IoTa', x: 30, y: 85, defaultImg: '/Home_image/image_52.png', hoverImg: '/Home_image/image_53.png', link: '#' },

        //กลุ่มกลาง
        { id: 'port', label: 'PORTFOLIO 1#', x: 48, y: 55, defaultImg: '/Home_image/image_54.png', hoverImg: '/Home_image/image_55.png', link: '#' },
        { id: 'quota', label: 'QUOTA 2#', x: 58, y: 55, defaultImg: '/Home_image/image_56.png', hoverImg: '/Home_image/image_57.png', link: '#' },
        { id: 'adm', label: 'ADMISSION 3#', x: 48, y: 85, defaultImg: '/Home_image/image_58.png', hoverImg: '/Home_image/image_59.png', link: '#' },
        { id: 'direct', label: 'DIRECT ADMISSION 4#', x: 58, y: 85, defaultImg: '/Home_image/image_60.png', hoverImg: '/Home_image/image_61.png', link: '#' },

        //กลุ่มขวา
        { id: 'phys', label: 'PHYSICS STAFF', x: 75, y: 15, defaultImg: '/Home_image/image_62.png', hoverImg: '/Home_image/image_63.png', link: '#' },
        { id: 'iot_st', label: 'IOT STAFF', x: 92, y: 15, defaultImg: '/Home_image/image_64.png', hoverImg: '/Home_image/image_65.png', link: '#' },
        { id: 'fac', label: 'FACULTY', x: 83, y: 35, defaultImg: '/Home_image/image_66.png', hoverImg: '/Home_image/image_67.png', link: '#' },
        { id: 'contact', label: 'CONTACT', x: 83, y: 85, defaultImg: '/Home_image/image_68.png', hoverImg: '/Home_image/image_69.png', link: '#' },
    ];

    return (
        <div ref={containerRef} className={`node-container ${isActive ? 'active' : ''}`}>
            <div className="title-center">Join Us</div>

            <svg className="svg-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/*กลุ่มซ้าย*/}
                <path d="M 10 15 H 30" className="connector-line" pathLength="100" style={{ '--delay': '0s', '--duration': '0.5s' } as React.CSSProperties} />
                <path d="M 20 15 V 70" className="connector-line" pathLength="100" style={{ '--delay': '0s', '--duration': '1.5s' } as React.CSSProperties} />
                <path d="M 20 70 V 85 H 10" className="connector-line" pathLength="100" style={{ '--delay': '1.5s', '--duration': '0.5s' } as React.CSSProperties} />
                <path d="M 20 85 H 30" className="connector-line" pathLength="100" style={{ '--delay': '2.0s', '--duration': '0.5s' } as React.CSSProperties} />

                {/*กลุ่มกลาง*/}
                <path d="M 48 55 H 58 V 85 H 48 V 55" className="connector-line" pathLength="100" style={{ '--delay': '1.0s', '--duration': '1.0s' } as React.CSSProperties} />

                {/*กลุ่มขวา*/}
                <path d="M 75 15 H 92" className="connector-line" pathLength="100" style={{ '--delay': '0s', '--duration': '0.5s' } as React.CSSProperties} />
                <path d="M 83 15 V 35" className="connector-line" pathLength="100" style={{ '--delay': '0s', '--duration': '0.5s' } as React.CSSProperties} />
                <path d="M 83 35 V 85" className="connector-line" pathLength="100" style={{ '--delay': '0.5s', '--duration': '1.5s' } as React.CSSProperties} />
            </svg>

            {nodes.map(node => {
                let nodeDelay = '0s';
                if (node.y <= 15) nodeDelay = '0s';
                else if (node.y <= 35) nodeDelay = '0.5s';
                else if (node.y <= 55) nodeDelay = '1.0s';
                else if (node.y <= 70) nodeDelay = '1.5s';
                else nodeDelay = '2.0s';

                return <NodeButton key={node.id} node={node} delay={nodeDelay} />;
            })}
        </div>
    );
};

export default NodeLayout;
