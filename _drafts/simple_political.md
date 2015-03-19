
![My helpful screenshot]({{ site.url }}/images/polmapgen1-4.png)


So recently i've been reading some really interesting articles on map generation that inspired me to make the generator that created the map seen above.  You can find that generator here, and the sourcecode can be found on my github for those that are interested.  One article I read was this excellent article by Amit Patel detailing the generation of terrain using voronoi diagrams.  It's a very detailed article you can easily spend a few days shuffling through it, and even better, it has the source included. I've never done anything with maps before, but it got me excited so I decided to give it a go.

Amit's generator is beautiful, but it only creates islands, although Amit does provide some advice on how continents might be achieved.  I decided to try my hand at creating a world map initially, but sort of fell short trying to wrap the voronoi diagram around a sphere. I decided this might make a good second project, and that my first goal should be to complete something, and put it on this blog. I've a bad habbit of making overly ambitious projects and then scrapping them without ever releasing them to anyone.  As such, I wanted to keep this project short and sweet, but meaningful and useful as well. So I decided to scrap that idea, and instead repurpose my code into a political map generator.

While researching I also found this article by XXXXX about planetary generation in which he breaks a sphere into techtonic plates using a random flood fill algorithm and uses the plates to generate meaningful biomes.  Another facinating read, I highly recommend it if this sort of thing interests you. I liked the idea of using floodfill to create political zones, but I wanted to make sure they didn't all turn out to be the same size.

My approach starts with a Voronoi diagram, like so:

![My helpful screenshot]({{ site.url }}/images/polmapgen1-1.png)

Voronoi diagrams could warrant a post in their own right and have numerous applications, I suggest checking out the [wikipedia entry](http://en.wikipedia.org/wiki/Voronoi_diagram#Applications) if you would like to learn more about them. 

For fun I applied a random splattering of color to a Voronoi diagram:

![My helpful screenshot]({{ site.url }}/images/polmapgen1-2.png)



Now that we have a diagram, and color, we will attempt to break our diagram into a series of political zones, for this i use a random floodfill, performing one step at a time across a series of zones until no cells remain.

The algorithm is pretty simple:

1) I choose a number of random cells all about the map.

2) I define those to be part of a 'zone' and color them as such.

3) I loop through my zones, and while the zone has any adjacent cells that are not already part of a zone, choose ANY adjacent cell.

4) if it already belongs to another zone, remove it from the list of adjacent nodes.  Otherwise, add it to the zone,add the zones' color,  and add any adjacent nodes to the list of nodes adjacent to your zone.

Just repeat until there's no nodes adjacent to any zones.

Here is the result of the process below:

![My helpful screenshot]({{ site.url }}/images/polmapgen1-3.png)

Now I know, this is totally not efficient, BUT it does result in pretty erratic zone selection, which is great. 


The next step is to simply drop some of the zones into the ocean, but which ones?  My wife actually suggested just dropping the ones along the edges at random.  I assign a percentile chance that a plate will be turned into water, and simply loop through the plates touching the outer boundary and check if I should turn that plate into water.  It works surprisingly well given how erratic the floodfill is. I also go ahead and remove the lines that I was drawing inside the plates, and add a darker border when drawing the voronoi cells along the edge of the zone just to make it more 'map like'.
Here is our example map after dropping plates off of the edges at random, and cleaning up the insides of our zones:

![My helpful screenshot]({{ site.url }}/images/polmapgen1-4.png)





Due to the erraticness of the floodfill, you can simply set the water percentage to 100% and get islands:


![My helpful screenshot]({{ site.url }}/images/polmapgen2-4.png)


Single, and multiple islands can be produced in addition to bays, continents, etc.  The implementation is relatively trivial and can be put together in an evening or two, (or just use mine!), and I was kind of proud of it for a first attempt so I thought I'd show it off here.  I'm going to definitely make another attempt at map generation in the future as it's a particiuarly interesting area of study.


I hope this is useful or entertaining to someone out there, and I will try and get around to making more posts like this in the future so check back.