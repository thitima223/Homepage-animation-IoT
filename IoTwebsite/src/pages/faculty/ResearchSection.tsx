import { ExternalLink } from "lucide-react";

type ResearchItem = {
  image?: string;
  link?: string;
};

type Props = {
  research?: ResearchItem[];
};

export default function ResearchSection({ research }: Props) {
  if (!research || research.length === 0) return null;

  return (
    <section className="research-section">
      <div className="research-grid">
        {research.map((item, index) => {
          // Case 1: image + link
          if (item.image && item.link) {
            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="research-card animate-on-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img src={item.image} alt="Research Presentation" />
                <div className="research-overlay">
                  <ExternalLink size={24} color="white" />
                </div>
              </a>
            );
          }

          // Case 2: image only
          if (item.image) {
            return (
              <div
                key={index}
                className="research-card animate-on-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img src={item.image} alt="Research Presentation" />
              </div>
            );
          }

          // Case 3: link only
          if (item.link && !item.image) {
            return (
              <div
                key={index}
                className="research-link-line animate-on-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ExternalLink size={16} className="icon-accent" />
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.link}
                </a>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}