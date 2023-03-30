#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 删除文件需要根据实际打包的目录进行删除
rm -rf .vuepress/dist/

# 生成静态文件
yarn build

# 进入生成的文件夹
cd .vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io 修改仓库地址
git push -f https://github.com/MrLant/lan-blog.git master:gh-pages

cd -