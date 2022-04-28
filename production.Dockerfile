#STAGE1
from node as jelxbuild
workdir /app
copy package.json .
run npm install
copy . .
env HOST="0.0.0.0"
run ["npm", "run", "build"]
#STAGE2
from nginx
copy --from=jelxbuild /app/build /usr/share/nginx/html
