FROM almalinux:8.10

RUN dnf install nginx -y

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
