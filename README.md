## Proxy Server

Implement some nginx proxy server structures:

- Basic structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
```

- Cache structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
                 |
                 |
               REDIS
```

- Filter request structure:

```
               HTML REDIS <-> HTML NGINX <-> SERVER
                             /
                            /
    client <-> FILTER NGINX
                            \
                             \
              VIDEO REDIS <-> VIDEO NGINX <-> SERVER
```

- DDOS + Filter request structure:

```
                             HTML REDIS <-> HTML NGINX <-> SERVER
                                           /
                                          /
    client <-> DDOS NGINX <-> FILTER NGINX
                                          \
                                           \
                            VIDEO REDIS <-> VIDEO NGINX <-> SERVER
```
