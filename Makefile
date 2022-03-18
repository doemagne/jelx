PROGRAM=jelx

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
