

// Update type to accept person object
type Person = {
  name: string;
  position?: string;
  email?: string;
  // Add englishName if you add it to FacultyData later
  englishName?: string; 
};

function DetailHeader({ person }: { person: Person }) {
  return (
    <div className="header-content">
      <h1 className="prof-name-th">{person.name}</h1>
      
      {/* Optional: Display English Name if data exists */}
      {person.englishName && (
        <div className="prof-name-en">{person.englishName}</div>
      )}

      <div className="prof-position">{person.position}</div>
    </div>
  );
}

export default DetailHeader;