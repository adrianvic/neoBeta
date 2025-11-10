<img width="80" height="80" alt="image" src="https://i.postimg.cc/SsRzHt4Y/image.png" />

# neoBeta
> [!IMPORTANT]  
> I don't know what I'm doing. *I'm learning.* This project is a hobby, but I'm always trying to improve it, hope it's worthy of having your project listed here!

This is a static CMS (content management system) made with eleventy for Minecraft mods.

## Why?
Because I love beta Minecraft mods, plugins and texture-packs! And I'm fascinated with static websites that do not juice the user's CPU. Also, I need to spend my free time with something...

## TODO
 - [ ] Listing projects in the artist page.
 - [ ] Building a single-file repo index for clients to work with ([like what F-Droid does](https://f-droid.org/docs/Setup_an_F-Droid_App_Repo/))

## Project structure
New projects can be added to `/src/project` and need to follow a specific structure for proper recognition:

```graphql
/src/projects/exampleproject/* 
  ├─ index.md - # The text text content for the project page.
  ├─ index.json - # Project metadata.
  ├─ logo.png - # Project logo, can be defined to have a different name in the metadata.
  └─ docs/* - # Documentation files, will automatically pick up.
     ├─ install.md - # Example documentation page for installing the plugin.
     ├─ uninstall.md - # And for uninstalling.
     ├─ upgrade.md - #  And for upgrading.
     └─ manage_players.md - # And for managing players.
```

Files used in the project page can be added to it's directory and referenced relatively to the current working dir.

## Project metadata
### Required metadata fields
 - *name* - project name.  
 - *subtitle* - project's brief description.  
 - *author* - your author name, must be consistent across all your submissions.  
 - *tags* - whether your project is a plugin or mod.  

### Optional metadata fields
 - *images* - lists of image files names or URLs that will appear in the project page.  
 - *logo* - your logo file name or URL.
 - *gameVersions* - taget Minecraft versions.
 - *gameLoaders* - supported modloaders.

### Releases metadata
 - *releasesType* - wheter your project uses `local` releases or `github`.

#### For local releases:
 - *releases* - a list of relases labels and links.  
    - *name* - name of the release.  
    - *version* - version of the release.  
    - *gameVersions* - taget Minecraft versions (overrides default value).  
    - *gameLoaders* - supported modloaders (overrides default value).  
    - *downloads* - list of download links for this release.

#### For GitHub releases:
 - *githubRepoOwner* - username of the repo owner.
 - *githubReponame* - name of the repository.

Example index.json for a project:
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
    "gameLoaders": ["Craftbukkit"]
    "releases": [
        {
            "name": "The first release.",
            "version": "1.0.0",
            "gameVersions": ["b1.7.3"],
            "downloads": {
                "GitHub": "https://example.com",
                "Modrinth": "https://modrinth.com"
            }
        }
    ]
}
```

## Authors structure
The structure for adding new author pages is mostly like the one for project pages:

```graphql
/src/authors/exampleauthor/* 
  ├─ index.md - # The text text content for the author page (bio).
  ├─ index.json - # Author metadata.
  └─ logo.png - # Author logo, can be defined to have a different name in the metadata.
```

The metadata is the same as the projects, however stripped down. The only values are `name`, `subtitle`, `logo` and `images`.

## GitHub API integration
neoBeta can log into a GitHub account using oAuth, this is used to automatically fetch project releases from a GitHub repository. This is needed because GitHub's API has a limit of 60 requests for users that are not authenticated.

Beforing using this integration you need to populate the enviroment variables `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` with your own oAuth information, and run `gen-github-token.cjs`. A web server will be started locally (default port is `9876`), redirecting you to GitHub's oAuth screen, after logging in the script will populate `GITHUB_ACCESS_TOKEN` to your `.env`. You can set `GITHUB_ACCESS_TOKEN` directly if you have one.

## Search
Search is provided statically by [elasticlunr](http://elasticlunr.com/). The search index is compiled every time neoBeta is built. From my searches I'm confident elasticlunr will be enough for searching the project base for a sufficient period of time, if it ever get unrealistically heavy to the end-user other solutions will be explored.

## Contributing
### Adding new projects
> [!NOTE]  
> I know it's quirky to download neoBeta's whole codebase to add projects, that's why I'll be looking into splitting the projects into a separate repo.

neoBeta is intended to be crowd-sourced, so you can clone our repo, add your plugin page with the ''correct metadata'' and make a merge request. Be sure that you have the necessary rights to upload the project or proper authorization of the creator, open-source projects are better in that matter.

You can also open an issue or send me an [e-mail](mailto:adrianvictor+neobeta@disroot.org) with your project info, or a link for a place with relevant info so I can add your project to our database.

### With code
Feel free to submit your contributions to this repo ^^

### With money
I'm not accepting money as contribution because I cannot guarantee that any money contribution will result in enhancements to this project. I am a full time student, this is a hobby.
