import React from 'react';
import {
  Mail,
  Instagram,
  Phone,
  Facebook,
  MessageCircle
} from 'lucide-react';
import './footer.css';

const contactInfo = {
  emails: [
    "iote@kmitl.ac.th",
    "pikulkaew.ta@kmitl.ac.th"
  ],
  socials: [
    { platform: "Instagram", handle: "kmitl.iot.official", icon: <Instagram size={20} /> },
    { platform: "LINE", handle: "@iotekmitl", icon: <MessageCircle size={20} /> },
    { platform: "Facebook", handle: "Department of IoT and Information Engineering, KMITL", icon: <Facebook size={20} /> },
  ],
  phones: [
    "02-329-8000 ext.5129",
    "02-329-8301 ext.235"
  ],
  department: "Department of IoT and Information Engineering, KMITL"
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Desktop Layout */}
        <div className="footer-desktop">

          {/* Logo Column */}
          <div className="footer-logo">
            <img
              src="/path/to/logo.png"
              alt="iCTE KMITL Logo"
            />
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h3 className="footer-title">Contact us</h3>

            {/* Emails */}
            <div className="footer-email">
              <Mail size={20} />
              <div className="footer-email-list">
                {contactInfo.emails.map((email, idx) => (
                  <a key={idx} href={`mailto:${email}`}>
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Social & Info */}
            <div className="footer-info">
              {contactInfo.socials.map((item, idx) => (
                <div key={idx} className="footer-info-item">
                  {item.icon}
                  <span>{item.handle}</span>
                </div>
              ))}

              {/* Phone Numbers */}
              <div className="footer-phone">
                <Phone size={20} />
                <div className="footer-phone-list">
                  {contactInfo.phones.map((phone, idx) => (
                    <span key={idx}>{phone}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-map">
            <h3 className="footer-title">Map</h3>
            <div className="footer-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5332.245443820642!2d100.77177409532945!3d13.727489144864437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664bb802c079%3A0x947a912a091b0339!2z4LiE4LiT4Liw4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4Lio4Liy4Liq4LiV4Lij4LmMIOC4quC4luC4suC4muC4seC4meC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4nuC4o-C4sOC4iOC4reC4oeC5gOC4geC4peC5ieC4suC5gOC4iOC5ieC4suC4hOC4uOC4k-C4l-C4q-C4suC4o-C4peC4suC4lOC4geC4o-C4sOC4muC4seC4hw!5e0!3m2!1sth!2sth!4v1772643195585!5m2!1sth!2sth"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="footer-mobile">

          {/* Mobile Logo */}
          <div className="footer-mobile-logo">
            <img
              src="/path/to/logo.png"
              alt="iCTE KMITL Logo"
            />
          </div>

          <div className="footer-mobile-content">
            {/* Header */}
            <div className="footer-mobile-header">
              <h3 className="footer-title">Contact us</h3>
            </div>

            {/* Email Section */}
            <div className="footer-mobile-section">
              <div className="footer-email">
                <Mail size={20} />
                <div className="footer-email-list footer-text-sm">
                  {contactInfo.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email}`}>
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Social & Info Section */}
            <div className="footer-mobile-section space-y-4">
              {/* Instagram */}
              <div className="footer-info-item">
                <Instagram size={20} />
                <span className="footer-text-sm">kmitl.iot.official</span>
              </div>

              {/* LINE */}
              <div className="footer-info-item">
                <MessageCircle size={20} />
                <span className="footer-text-sm">@iotekmitl</span>
              </div>

              {/* Facebook */}
              <div className="footer-info-item">
                <Facebook size={20} />
                <span className="footer-text-sm">{contactInfo.department}</span>
              </div>

              {/* Phone */}
              <div className="footer-phone">
                <Phone size={20} />
                <div className="footer-phone-list footer-text-sm">
                  {contactInfo.phones.map((phone, idx) => (
                    <span key={idx}>{phone}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section for Mobile */}
            <div className="footer-mobile-section">
              <h3 className="footer-title">Map</h3>
              <div className="footer-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7640!2d100.77477!3d13.72596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6706e5797d09%3A0xe7bc32204c30c80!2sE12%20Building!5e0!3m2!1sen!2sth!4v1741060000000!5m2!1sen!2sth"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location Mobile"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            Developed © 2025 IoT and Information Engineering
            <span className="mobile-break"> </span>
            of King Mongkut's Institute of Technology Ladkrabang
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;