const downloadButton = document.querySelector("#projectHeader button");
const header = document.querySelector("#projectHeader");
const headerTitle = document.querySelector("#projectHeader h1");
const subtitle = document.querySelector("#projectHeader p");
const main = document.querySelector("main");
const logo = document.querySelector("#projectHeader img");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectID = urlParams.get('id');

function loadProject() {
var jsonXhr = new XMLHttpRequest();
jsonXhr.open("GET", "projects/" + projectID + "/project.json", true);

jsonXhr.onreadystatechange = function () {
  if (jsonXhr.readyState === 4 && jsonXhr.status === 200) {
    var jsonData = JSON.parse(jsonXhr.responseText);
    headerTitle.innerText = jsonData.project.title;
    subtitle.innerText = jsonData.project.subtitle;
    console.log(jsonData);
  }
};

var mdXhr = new XMLHttpRequest();
mdXhr.open("GET", "projects/" + projectID + "/description.md", true);

mdXhr.onreadystatechange = function () {
  if (mdXhr.readyState === 4 && mdXhr.status === 200) {
    const html = marked.parse(
      mdXhr.responseText.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"")
      )    
      main.appendChild(html.replaceColorCodes());
      console.log(html.replaceColorCodes());
    }
  };
  jsonXhr.send();
  mdXhr.send();
  logo.src = "projects/" + projectID + "/logo.png";
}

loadProject();