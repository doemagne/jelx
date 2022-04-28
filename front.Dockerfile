from node
workdir /app
copy package.json .
run npm install
copy . .
env HOST="0.0.0.0"
expose 3000
#port 3000:3000
cmd ["npm", "start"]

