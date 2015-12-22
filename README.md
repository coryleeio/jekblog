# jekblog
A blog written in the Jekyll framework

docker rm -f jekyll
rm -rf ./dist

docker run --rm --name jekyll --volume=/$(pwd):/srv/jekyll -p $(docker-machine ip `docker-machine active`):4000:4000    tal --force_polling jekyll serve --increment
