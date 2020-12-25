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
                             NGINX-HTML <-> SERVER-HTML
                            /
                           /
    client <-> NGINX-FILTER
                    |      \
                    |       \
                  Cache      NGINX-IMAGE <-> SERVER-IMAGE
```

- Anti-DDOS + Filter request structure:

```
                                                 NGINX-HTML <-> SERVER-HTML
                                                /
                                               /
    client <-> NGINX-ANTI-DDOS <-> NGINX-FILTER
                      |                        \
                      |                         \
                    Cache                        NGINX-IMAGE <-> SERVER-IMAGE
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

### GUIDE

- Allow to execute the script

```bash
chmod +x client.sh
```

- Run `client.sh` script as follow:

```bash
./client.sh <structure-type> <url>
```

- There are 4 type of structure as above: `basic`, `cache`, `filter`, `ddos`

- Example:

```bash
./client.sh basic path-to-source.ext
```
