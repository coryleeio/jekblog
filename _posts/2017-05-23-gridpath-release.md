---
title: Gridpath - a 2D pathfinding solution for Unity3D
description: Announcing my release of Gridpath a 2D centric pathfinding solution for Unity3D
is_post: true
---

![Grid path demo scene](/images/gridpath-demo1.png)

Recently i've been working on a 2D isometric sprite game in my spare time. I'm not sure yet if I intend on publishing it, but that's not what this post is about.

During my experimentation I found that a lot of the existing pathfinding solutions were for 3D games, or didn't quite meet my use case, or were just overly complicated. In my game I needed to be able to make some modifications to the pathfinding system and just wanted something simple where I didn't have to map all my colliders into 3D coordinates or do anything weird in my game code so I wound up writing a standalone pathfinding system.

[You can download it here](https://github.com/coryleeio/gridpath)

The solution is barebones, only a couple hundred lines, but it's multithreaded, fairly fast, MIT licensed, and has a visual debugger(seen above).  It also only supports 2D on an X and Y coordinate plane, so in Unity if you just change your camera to Orthongonal projection and drop this in, you'll have a fairly good starting point for 2D grid and 2D isometric games.

Since the game i'm currently working on is isometric the grid is selfishly orientated the same way that you typically draw using the painters algorithm for 2d isometric games.  That is to say that if you only use sprites of the correct size, and simply iterate the grid you will get depth sorting for free!






