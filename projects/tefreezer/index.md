---
name: "teFreezer"
subtitle: "Force your players to refrigerate their food by rotting food in unrefrigerated chests!"
author: "tenkuma"
downloadLink: "https://modrinth.com/plugin/freezer/versions"
logoName: "logo"
logoExtension: "png"
tags: plugin
---
![Tefreezer written in Minecraft-like font in purple.](https://cdn.modrinth.com/data/cached_images/0aaabfb51609876ece6de83e62b9641a4635fad9_0.webp)

teFreezer is a fork of [Freezer by outadoc](https://dev.bukkit.org/projects/freezer), logo by [malcolmriley](https://github.com/malcolmriley/unused-textures/blob/master/items/food_pepper.png).

This plugins purpose is to force people in your server to refrigerate their food by placing a cold block around their chest with the food. In case there is no cold block around the chest, it will turn the food into a rotted item.

## Configuration
In the ```config.yml``` you can set these values:
- Cold blocks
- Resulting itens
- Itens that can rot
- Message for when the user let food rot

## Why fork?
I have forked this plugin because I was really anoyed by the original plugin that broadcasts the message to the whole server once anyone let food rot and the lack of a configuration file.