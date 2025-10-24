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

async function loadProject(id = projectID, objTitle, objSubtitle, objAuthor, objDescription, objLogo, objDownloadLink, changeColor, changeBackground) {
  try {
    const jsonData = await getProjectJSON(id);
    document.title = `${jsonData.project.author}:${id}@neoBeta`
    
    if (objTitle) objTitle.innerText = jsonData.project.title;
    if (objSubtitle) objSubtitle.innerText = jsonData.project.subtitle;
    if (objAuthor) objAuthor.innerText = `by ${jsonData.project.author}`;
    
    if (objDescription) await getProjectDescription(objDescription, id);
    
    if (jsonData.project.downloadLink) {
      if (objDownloadLink) objDownloadLink.href = jsonData.project.downloadLink;
    } else {
      if (objDownloadLink) objDownloadLink.innerText = "Download unavailable";
    }
    
    if (jsonData.project.displayLogo == true) {
      if (objLogo) objLogo.src = `projects/${id}/logo.png`;
    } else {
      objLogo.remove();
    }
    if (jsonData.project.backgroundColor) {
      changeColor.style.backgroundColor = jsonData.project.backgroundColor;
    }
    if (jsonData.project.backgroundImage) {
      changeBackground.style.backgroundImage = `url(${jsonData.project.backgroundImage})`;
    }
    if (jsonData.project.backgroundImageSize) {
      changeBackground.style.backgroundSize = jsonData.project.backgroundImageSize;
    }
  } catch (error) {
    console.error("Error loading project:", error);
  }
}
