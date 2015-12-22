# jekblog
A blog written in the Jekyll framework
#### Checkout project
`$ git checkout --recursive git@github.com:iskar909/jekblog.git`

#### Update submodules
`$ git submodule update --init --recursive`


#### Purge old containers
	docker rm -f jekyll
	rm -rf ./dist
#### Run project
	docker run --rm --name jekyll --volume=/$(pwd):/srv/jekyll -p $(docker-machine ip `docker-machine active`):4000:4000    tal --force_polling jekyll serve --increment
