
import got from 'got';

// Custom SQL REST API endpoint for Web Skills
const dataURL =
  'https://dev-srjc-fall-2026-cs-55-13.pantheonsite.io/wp-json/twentytwentyfive-child/v1/web-skills';

// Retrieve Web Skills from WordPress
async function getWebSkills() {
  try {
    const response = await got(dataURL);
    return JSON.parse(response.body);
  } catch (error) {
    console.error('Error retrieving Web Skills from WordPress:', error);
    throw error;
  }
}

// Get all Web Skill IDs for Next.js dynamic routes
export async function getAllWebSkillIds() {
  const skills = await getWebSkills();

  return skills.map(item => ({
    params: {
      id: item.ID.toString(),
    },
  }));
}

// Get Web Skills sorted alphabetically
export async function getSortedWebSkillsData() {
  const skills = await getWebSkills();

  skills.sort((a, b) => {
    return a.skill_name.localeCompare(b.skill_name);
  });

  return skills.map(item => ({
    id: item.ID.toString(),
    name: item.skill_name,
    category: item.category,
  }));
}

// Get the details of a specific Web Skill
export async function getWebSkillData(idRequested) {
  const skills = await getWebSkills();

  const skill = skills.find(item => {
    return item.ID.toString() === idRequested;
  });

  if (!skill) {
    return {};
  }

  return {
    ...skill,
    title: skill.skill_name,
    category: skill.category,
    description: skill.description,
    officialUrl: skill.official_url,
    content: skill.post_content,
  };
}
