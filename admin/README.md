## nginx

Copy nginx config file to web host:

```shell
rsync --rsync-path='sudo rsync' ~/projects/dakerr/nextjs-blog/admin/nextjsblog.dakerr.com.conf dakerr5:/etc/nginx/sites-enabled/
```

Test that the config.file is valid:

```
sudo nginx -t
```

Restart nginx:

```
sudo service nginx restart
```

## First-time installation on Digital Ocean

```shell
ssh dakerr5

cd apps

mkdir dakerr

cd dakerr

git clone https://dlcmh:29574f07e0df7c58265665667eb79235903f098a@github.com/dlcmh/nextjs-blog

cd nextjs-blog

pnpm build

procsd create
procsd start
```

## Deploy the latest code

Use the script:

```shell
admin/deploy-from-local.sh
```

Or manually:

```shell
ssh dakerr5

cd apps/dakerr/dakerr-covid-19

git fetch origin --prune
git reset --hard origin/master

pnpm build
procsd restart
```
