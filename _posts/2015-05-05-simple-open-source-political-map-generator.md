---
description: Open source political map generator and the nuances of it's construction.
is_post: true
---

![Final image of map generated using a voronoi diagram](/images/polmapgen1-4.png)


So recently i've been reading some really interesting articles on map generation that inspired me to make the generator that created the map seen above.  

[You can find that generator here](http://corylee.io/political-map-generator)

The source can be found on [my github](https://github.com/coryleeio/political-map-generator) for those that are interested.  One article I read was this excellent [article by Amit Patel](http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/demo.html) detailing the generation of terrain using voronoi diagrams.  It's a very detailed article you can easily spend a few days shuffling through it, and even better, it has the source included. I've never done anything with maps before, but it got me excited so I decided to give it a go.

Amit's generator is beautiful, but it only creates islands, although Amit does provide some advice on how continents might be achieved.  I decided to try my hand at creating a world map initially, but that's a pretty complex problem, and ultimately I decided this might make a good second project, I wanted to limit the scope of this project to a weekend to ensure that it got completed. So I decided to scrap the world map generator for now, and instead repurpose my code into a political map generator.

While researching I also found this [article by Andy Gainey](http://experilous.com/1/blog/post/procedural-planet-generation) about planetary generation in which he breaks a sphere into techtonic plates using a random flood fill algorithm and uses the plates to generate meaningful biomes.  Another facinating read, I highly recommend it if this sort of thing interests you. I liked the idea of using floodfill to create political zones, but I wanted to make sure they didn't all turn out to be the same size.

My approach starts with a Voronoi diagram, like so:


![Voronoi diagram](/images/polmapgen1-1.png)


Voronoi diagrams could warrant a post in their own right and have numerous applications, I suggest checking out the [wikipedia entry](http://en.wikipedia.org/wiki/Voronoi_diagram#Applications) if you would like to learn more about them. 


For fun I applied a random splattering of color to a Voronoi diagram:


![Voronoi diagram with colors applied randomely like stained glass](/images/polmapgen1-2.png)


Now that we have a diagram, we will attempt to break our diagram into a series of political zones, for this I use a random floodfill, performing one step at a time across a series of zones until no cells remain.


The algorithm is pretty simple:

1) I choose a number of random cells all about the map.

2) I define those to be part of a 'zone' and color them as such. Collect a map of zones to adjacent cells. (all the cells adjacent to our starting cell, get added to the zone's adjacency set.)

3) I loop through my zones, and while the zone has any adjacent cells that are not already part of a zone, choose ANY adjacent cell. We'll call this little guy X.

4) If X already belongs to another zone, remove it from the list of adjacent nodes.  Otherwise, add X to the zone, add the zones' color,  and add any nodes adjacent to X to the list of nodes adjacent to your zone.

5) Return to 3 until there are no adjacent nodes to any zone that don't belong to a zone.


Here is the result of the process above:


![political zones defined with no water yet added](/images/polmapgen1-3.png)


Now I know, this is totally not efficient, BUT it does result in pretty erratic zone selection, since the algorithm doesn't always color a cell, they don't all expand at the same rate, which is great as not all countries are the same size. 


The next step is to simply drop some of the zones into the ocean, but which ones?  My wife actually suggested just dropping the ones along the edges at random.  I assign a percentile chance that a plate will be turned into water, and simply loop through the plates touching the outer boundary and check if I should turn that plate into water.  It works surprisingly well given how erratic the floodfill is. Especially with the default settings.  I also go ahead and remove the lines that I was drawing inside the plates, and add a darker border when drawing the voronoi cells along the edge of the zone just to make it more 'map like'.


Here is our example map after dropping plates off of the edges at random, and cleaning up the insides of our zones:

![Final image of generated polticial zones with water](/images/polmapgen1-4.png)





Due to the erraticness of the floodfill, you can simply set the water percentage to 100% and get islands:


![political island picture](/images/polmapgen2-4.png)


Single, and multiple islands can be produced in addition to bays, continents, etc.  The implementation is relatively trivial and can be put together in an evening or two, (or just use mine!).  I'm going to definitely make a more thorough attempt at map generation in the future as it's a particiuarly interesting area of study.

To finish up I used a framework called [Dat.GUI](https://code.google.com/p/dat-gui/) to expose some controls such as the water amount, number of voronoi cells, number of zones, and a jpeg export for your convenience.

Everything i wrote is MIT licensed, so feel free to use it as is, or chop it up for use in your own projects.  Just let me know if you do so I can feel cool. Be sure to (as always) check the nested libraries licenses before you proceed however.


I hope this is useful or entertaining to someone out there, and I will try and get around to making more posts like this in the future so check back.