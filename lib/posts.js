
import got from 'got';

// Custom SQL REST API endpoint for Projects
const dataURL =
  'https://dev-srjc-fall-2026-cs-55-13.pantheonsite.io/wp-json/twentytwentyfive-child/v1/projects';

// Retrieve projects from WordPress
async function getProjects() {
  try {
    const response = await got(dataURL);
    return JSON.parse(response.body);
  } catch (error) {
    console.error('Error retrieving projects from WordPress:', error);
    throw error;
  }
}

// Get all project IDs for Next.js dynamic routes
export async function getAllPostIds() {
  const projects = await getProjects();

  return projects.map(item => ({
    params: {
      id: item.ID.toString(),
    },
  }));
}

// Get the project list, sorted alphabetically
export async function getSortedPostsData() {
  const projects = await getProjects();

  projects.sort((a, b) => {
    return a.project_name.localeCompare(b.project_name);
  });

  return projects.map(item => ({
    id: item.ID.toString(),
    name: item.project_name,
    date: item.completion_date,
  }));
}

// Get the details of a specific project
export async function getPostData(idRequested) {
  const projects = await getProjects();

  const project = projects.find(item => {
    return item.ID.toString() === idRequested;
  });

  if (!project) {
    return {};
  }

  return {
    ...project,
    title: project.project_name,
    date: project.completion_date,
    description: project.description,
    technologies: project.technologies,
    projectUrl: project.project_url,
    completionDate: project.completion_date,
  };
}
