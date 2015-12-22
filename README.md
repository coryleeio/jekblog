# jekblog
A blog written in the Jekyll framework

### Handy commands:

#### Setup docker host with docker-machine
`$ docker-machine create --driver virtualbox dev && eval "$(docker-machine env dev)"`

#### Checkout project
`$ git checkout --recursive git@github.com:iskar909/jekblog.git`

#### Update submodules
`$ git submodule update --init --recursive`

#### Build & Run project (in windows)
	$ docker run --rm --name jekyll --volume=/$(pwd):/srv/jekyll -p $(docker-machine ip `docker-machine active`):80:4000 jekyll/jekyll jekyll serve --force_polling --incremental

#### Build & Run project (in ubuntu)
	$ docker run --rm --name jekyll --volume=$(pwd):/srv/jekyll \ 
	-p $(docker-machine ip `docker-machine active`):80:4000 \ 
	jekyll/jekyll jekyll serve --incremental

#### Purge old containers
	$ docker rm -f jekyll
	$ rm -rf ./dist
