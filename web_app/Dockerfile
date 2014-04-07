FROM dockerfile/nodejs

RUN apt-get install -y python-dev
RUN apt-get install -y python-pip
RUN pip install pymongo

RUN mkdir /webapp_root
ADD . /webapp_root/
WORKDIR /webapp_root
RUN npm install

EXPOSE 3000
