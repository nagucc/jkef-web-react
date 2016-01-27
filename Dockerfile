FROM node
RUN npm install cnpm -g
RUN cnpm install
RUN npm run build --release
EXPOSE 5000

CMD node build/server.js