FROM dockerfile/nodejs

RUN apt-get install -y python-dev
RUN apt-get install -y python-pip

RUN mkdir /project_root

WORKDIR /project_root
ADD . /project_root/

WORKDIR /project_root/web_app
RUN npm install

EXPOSE 3000
