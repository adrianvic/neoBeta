const featuredHelper = document.querySelector("#featuredHelper");

async function getFeaturedJSON() {
    const response = await fetch(`featured.json`);
    if (!response.ok) { 
        featuredHelper.innerHTML = `
        <p>;( Oopsie! Could not load featured projects...</p>
        `
        throw new Error("Failed to fetch featured projects JSON");
    }

    const data = await response.json();

    data.forEach(project => {
        const featuredDiv = document.createElement("div");
        featuredDiv.classList.add("featuredProject");
        featuredDiv.id = `featured-${project}`;
        featuredDiv.innerHTML = `
            <a href="project.html?id=${project}">
                <img src="projects/${project}/logo.png">
                <p>:${project}</p>
            </a>
        `;
        featuredHelper.appendChild(featuredDiv);

        loadProject(project, document.querySelector(`featured-${project} p`), undefined, undefined, undefined, document.querySelector(`featured-${project} img`))
    });
}

getFeaturedJSON();