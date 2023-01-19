FROM node:14.17.5

WORKDIR /code

ENV PORT 3000

COPY package.json /code/package.json

RUN npm install

COPY . /code

# ENV DB_URI "mongodb://localhost/ad-manager-db"

# ENV DB_URI mongodb://mongodb:27017/ad-manager-db

ENV TWILLIO_AUTH "5850a6fc8f195647e2ed1291206494b9"
ENV TWILLIO_SID "ACa56db0c1fc375ff249df361915eee891"
ENV TWILLIO_MSG_SID "MG912e5769642adee38d848d4bab85250f"

ENV SESSION_SECRET "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#"

EXPOSE 3000

CMD [ "npm", "start" ]