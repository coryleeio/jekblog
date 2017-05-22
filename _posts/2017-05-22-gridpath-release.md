---
title: Gridpath - A 2D A* pathfinding solution for Unity3D
description: Announcing the release of Gridpath a 2D centric pathfinding solution for Unity3D
is_post: true
---

![Grid path demo scene](/images/gridpath-demo1.png)

Recently, I've been working on a 2D isometric sprite game in my spare time. During my experimentation, I found that a lot of the existing pathfinding solutions were for 3D games or didn't quite meet my use case or were just overly complicated. In my game, I needed to be able to make some modifications to the pathfinding system and just wanted something simple where I didn't have to map all my colliders into 3D coordinates or do anything weird in my game code. So I wound up writing a standalone pathfinding system.

I decided to publish said system as a stand-alone module in hopes that it will help others in a similar situation or serve as a good starting point for someone. 

[You can download it here](https://github.com/coryleeio/gridpath)

The solution is barebones, only a couple hundred lines, but it's multithreaded, fairly fast, MIT licensed, and has a visual debugger (seen above).  It was designed specifically to support 2D on an X and Y coordinate plane, so in Unity if you just change your camera to Orthongonal projection and drop this in, you'll have a fairly good starting point for 2D grid and 2D isometric games.

Since the game I'm currently working on is isometric, I selfishly oriented the same way that you typically draw using the painters algorithm for 2d isometric games. 

![Grid path demo scene graph](/images/gridpath-demo2.png)

As a bonus, the demo scene includes most of the math required to get you started with an isometric game grid of size 64x32 with 64x64 sprites, all adjusted for the rotated grid.

I wont try to explain A* here, as there are already a plethora of great resources available on the topic. Here are some of my favorites:

- [Patrick Lester article on A* pathfinding](http://www.policyalmanac.org/games/aStarTutorial.htm)

- [Amit Pattel's reference on A*](http://www-cs-students.stanford.edu/~amitp/gameprog.html#Paths)

The project contains a README.md explaining the various ways it can be utilized, and an example scene.

Enjoy, and let me know if you have any questions/comments =]






