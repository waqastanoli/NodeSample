# Install node v10
FROM node:14

# Set the workdir /var/www/myapp
WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .


# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 5000


RUN npm install pm2 -g

CMD ["pm2-runtime", "index.js"]
