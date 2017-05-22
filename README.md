# jekblog
A blog written in the Jekyll framework currently living at: [corylee.io](http://corylee.io)

### Requirements: 
[Docker](https://www.docker.com/)
[Docker Compose](https://docs.docker.com/compose/install/)


#### Start

	git clone https://github.com/coryleeio/jekblog
	$ git submodule update --init --recursive
	docker-compose up

##### Publish

	aws s3 sync ./dist s3://corylee.io --cache-control="max-age=300" --profile cory --sse --delete

##### Add a new project

	$ git submodule add git@github.com:coryleeio/political-map-generator.git
