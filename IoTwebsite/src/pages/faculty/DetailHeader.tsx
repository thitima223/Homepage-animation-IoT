import { UserCheck } from "lucide-react";

type Person = {
  name: string;
  position?: string;
  email?: string;
  englishName?: string;
};

function DetailHeader({ person }: { person: Person }) {
  return (
    <div className="detail-header-container">
      <div className="header-identity-block">
        <div className="name-indicator"></div>
        <h1 className="prof-name-main">{person.name}</h1>
      </div>

      {person.position && (
        <div className="prof-position-badge">
          <UserCheck size={14} />
          <span>{person.position}</span>
        </div>
      )}

      {person.englishName && (
        <div className="prof-name-en-sub">{person.englishName}</div>
      )}
    </div>
  );
}

export default DetailHeader;