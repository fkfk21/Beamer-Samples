FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
  vim \
  curl \
  wget \
  lsof \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /home/node/ws

COPY ./scripts/init.sh /tmp/init.sh
RUN /tmp/init.sh

COPY --chown=node:node ./scripts/_bashrc /home/node/.bash_aliases

CMD ["npm", "run", "dev"]