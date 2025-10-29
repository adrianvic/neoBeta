---
layout: "base.njk"
---
## How can I get my project here?

neoBeta is an open-source content management system. There are various ways you can put your plugin/mod on our catalog:
 - Clone [neoBeta's repository](https://github.com/adrianvic/neoBeta), create your project folder inside the /projects directory with the necessary metadata (index.md for project description, index.json for metadata and any other file your project may depend on) and make a pull request. Less manual work on our side, so review should be quickier.
 - Open an issue on our GitHub repository with the project information. This may take longer as a contributor will have to spend time creating the project files, but is useful if you're not confortable using Git.
 - Host your own instance of neoBeta.

### Required metadata fields
 - *name* - project name.  
 - *subtitle* - project's brief description.  
 - *author* - your author name, must be consistent across all your submissions.  
 - *tags* - whether your project is a plugin or mod.  

### Optional metadata fields
Please fill as many fields as possible.  
 - *images* - lists of image files names or URLs that will appear in the project page.  
 - *logo* - your logo file name or URL.  

### Releases metadata
 - *releasesType* - wheter your project uses `local` releases or `github`.
For local releases:
 - *releases* - a list of relases labels and links.
For GitHub releases:
 - *githubRepoOwner* - username of the repo owner.
 - *githubReponame* - name of the repository.

### Config file example
```
{
    "name": "Ghosts 'n Stuff",
    "subtitle": "Miscellaneous additions to your Minecraft server.",
    "author": "tenkuma",
    "downloadLink": "https://modrinth.com/plugin/ghosts/versions",
    "images": ["anti-spam.png", "rainbow-chat.png", "skibidi-blocker.png"],
    "logo": "logo.png",
    "tags": ["plugin"],
    "links": {
        "GitHub": "https://github.com/adrianvic/ghostsandstuff",
        "Disroot Git": "https://git.disroot.org/adrianvictor/ghostsandstuff"
    },
    "docs": {
        "Installation" : "docs/installation"
    },
    "releaseType": "github or local",
    "githubRepoOwner": "adrianvic",
    "githubRepoName": "ghostsandstuff",
    "releases": {
        "test release": "https://example.com/"
    }
}```