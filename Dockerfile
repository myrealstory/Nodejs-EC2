#Step 1 :Base Image
FROM node:16.20.2-alpine

#Step 2 : set working Directory
WORKDIR /usr/src/app

#Step 3 :Install dependecies
COPY package.json package-lock.json ./
RUN npm install husky -g ;

#Step 4 : Copy application code
COPY . .

#Step 5 : Build the TypeScript Application
RUN npx tsc

#Step 6 : Expose the port
EXPOSE 3000

#Step 7 : Start the application
CMD ["node", "dist/app.js"]
