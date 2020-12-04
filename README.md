## Proxy Server

### Implement some nginx proxy server structures:

-   Basic structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
```

-   Cache structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
                 |
                 |
               REDIS
```

-   Filter request structure:

```
               HTML REDIS <-> HTML NGINX <-> SERVER
                             /
                            /
    client <-> FILTER NGINX
                            \
                             \
              IMAGE REDIS <-> IMAGE NGINX <-> SERVER
```

-   Anti-DDOS + Filter request structure:

```
                                   HTML REDIS <-> HTML NGINX <-> SERVER
                                                 /
                                                /
    client <-> ANTI DDOS NGINX <-> FILTER NGINX
                                                \
                                                 \
                                  IMAGE REDIS <-> IMAGE NGINX <-> SERVER
```

### Docker ports expose:

| Docker image | Expose port |
| ------------ | :---------: |
| NGINX        |    7000     |
| FILTER NGINX |    7001     |
| DDOS NGINX   |    7003     |
| HTML NGINX   |    7010     |
| IMAGE NGINX  |    7011     |
|              |             |
| SERVER       |    8000     |
|              |             |
| REDIS        |    9000     |
| HTML REDIS   |    9001     |
| IMAGE REDIS  |    9002     |
