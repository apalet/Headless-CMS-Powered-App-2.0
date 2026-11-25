
import got from 'got';

// Custom SQL REST API endpoint for Digital Media Skills
const dataURL =
  'https://dev-srjc-fall-2026-cs-55-13.pantheonsite.io/wp-json/twentytwentyfive-child/v1/digital-media-skills';

// Retrieve Digital Media Skills from WordPress
async function getDigitalMediaSkills() {
  try {
    const response = await got(dataURL);
    return JSON.parse(response.body);
  } catch (error) {
    console.error('Error retrieving Digital Media Skills from WordPress:', error);
    throw error;
  }
}

// Get all Digital Media Skill IDs for Next.js dynamic routes
export async function getAllDigitalMediaSkillIds() {
  const skills = await getDigitalMediaSkills();

  return skills.map(item => ({
    params: {
      id: item.ID.toString(),
    },
  }));
}

// Get Digital Media Skills sorted alphabetically
export async function getSortedDigitalMediaSkillsData() {
  const skills = await getDigitalMediaSkills();

  skills.sort((a, b) => {
    return a.tool_name.localeCompare(b.tool_name);
  });

  return skills.map(item => ({
    id: item.ID.toString(),
    name: item.tool_name,
    category: item.category,
  }));
}

// Get the details of a specific Digital Media Skill
export async function getDigitalMediaSkillData(idRequested) {
  const skills = await getDigitalMediaSkills();

  const skill = skills.find(item => {
    return item.ID.toString() === idRequested;
  });

  if (!skill) {
    return {};
  }

  return {
    ...skill,
    title: skill.tool_name,
    category: skill.category,
    description: skill.description,
    officialUrl: skill.official_url,
    content: skill.post_content,
  };
}
