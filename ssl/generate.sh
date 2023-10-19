#! bash

openssl req \
  -newkey rsa:2048 \
  -keyout server.key \
  -new \
  -out server.crt \
  -x509 \
  -nodes \
  -config ./custom.cnf \
  -sha256 \
  -days 365
