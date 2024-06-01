FROM alpine:3.20.0

RUN apk update && apk add --no-cache curl perl-utils

RUN curl -L -o opa_linux_amd64_static https://openpolicyagent.org/downloads/v0.65.0/opa_linux_amd64_static

RUN curl -L -o opa_linux_amd64_static.sha256 https://openpolicyagent.org/downloads/v0.65.0/opa_linux_amd64_static.sha256

RUN shasum -c ./opa_linux_amd64_static.sha256

RUN chmod 755 ./opa_linux_amd64_static

CMD ./opa_linux_amd64_static run --server --log-level=debug --log-format=json-pretty --watch /policies