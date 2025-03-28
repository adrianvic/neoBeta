const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectID = urlParams.get('id');

async function getProjectJSON(id = projectID) {
  const response = await fetch(`projects/${id}/project.json`);
  if (!response.ok) throw new Error("Failed to fetch project JSON");
  return response.json();
}

async function getProjectDescription(obj, id = projectID) {
  const response = await fetch(`projects/${id}/description.md`);
  if (response.ok) {
    const text = await response.text();
    obj.innerHTML = marked.parse(text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""));
  }
}

async function loadProject(id = projectID, objTitle, objSubtitle, objDescription, objLogo) {
  try {
    const jsonData = await getProjectJSON(id);

    if (objTitle) objTitle.innerText = jsonData.project.title;
    if (objSubtitle) objSubtitle.innerText = jsonData.project.subtitle;
    
    if (objDescription) await getProjectDescription(objDescription, id);
    if (objLogo) objLogo.src = `projects/${id}/logo.png`;

  } catch (error) {
    console.error("Error loading project:", error);
  }
}
