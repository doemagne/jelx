PROGRAM=jelx

PROGRAMIMG="$(PROGRAM)-image"

#GITHUB
#make sure revision is aligned correctly
REVISION=i
GITMSG="1st commit"
GIT=doemagne
GITURL="github.com"

HOST=0.0.0.0
PORT=3000

start:
	npm start
build:
	npm build

note:
	echo "# $(PROGRAM)" >> README.md

init:
	git init

add:
	git add .

commit:
	git commit -m $(GITMSG)

branch:
	git branch -M main

remote:
	git remote add origin https://$(GITURL)/$(GIT)/$(PROGRAM).git

push:
	git push -u origin main

pushf:
	git push -f -u origin main

status:
	git status

current:
	git branch

master:
	git checkout main

checkout:
	git checkout -b $(REVISION)_upgrade

pushup:
	git push --set-upstream origin $(REVISION)_upgrade

pulldown:
	git pull

main:
	make init
	make add
	make commit
	make branch
	make push
dockerbuilddev:
	docker build -f front.Dockerfile -t jelx-image .
dockerbuild:
	docker build -f production.Dockerfile -t jelx-image .

dockerrunproduction:
	docker run --env ./.env -d -p 80:80 --name react-app-jelx-production $(PROGRAMIMG)

dockerrun:
	docker run --env ./.env -d -v $(pwd)/src:/app/src:ro -p 3000:3000 --name react-app-$(PROGRAM) $(PROGRAMIMG)
	#docker run -d -v /home/pi/jex/src:/app/src -p 3000:3000 --name react-app-$(PROGRAM) $(PROGRAMIMG)
dockerkillc:
	docker rm react-app-$(PROGRAM) -f 
dockerinterface:
	docker exec -it react-app-$(PROGRAM) bash
dockercompose:
	docker-compse up -d --build
dockercomposedown:
	docker-compose down
dockercomposeproduction:
	docker-compose -f docker-compose.yml docker-compose-production.yml up -d --build
######GIT Instructions
#…or create a new repository on the command line
#echo "# jelx" >> README.md
#git init
#git add README.md
#git commit -m "first commit"
#git branch -M main
#git remote add origin https://github.com/doemagne/jelx.git
#git push -u origin main
#…or push an existing repository from the command line
#git remote add origin https://github.com/doemagne/jelx.git
#git branch -M main
#git push -u origin main
