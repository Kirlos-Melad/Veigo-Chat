FROM node:20.12.2-slim

RUN apt-get update && apt-get install -y curl jq

# Set grpcurl version
ENV GRPCURL_VERSION=1.9.1

# Download grpcurl and its checksum
RUN curl -LO https://github.com/fullstorydev/grpcurl/releases/download/v${GRPCURL_VERSION}/grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz
RUN curl -LO https://github.com/fullstorydev/grpcurl/releases/download/v${GRPCURL_VERSION}/grpcurl_${GRPCURL_VERSION}_checksums.txt

# Verify the checksum of the downloaded file
RUN CHECKSUM_EXPECTED=$(grep grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz ./grpcurl_${GRPCURL_VERSION}_checksums.txt | awk '{ print $1 }') && \
	echo "${CHECKSUM_EXPECTED} ./grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz" | sha256sum -c -

# Install grpcurl
RUN tar -xzf grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz
RUN rm -rf grpcurl_${GRPCURL_VERSION}_linux_x86_64.tar.gz
RUN mv grpcurl /usr/local/bin/grpcurl
RUN chmod +x /usr/local/bin/grpcurl

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Make healthy script executable
RUN chmod +x ./scripts/is_healthy.sh

CMD npm run migrate && npm run start:watch
