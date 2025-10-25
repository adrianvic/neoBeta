---
name: "The Devil Within"
subtitle: "Adds enchanting to Minecraft Beta. Supports balancing through curses."
author: "tenkuma"
downloadLink: "https://modrinth.com/plugin/devilwithin/versions"
logoName: "logo"
logoExtension: "png"
tags: plugin
---
This plugin is a remake of [GoldEnchant](https://dev.bukkit.org/projects/goldenchant/).
This plugin depends on [tenkumaLib](https://modrinth.com/plugin/tenkumalib).

Have you ever wanted to have enchantments in your beta server? This is the plugin you want.

## Enchanting
To enchant a armor piece you need to interact to a diamond block with a diamond armor piece in your hand.

## Enchantments and Curses
All of those enchantments will not take effect if the damage exceeds the player's HP. An armor get cursed if it's durability is below 30%. Spooky bad stuff will happen if your armor is cursed :D

### Helmet
 - Prevents the player from drowning.
 - The player cannot sleep. If the player try to sleep a entity will tell the player the text set in the config.

### Chestplate
 - Prevents fire damage. Does not prevent lava damage.
 - Protects the player from fire damage only half of the time, also has a 25% chance to ignite the player every time it takes damage.

### Leggings
 - Nothing for now. Only useful for the full-set perks.
 - Makes player run slower 50% of the time a PlayerMoveEvent happens. The speed is randomly generated.

### Boots
Prevents fall damage.

### Full-set perks
If the player has a full-set of enchanted armor the condition of the damage being taken if it's greater than the player's HP is ignored, also the player gets immune to contact damage (cactus), lava damage and lava damage.

## Config
Everything is explained in the config file's comments, in case it changes.