FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
ENV DB_HOST="mongodb+srv://margotmarch81:yrvAwpB4BPRvBqlK@cluster0.d1ha4lz.mongodb.net/db-contacts"
ENV SECRET="dsccjerf3463kdngmcs46788kk234345"
ENV SENDGRID_API_KEY="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"
ENV MY_EMAIL="mar-got1@o2.pl"
