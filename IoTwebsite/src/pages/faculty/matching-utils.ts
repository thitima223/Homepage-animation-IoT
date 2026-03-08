// utils/matching.ts
import type { Professor, Department } from './FacultyData';

/**
 * ✅ คำนวณคะแนนความตรง (0-100)
 * สูตร: (จำนวน expertise ที่ตรง / จำนวนที่นักเรียนเลือก) × 100
 * 
 * @param studentExpertise - รายการความสนใจที่นักเรียนเลือก
 * @param professorExpertise - รายการความเชี่ยวชาญของอาจารย์
 * @returns คะแนนความตรง 0-100
 */
export function calculateMatchScore(
  studentExpertise: string[],
  professorExpertise: string[]
): number {
  if (studentExpertise.length === 0) return 0;
  if (professorExpertise.length === 0) return 0;

  const matches = professorExpertise.filter(exp =>
    studentExpertise.some(studentExp =>
      normalizeExpertise(exp) === normalizeExpertise(studentExp)
    )
  );

  return Math.round((matches.length / studentExpertise.length) * 100);
}

/**
 * ✅ คำนวณคะแนนแบบถ่วงน้ำหนัก
 * บางความสนใจอาจสำคัญกว่าอื่น ๆ
 * 
 * @param studentExpertise - รายการความสนใจที่นักเรียนเลือก
 * @param professorExpertise - รายการความเชี่ยวชาญของอาจารย์
 * @param weights - น้ำหนักของแต่ละความสนใจ (default = 1)
 * @returns คะแนนความตรง 0-100
 */
export function calculateWeightedScore(
  studentExpertise: string[],
  professorExpertise: string[],
  weights: Record<string, number> = {}
): number {
  if (studentExpertise.length === 0) return 0;
  if (professorExpertise.length === 0) return 0;

  const totalWeight = studentExpertise.reduce((sum, exp) =>
    sum + (weights[normalizeExpertise(exp)] || 1), 0
  );

  const matchedWeight = professorExpertise
    .filter(exp =>
      studentExpertise.some(studentExp =>
        normalizeExpertise(exp) === normalizeExpertise(studentExp)
      )
    )
    .reduce((sum, exp) =>
      sum + (weights[normalizeExpertise(exp)] || 1), 0
    );

  return totalWeight > 0
    ? Math.round((matchedWeight / totalWeight) * 100)
    : 0;
}

/**
 * ✅ ดึงรายการ expertise ทั้งหมดแบบไม่ซ้ำ
 * เรียงตามอักษรไทย/อังกฤษ
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param departmentFilter - กรองตามภาควิชา (optional)
 * @returns รายการ expertise ทั้งหมด
 */
export function getAllUniqueExpertise(
  professors: Professor[],
  departmentFilter?: 'all' | Department
): string[] {
  if (!professors || !Array.isArray(professors)) return [];

  let filtered = professors;

  if (departmentFilter && departmentFilter !== 'all') {
    filtered = professors.filter(p => p && p.department_id?.trim() === departmentFilter);
  }

  const set = new Set<string>();
  filtered.forEach(p => {
    if (p && p.expertise && Array.isArray(p.expertise)) {
      p.expertise.forEach(e => {
        if (e && typeof e === 'string') {
          set.add(e.trim());
        }
      });
    }
  });

  return Array.from(set).sort((a, b) => a.localeCompare(b, 'th'));
}

/**
 * ✅ นับจำนวนอาจารย์ในแต่ละ expertise
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param departmentFilter - กรองตามภาควิชา (optional)
 * @returns Object { expertise: count }
 */
export function getExpertiseCount(
  professors: Professor[],
  departmentFilter?: 'all' | Department
): Record<string, number> {
  let filtered = professors;

  if (departmentFilter && departmentFilter !== 'all') {
    filtered = professors.filter(p => p && p.department_id?.trim() === departmentFilter);
  }

  const count: Record<string, number> = {};

  filtered.forEach(p => {
    p.expertise.forEach(exp => {
      const normalized = normalizeExpertise(exp);
      count[normalized] = (count[normalized] || 0) + 1;
    });
  });

  return count;
}

/**
 * ✅ Filter & Sort อาจารย์ตามคะแนนความตรง
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param selectedExpertise - ความสนใจที่นักเรียนเลือก
 * @param departmentFilter - กรองตามภาควิชา (optional)
 * @param minScore - คะแนนขั้นต่ำที่ต้องการ (default = 0)
 * @param limit - จำกัดจำนวนผลลัพธ์ (optional)
 * @returns รายการอาจารย์ที่เรียงตามคะแนน
 */
export function getMatchedProfessors(
  professors: Professor[],
  selectedExpertise: string[],
  departmentFilter?: 'all' | Department,
  minScore: number = 1,
  limit?: number
) {
  if (!professors || !Array.isArray(professors)) return [];
  if (!selectedExpertise || !Array.isArray(selectedExpertise)) return [];

  // Filter by department
  let filtered = professors;
  if (departmentFilter && departmentFilter !== 'all') {
    filtered = professors.filter(p => p && p.department_id?.trim() === departmentFilter);
  }

  // Calculate scores and return sorted list
  const withScores = filtered
    .map(p => ({
      ...p,
      matchScore: calculateMatchScore(selectedExpertise, p.expertise || [])
    }))
    .filter(p => p.matchScore! >= minScore)  // Filter by minimum score
    .sort((a, b) => {
      // Sort by score desc
      if (b.matchScore !== a.matchScore) {
        return (b.matchScore || 0) - (a.matchScore || 0);
      }
      // Then by name th
      return (a.name_th || '').localeCompare(b.name_th || '', 'th');
    });

  // Limit results if specified
  if (limit && limit > 0) {
    return withScores.slice(0, limit);
  }

  return withScores;
}

/**
 * ✅ ค้นหาอาจารย์จากชื่อ หรือ expertise
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param query - คำค้นหา
 * @param searchIn - ค้นหาในฟิลด์ใด ('name', 'expertise', 'both')
 * @returns รายการอาจารย์ที่ตรงกับการค้นหา
 */
export function searchProfessors(
  professors: Professor[],
  query: string,
  searchIn: 'name' | 'expertise' | 'both' = 'both'
): Professor[] {
  if (!query.trim()) return professors;

  const normalizedQuery = query.toLowerCase().trim();

  return professors.filter(p => {
    if (searchIn === 'name' || searchIn === 'both') {
      if (p.name_th.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
    }

    if (searchIn === 'expertise' || searchIn === 'both') {
      if (p.expertise.some(exp =>
        exp.toLowerCase().includes(normalizedQuery)
      )) {
        return true;
      }
    }

    return false;
  });
}

/**
 * ✅ กรองอาจารย์ตามภาควิชา
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param department - ภาควิชาที่ต้องการ
 * @returns รายการอาจารย์ในภาควิชานั้น
 */
export function filterProfessorsByDepartment(
  professors: Professor[],
  department: Department | 'all'
): Professor[] {
  if (department === 'all') return professors;
  return professors.filter(p => p.department_id === department);
}

/**
 * ✅ แยกอาจารย์ตามตำแหน่ง (หัวหน้า, อาจารย์, เจ้าหน้าที่)
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @returns Object แยกตามประเภท
 */
export function categorizeProfessors(professors: Professor[]) {
  const headProfessor = professors.find(p => p.is_head) || professors[0];
  const otherProfessors = professors.filter(p =>
    !p.is_head &&
    !p.position?.includes("เจ้าหน้าที่") &&
    !p.position?.includes("นักวิทยาศาสตร์")
  );
  const staff = professors.filter(p =>
    p.position?.includes("เจ้าหน้าที่") ||
    p.position?.includes("นักวิทยาศาสตร์")
  );

  return {
    headProfessor,
    otherProfessors,
    staff,
    all: professors
  };
}

/**
 * ✅ Normalize expertise string
 * จัดการกับคำที่เขียนต่างกันแต่ความหมายเดียวกัน
 * เช่น "Embedded System" vs "Embedded Systems"
 * 
 * @param expertise - คำความเชี่ยวชาญ
 * @returns คำที่ normalize แล้ว
 */
export function normalizeExpertise(expertise: string): string {
  return expertise
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')          // ลดช่องว่างซ้ำ
    .replace(/systems?$/, 'system') // ระบบ/ระบบs → system
    .replace(/ies$/, 'y')           // categories → category
    .replace(/s$/, '');             // ลบ s ท้ายคำ
}

/**
 * ✅ จัดกลุ่ม expertise ที่คล้ายกัน
 * 
 * @param expertiseList - รายการ expertise ทั้งหมด
 * @returns Object กลุ่ม expertise ที่คล้ายกัน
 */
export function groupSimilarExpertise(expertiseList: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  expertiseList.forEach(exp => {
    const key = normalizeExpertise(exp);
    if (!groups[key]) {
      groups[key] = [];
    }
    if (!groups[key].includes(exp)) {
      groups[key].push(exp);
    }
  });

  return groups;
}

/**
 * ✅ คำนวณสถิติความสนใจ
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param selectedExpertise - ความสนใจที่นักเรียนเลือก
 * @returns Object สถิติต่าง ๆ
 */
export function getMatchingStats(
  professors: Professor[],
  selectedExpertise: string[]
) {
  const totalProfessors = professors.length;
  const matchedProfessors = professors.filter(p =>
    p.expertise.some(exp =>
      selectedExpertise.some(studentExp =>
        normalizeExpertise(exp) === normalizeExpertise(studentExp)
      )
    )
  ).length;

  const avgMatchScore = matchedProfessors > 0
    ? Math.round(
      matchedProfessors / selectedExpertise.length * 100
    )
    : 0;

  const topExpertise = Object.entries(getExpertiseCount(professors))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    totalProfessors,
    matchedProfessors,
    matchRate: totalProfessors > 0
      ? Math.round((matchedProfessors / totalProfessors) * 100)
      : 0,
    avgMatchScore,
    topExpertise: Object.fromEntries(topExpertise)
  };
}

/**
 * ✅ ตรวจสอบว่ามี expertise นี้ในระบบไหม
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param expertise - ความเชี่ยวชาญที่ต้องการตรวจสอบ
 * @returns boolean
 */
export function hasExpertise(
  professors: Professor[],
  expertise: string
): boolean {
  const normalized = normalizeExpertise(expertise);
  return professors.some(p =>
    p.expertise.some(exp => normalizeExpertise(exp) === normalized)
  );
}

/**
 * ✅ แนะนำ expertise ที่เกี่ยวข้อง
 * 
 * @param professors - รายการอาจารย์ทั้งหมด
 * @param selectedExpertise - ความสนใจที่เลือกแล้ว
 * @param limit - จำนวนคำแนะนำ
 * @returns รายการ expertise ที่แนะนำ
 */
export function suggestRelatedExpertise(
  professors: Professor[],
  selectedExpertise: string[],
  limit: number = 5
): string[] {
  const expertiseCount = getExpertiseCount(professors);

  // กรอง expertise ที่ยังไม่เลือก และเรียงตามจำนวนอาจารย์
  return Object.entries(expertiseCount)
    .filter(([exp]) =>
      !selectedExpertise.some(selected =>
        normalizeExpertise(selected) === exp
      )
    )
    .sort((a, b) => b[1] - a[1])  // เรียงตามจำนวนอาจารย์
    .slice(0, limit)
    .map(([exp]) => exp);
}