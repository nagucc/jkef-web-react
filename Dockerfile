FROM node

ADD *.js /jkef/
ADD *.json /jkef/
ADD src /jkef/src
ADD static /jkef/static
ADD tools /jkef/tools
ADD lib /jkef/lib
WORKDIR /jkef

RUN npm install
RUN npm run build --release
EXPOSE 5000

CMD node build/server.js