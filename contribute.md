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
 ```"name": "Ghosts 'n Stuff"```
 - *subtitle* - project's brief description.  
 ```"subtitle": "Miscellaneous additions to your server."```
 - *author* - your author name, must be consistent across all your submissions.  
 ```"author": "tenkuma"```
 - *tags* - whether your project is a plugin or mod.  
 ```"tags": ["plugin", "mod"]```

### Optional metadata fields
Please fill as many fields as possible.
 - *downloadLink* - link for when you click the download link.  
 ```"downloadLink": "https://example.com"```
 - *images* - lists of image files names or URLs that will appear in the project page.  
 ```"images": "["image1.png", "image2.png", "image3.png"]"```
 - *logo* - your logo file name or URL.  
 ```"logo": "logo.png"```

### Config file example
```
{
    "name": "Ghosts 'n Stuff",
    "subtitle": "Miscellaneous additions to your server.",
    "author": "tenkuma",
    "downloadLink": "https://example.com",
    "images": "["image1.png", "image2.png", "image3.png"]",
    "logo": "logo.png",
    "tags": ["plugin", "mod"]
}
```