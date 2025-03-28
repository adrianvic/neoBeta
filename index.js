const featuredHelper = document.querySelector("#featuredHelper")

async function loadFeatured() {
    const response = await fetch(`bananas.json`);
    if (!response.ok) {
        featuredHelper.innerHTML = `
        <p>Oops! Failed to fetch featured projects...</p>
        `
        throw new Error("Failed to fetch featured projects JSON");
    }
}