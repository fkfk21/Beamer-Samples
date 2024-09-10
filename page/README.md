# React Vite Actions

Sample code for:
React + MUI + Github Actions

automatically deploy react project to github pages

## For new project
1. Change PROJECT_BASENAME in vite.config.js
2. Change Github Pages settings for Github Actions
  - repository settings -> Pages -> Source -> Github Actions


TODO: automate


## Frontend Environment
React + Typescript + Vite + MUI

Project template using TailwindCSS -> [Here](https://github.com/fkfk21/react-vite-actions)


```bash
./make_env.sh
```

```bash
./login.sh
```
docker内で
```bash
npm i
```

## Development
```bash
./login.sh
npm i
npm run dev
```
## Check build result
```bash
./login.sh
npm run build
npm run preview
```


## Environment Setup

Dockerのインストール
[Qiita](https://qiita.com/yoshiyasu1111/items/17d9d928ceebb1f1d26d)
[公式](https://docs.docker.com/engine/install/ubuntu/)

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Dockerをnon-rootで実行するための設定 [参照](https://docs.docker.com/engine/install/linux-postinstall/)

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```
PC 再起動

インストール確認
```bash
docker run hello-world
```

