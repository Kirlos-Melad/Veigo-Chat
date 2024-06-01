FROM alpine:3.20.0

RUN apk update && apk add --no-cache curl gettext bash

COPY ./connectors ./connectors
COPY ./init.sh .

RUN chmod +x ./init.sh

CMD ./init.sh