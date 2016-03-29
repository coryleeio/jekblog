start: stop
	docker run -d --volume $$(pwd):/srv/jekyll --name jekyll -p 4000:4000 jekyll/jekyll jekyll serve --force_polling --incremental
stop: 
	rm -rf ./dist/; true; \
	docker stop jekyll; true; \
	docker rm jekyll; true;
publish:
	aws s3 sync ./dist s3://corylee.io --cache-control="max-age=300" --sse --delete
