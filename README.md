### Server端 启动命令
```
# 安装依赖
npm i

# 第一种：未全局安装ts-node时使用
# 启动时，会首先执行tsc命令，将src目录下的ts编写的node端代码，进行编译，然后在用 node . 启动
# 注意直接使用node .启动，只会自动上次编译的结果，新修改的代码不会再编译，编译需要在根目录下执行tsc命令
npm start

# 第二种：安装了ts-node
ts-node src/main.ts
```

### 前端启动命令
> 前端目录为static，为纯静态的html，数据请求使用jquery来发起
```
# 安装一个简易的http服务
npm i -g serve

# 启动前端, 默认输出访问地址
serve -s static
```

### debug ts code
需要在项目目录中安装typescript和ts-node包，然后创建launch.json，即可debug运行调试ts代码,launch配置参见.vscode目录


# jwt 
> 生成私钥, 注意：公钥可以放在项目目录，私钥最好放在工程目录之外
```
ssh-keygen -t rsa -f d:\secret.key  -C "admin@admin.com"
```

# 接口测试地址
```
/reg?name=lucy&password=123
/login?name=lucy&password=123
/createAnimal?animalname=Superman&age=1&species=brid
/updateAnimal?animalname=Superman&age=2
/fetchAnimals
/deleteAnimal?animalname=Superman
```