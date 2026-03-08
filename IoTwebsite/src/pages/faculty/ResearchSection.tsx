
type ResearchItem = {
//////// ? คือ optional ////////////
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
<h2>งานวิจัย</h2>
<div className= "research-grid" >
    {research.map((item, index) => {
      // Case 1: image + link
      if (item.image && item.link) {
        return (
           <a
            key={index}
            href={item.link}
            target= "_blank "
            rel= "noopener noreferrer "
            className= "research-card "
           >
             <img src={item.image} alt= "Research " / >
           </a >
        );
      }

      // Case 2: image only
      if (item.image) {
        return (
           <div key={index} className= "research-card " >
             <img src={item.image} alt= "Research " / >
           </div >
        );
      }

      // Case 3: link only
      if (item.link && !item.image) {
        return (
           <div key={index} className= "research-link-line " >
            -{ "  "}
             <a
              href={item.link}
              target= "_blank "
              rel= "noopener noreferrer "
             >
              {item.link}
             </a >
           </div >
        );
      }

      return null;
    })}
   </div >
 </section >
);
}