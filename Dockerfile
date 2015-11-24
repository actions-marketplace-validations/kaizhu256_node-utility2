FROM node
MAINTAINER kai zhu <kaizhu256@gmail.com>
# install apt packages
RUN apt-get update && \
    apt-get install -y \
        apt-file \
        aptitude \
        build-essential \
        ca-certificates \
        chromium-inspector \
        cmake \
        default-jre \
        iptables \
        less \
        nginx \
        pptpd \
        screen \
        sudo \
        transmission-daemon \
        unzip \
        vim-nox \
        x11-apps \
        xvfb
# install docker
RUN wget -qO- https://get.docker.com/ | /bin/sh
# cleanup
RUN apt-get clean && \
    (rm -fr \
        /tmp/* \
        /tmp/.* \
        /var/lib/apt/lists/* \
        /var/lib/apt/lists/.* \
        /var/tmp/* \
        /var/tmp/.* \
        2>/dev/null || true)