FROM node
WORKDIR /myapp
COPY ./*.json .
RUN npm install
RUN npm install react-scripts
COPY . .
EXPOSE 3000
CMD ["npm","start"]