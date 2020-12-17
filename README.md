## Proxy Server

### Implement some nginx proxy server structures:

- Basic structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
```

- Cache structure:

```
    client <-> NGINX <-> proxy_passs to <-> SERVER
                 |
                 |
               Cache
```

- Filter request structure:

```
              Cache-HTML <-> NGINX-HTML <-> SERVER-HTML
                            /
                           /
    client <-> NGINX-FILTER
                           \
                            \
             Cache-Image <-> NGINX-IMAGE <-> SERVER-IMAGE
```

- Anti-DDOS + Filter request structure:

```
                                  Cache-HTML <-> NGINX-HTML <-> SERVER-HTML
                                                /
                                               /
    client <-> NGINX-ANTI-DDOS <-> NGINX-FILTER
                                               \
                                                \
                                 Cache-IMAGE <-> NGINX-IMAGE <-> SERVER-IMAGE
```

### Docker ports expose:

| Docker image    | Expose port |
| --------------- | :---------: |
| NGINX           |    7000     |
| NGINX-FILTER    |    7100     |
| NGINX-ANTI-DDOS |    7200     |
| NGINX-HTML      |    7001     |
| NGINX-IMAGE     |    7002     |
|                 |             |
| SERVER          |    8000     |
| SERVER-HTML     |    8001     |
| SERVER-IMAGE    |    8002     |
