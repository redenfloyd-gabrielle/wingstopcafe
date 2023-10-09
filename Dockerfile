FROM python:3.7.8

LABEL AUTHOR "Redenfloyd Gabrielle M. Cayanan"

ENV WEB2PY_ROOT=/opt/web2py

# overridable environment variables
ENV WEB2PY_VERSION=
ENV WEB2PY_PASSWORD=shantiroki
ENV WEB2PY_ADMIN_SECURITY_BYPASS=true
ENV UWSGI_OPTIONS=

WORKDIR $WEB2PY_ROOT

ADD ./api/requirements.txt /
ADD ./api/routes.py /

RUN apt-get update && apt-get -y install \
    gcc \
    git \
    libpcre3-dev \
    iproute2 \
    && python -m pip install --upgrade pip \
    && pip install -r /requirements.txt \
    && pip install uwsgi \
    && pip install boto3 \
    && git clone --recursive https://github.com/web2py/web2py.git $WEB2PY_ROOT \
    && mv $WEB2PY_ROOT/handlers/wsgihandler.py $WEB2PY_ROOT \
    && cp /routes.py $WEB2PY_ROOT \
    && groupadd -g 1000 web2py \
    && useradd -r -u 1000 -g web2py web2py \
    && chown -R web2py:web2py $WEB2PY_ROOT \
    && chmod -R 777 $WEB2PY_ROOT 

COPY ./api/entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "entrypoint.sh" ]

# for local
CMD [ "http"]

# for cloud 
# CMD [ "uwsgi"]

USER root

EXPOSE 8080 9090
