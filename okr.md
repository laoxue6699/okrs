# loopback 4 服务器配置

## 一、安装 nginx

## 二、安装 mongoDB

## 三、导入 okrs 数据库

```
~# mongoimport -d okrs -c Okr Okr.dat
~# mongoimport -d okrs -c Category Category.dat
~# mongoimport -d okrs -c KeyResult KeyResult.dat
~# mongoimport -d okrs -c Role Role.dat
~# mongoimport -d okrs -c Year Year.dat
~# mongoimport -d okrs -c Department Department.dat
~# mongoimport -d okrs -c Objective Objective.dat
~# mongoimport -d okrs -c Period Period.dat
~# mongoimport -d okrs -c User User.dat
```

## 四、安装 nodejs （npm）环境

## 五、安装 loopback4 cli

```
~# sudo npm i -g @loopback/cli
```

## 六、创建 API 项目

```
~# lb4 okrs

Application okrs was created in okrs.

Next steps:

～# cd okrs
~/okrs# npm start

Server is running at http://[::1]:3000
Try http://[::1]:3000/ping
```

## 七、测试 API

- 开启 3000 端口的防火墙

```
~/okrs# sudo ufw allow 3000
```

- 在浏览器输入地址(需要开启 3000 端口防火墙)

```
http://39.98.214.214:3000 或者
http://39.98.214.214:3000/ping
```

## 八、通过 pm2 管理 loopback4 服务

### 安装 pm2

```
~/okrs# npm install pm2 -g
```

### pm2 setup

You might find yourself in a situation in which you do not have access to the CLI to start your Node.js applications. In such a situation, pm2 must be added as a dependency and must be called with the start script.

### Generate an ecosystem.config.js template with:

```
~/okrs# pm2 init
```

### Modify the generated file to match Loopback requirements:

/ecosystem.config.js

```
   module.exports = {
     apps: [
       {
         name: 'OkrsAPI',
         script: 'index.js',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
           NODE_ENV: 'development',
         },
         env_production: {
           NODE_ENV: 'production',
         },
       },
     ],
   };
```

### Add pm2 as a dependency to your project using the following command

```
~/okrs# npm install pm2 --save
```

### Modify your start and add a stop script in package.json to look like this

```
    {
      "scripts": {
        "start": "pm2 start ecosystem.config.js --env production"
        "stop": "pm2 stop ecosystem.config.js --env production"
      }
    }
```

### 启动 lb4 服务

```
~/okrs# npm start


[PM2][WARN] Applications OkrsAPI not running, starting...
[PM2] App [OkrsAPI] launched (1 instances)
┌─────────┬────┬──────┬────────┬───┬─────┬───────────┐
│ Name    │ id │ mode │ status │ ↺ │ cpu │ memory    │
├─────────┼────┼──────┼────────┼───┼─────┼───────────┤
│ OkrsAPI │ 0  │ fork │ online │ 0 │ 0%  │ 25.7 MB   │
└─────────┴────┴──────┴────────┴───┴─────┴───────────┘
```

### 停止 lb4 服务

```
~/okrs# npm stop

[PM2] [OkrsAPI](0) ✓
┌─────────┬────┬──────┬─────────┬───┬─────┬────────┐
│ Name    │ id │ mode │ status  │ ↺ │ cpu │ memory │
├─────────┼────┼──────┼─────────┼───┼─────┼────────┤
│ OkrsAPI │ 0  │ fork │ stopped │ 0 │ 0%  │ 0 B    │
└─────────┴────┴──────┴─────────┴───┴─────┴────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 九、连接 mongdb 数据库

```
~/okrs# lb4 datasource
? Datasource name: db
? Select the connector for db: MongoDB (supported by StrongLoop)
? Connection String url to override other settings (eg: mongodb://username:passw
ord@hostname:port/database):
? host: localhost
? port: 27017
? user:
? password: [hidden]
? database: okrs
   create src/datasources/db.datasource.json
   create src/datasources/db.datasource.ts

Datasource db was created in src/datasources/
```

## 十、创建 okrs 数据模型

### okrs 数据集

- 分类
  Category{
  id* number
  item* string
  }
- 部门
  Department{
  id* number
  item* string
  }
- 关键结果
  KeyResult{
  id* string
  pid* string
  ppid* string
  item* string
  }
- 目标
  Objective{
  id* string
  pid* string
  item\* string
  }
- okr
  Okr{
  id* string
  title* string
  department* string
  category* string
  year* string
  period* string
  people\* string
  }
- 期间
  Period{
  id* number
  item* string
  }
- 角色
  Role{
  id* number
  item* string
  }
- 用户
  User{
  id* string
  department* string
  username* string
  password* string
  email string
  roles\* [string]
  }
- 年份
  Year{
  id* number
  item* string
  }

### 创建数据模型

- Category(分类)

```
~/okrs# lb4 model
? Model class name: category
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Category
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Category
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Category
Enter an empty property name when done

? Enter the property name:
   create src/models/category.model.ts
   update src/models/index.ts

Model category was created in src/models/
```

- Department(部门)

```
~/okrs# lb4 model
? Model class name: department
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Department
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Department
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Department
Enter an empty property name when done

? Enter the property name:
   create src/models/department.model.ts
   update src/models/index.ts

Model department was created in src/models/
```

- KeyResult(关键结果)

```
~/okrs# lb4 model
? Model class name: keyResult
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to KeyResult
Enter an empty property name when done

? Enter the property name: id
? Property type: string
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to KeyResult
Enter an empty property name when done

? Enter the property name: pid
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to KeyResult
Enter an empty property name when done

? Enter the property name: ppid
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to KeyResult
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to KeyResult
Enter an empty property name when done

? Enter the property name:
   create src/models/key-result.model.ts
   update src/models/index.ts

Model keyResult was created in src/models/
```

- Objective(目标)

```
~/okrs# lb4 model
? Model class name: objective
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Objective
Enter an empty property name when done

? Enter the property name: id
? Property type: string
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Objective
Enter an empty property name when done

? Enter the property name: pid
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Objective
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Objective
Enter an empty property name when done

? Enter the property name:
   create src/models/objective.model.ts
   update src/models/index.ts

Model objective was created in src/models/
```

- Okr

```
~/okrs# lb4 model
? Model class name: okr
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Okr
Enter an empty property name when done

? Enter the property name: id
? Property type: string
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: title
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: department
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: category
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: year
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: period
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name: people
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Okr
Enter an empty property name when done

? Enter the property name:
   create src/models/okr.model.ts
   update src/models/index.ts

Model okr was created in src/models/
```

- Period(期间)

```
/okrs# lb4 model
? Model class name: period
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Period
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Period
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Period
Enter an empty property name when done

? Enter the property name:
   create src/models/period.model.ts
   update src/models/index.ts

Model period was created in src/models/
```

- Role(角色)

```
~/okrs# lb4 model
? Model class name: role
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Role
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Role
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Role
Enter an empty property name when done

? Enter the property name:
   create src/models/role.model.ts
   update src/models/index.ts

Model role was created in src/models/
```

- User(用户)

```
~/okrs# lb4 model
? Model class name: user
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to User
Enter an empty property name when done

? Enter the property name: id
? Property type: string
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name: department
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name: username
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name: password
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name: email
? Property type: string
? Is it required?: No
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name: roles
? Property type: array
? Type of array items: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to User
Enter an empty property name when done

? Enter the property name:
   create src/models/user.model.ts
   update src/models/index.ts

Model user was created in src/models/
```

- Year(年份)

```
~/okrs# lb4 model
? Model class name: year
? Please select the model base class Entity (A persisted model with an ID)
? Allow additional (free-form) properties? No
Let's add a property to Year
Enter an empty property name when done

? Enter the property name: id
? Property type: number
? Is id the ID property? Yes
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Year
Enter an empty property name when done

? Enter the property name: item
? Property type: string
? Is it required?: Yes
? Default value [leave blank for none]:

Let's add another property to Year
Enter an empty property name when done

? Enter the property name:
   create src/models/year.model.ts
   update src/models/index.ts

Model year was created in src/models/
```

## 十一、创建存储库

```
~/okrs# lb4 repository
? Please select the datasource DbDatasource
? Select the model(s) you want to generate a repository Category, Department, Ke
yResult, Objective, Okr, Period, Role, User, Year
? Please select the repository base class DefaultCrudRepository (Legacy juggler
bridge)
? Please enter the name of the ID property for Role: id
   create src/repositories/category.repository.ts
   create src/repositories/department.repository.ts
   create src/repositories/key-result.repository.ts
   create src/repositories/objective.repository.ts
   create src/repositories/okr.repository.ts
   create src/repositories/period.repository.ts
   create src/repositories/role.repository.ts
   create src/repositories/user.repository.ts
   create src/repositories/year.repository.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts
   update src/repositories/index.ts

Repositories CategoryRepository,DepartmentRepository,KeyResultRepository,ObjectiveRepository,OkrRepository,PeriodRepository,RoleRepository,UserRepository,YearRepository was created in src/repositories/
```

## 十二、创建控制器

```
~/okrs# lb4 controller
? Controller class name: category
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Category
? What is the name of your CRUD repository? CategoryRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /categories
   create src/controllers/category.controller.ts
   update src/controllers/index.ts

Controller category was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: department
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Department
? What is the name of your CRUD repository? DepartmentRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /departments
   create src/controllers/department.controller.ts
   update src/controllers/index.ts

Controller department was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: keyResult
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? KeyResult
? What is the name of your CRUD repository? KeyResultRepository
? What is the type of your ID? string
? What is the base HTTP path name of the CRUD operations? /key-results
   create src/controllers/key-result.controller.ts
   update src/controllers/index.ts

Controller keyResult was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: objective
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Objective
? What is the name of your CRUD repository? ObjectiveRepository
? What is the type of your ID? string
? What is the base HTTP path name of the CRUD operations? /objectives
   create src/controllers/objective.controller.ts
   update src/controllers/index.ts

Controller objective was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: okr
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Okr
? What is the name of your CRUD repository? OkrRepository
? What is the type of your ID? string
? What is the base HTTP path name of the CRUD operations? /okrs
   create src/controllers/okr.controller.ts
   update src/controllers/index.ts

Controller okr was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: period
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Period
? What is the name of your CRUD repository? PeriodRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /periods
   create src/controllers/period.controller.ts
   update src/controllers/index.ts

Controller period was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: role
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Role
? What is the name of your CRUD repository? RoleRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /roles
   create src/controllers/role.controller.ts
   update src/controllers/index.ts

Controller role was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: user
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? User
? What is the name of your CRUD repository? UserRepository
? What is the type of your ID? string
? What is the base HTTP path name of the CRUD operations? /users
   create src/controllers/user.controller.ts
   update src/controllers/index.ts

Controller user was created in src/controllers/

root@iZudzd49c6hvx9Z:~/okrs# lb4 controller
? Controller class name: year
? What kind of controller would you like to generate? REST Controller with CRUD
functions
? What is the name of the model to use with this CRUD repository? Year
? What is the name of your CRUD repository? YearRepository
? What is the type of your ID? number
? What is the base HTTP path name of the CRUD operations? /years
   create src/controllers/year.controller.ts
   update src/controllers/index.ts

Controller year was created in src/controllers/
```

## 十三、重启 API 服务

```
~okrs# npm stop

[PM2] [OkrsAPI](0) ✓
┌─────────┬────┬──────┬─────────┬───┬─────┬────────┐
│ Name    │ id │ mode │ status  │ ↺ │ cpu │ memory │
├─────────┼────┼──────┼─────────┼───┼─────┼────────┤
│ OkrsAPI │ 0  │ fork │ stopped │ 0 │ 0%  │ 0 B    │
└─────────┴────┴──────┴─────────┴───┴─────┴────────┘
 Use `pm2 show <id|name>` to get more details about an app

~okrs# npm tart

[PM2] Applying action restartProcessId on app [OkrsAPI](ids: 0)
[PM2] [OkrsAPI](0) ✓
┌─────────┬────┬──────┬────────┬───┬─────┬───────────┐
│ Name    │ id │ mode │ status │ ↺ │ cpu │ memory    │
├─────────┼────┼──────┼────────┼───┼─────┼───────────┤
│ OkrsAPI │ 0  │ fork │ online │ 0 │ 0%  │ 12.8 MB   │
└─────────┴────┴──────┴────────┴───┴─────┴───────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

## 十四、在浏览器测试 API

```
http://39.98.214.214:3000
```
