# 开发文档

## 1. 项目概述

xx 管理系统是一个全栈应用程序。

### 核心功能

- 客户信息管理（添加、编辑、查看、删除）
- 订单历史跟踪
- 客户分类（白金、黄金、银牌会员）
- 用户权限和角色管理
- 数据统计和报表

## 2. 技术栈

### 前端

- **框架**: Next.js (React)
- **UI 库**: Ant Design
- **状态管理**: React Hooks
- **路由**: Next.js Router
- **HTTP 客户端**: 原生 Fetch API
- **日期处理**: Day.js

### 后端

- **框架**: Next.js API Routes
- **数据库**: MongoDB
- **ORM**: Prisma
- **身份验证**: (根据项目实现补充)

### 部署

- **容器化**: Docker & Docker Compose
- **数据库**: MongoDB (容器化)

## 3. 项目结构

```
awesome-next/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API 路由
│   ├── components/       # 共享组件
│   ├── services/         # API 服务封装
│   └── styles/           # 全局样式
├── prisma/
│   └── schema.prisma     # Prisma 数据模型
├── public/               # 静态资源
├── scripts/              # 工具脚本
├── .env                  # 环境变量
├── docker-compose.yml    # Docker 配置
├── Dockerfile            # Docker 构建文件
└── package.json          # 依赖管理
```

## 4. 数据模型

系统的核心数据模型定义在 `prisma/schema.prisma` 中：

### Customer 模型

```prisma
model Customer {
  id                   String             @id @default(auto()) @map("_id") @db.ObjectId
  firstName            String
  lastName             String
  gender               String?
  dateOfBirth          DateTime?          // 出生日期
  nationality          String?
  passportNumber       String?
  passportExpiry       DateTime?          // 护照过期日期
  email                String?
  phone                String?
  alternativePhone     String?
  address              Address?           // 嵌入式文档
  emergencyContact     EmergencyContact?  // 嵌入式文档
  travelPreferences    TravelPreferences? // 嵌入式文档
  membershipLevel      String?            // 会员等级（platinum, gold, silver）
  salesRepresentative  String?
  joinDate             DateTime?          // 加入日期
  referredBy           String?
  notes                String?
  newsletter           Boolean            @default(false)
  status               String             @default("active")
  customerId           String             @unique
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt
  createdBy            User               @relation("CreatedByUser", fields: [createdById], references: [id])
  createdById          String             @db.ObjectId
}
```

### User 模型

```prisma
model User {
  id         String     @id @default(auto()) @map("_id") @db.ObjectId
  email      String     @unique
  name       String?
  password   String
  role       String     @default("user")
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  address    Address?
  posts      Post[]
  customers  Customer[] @relation("CreatedByUser")
}
```

## 5. API 端点

系统使用 Next.js API Routes 提供以下 API 端点：

### 客户管理

#### 获取客户列表

- **端点**: `GET /api/customers`
- **查询参数**:
  - `page`: 页码 (默认: 1)
  - `limit`: 每页条数 (默认: 10)
  - `search`: 搜索关键词
  - `status`: 客户状态过滤
- **响应**: 客户列表和分页信息

#### 获取客户详情

- **端点**: `GET /api/customers/{id}`
- **响应**: 客户详细信息

#### 创建客户

- **端点**: `POST /api/customers`
- **请求体**: 客户信息对象
- **响应**: 创建的客户信息

#### 更新客户

- **端点**: `PUT /api/customers/{id}`
- **请求体**: 更新的客户信息
- **响应**: 更新后的客户信息

#### 删除客户

- **端点**: `DELETE /api/customers/{id}`
- **响应**: 操作状态

#### 获取客户订单历史

- **端点**: `GET /api/customers/{id}/orders`
- **响应**: 客户订单列表

#### 获取客户统计数据

- **端点**: `GET /api/customers/stats`
- **响应**: 统计数据对象

## 6. 前端组件

系统使用 Ant Design 组件库，主要页面和组件包括：

### 客户列表页 (`/customers/list`)

- 显示客户列表，支持搜索和筛选
- 点击客户展示详细信息
- 提供客户统计信息

### 客户创建页 (`/customers/create`)

- 多步骤表单，分为基本信息、联系方式、旅行偏好和附加信息
- 支持表单验证
- 提供随机数据生成功能（方便测试）

### 公共组件

- `AdminLayout`: 系统通用布局，包含导航和页头
- 其他可复用组件

## 7. 开发指南

### 环境设置

#### 本地开发

1. 克隆仓库

   ```bash
   git clone <repository-url>
   cd awesome-next
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 设置环境变量 (创建 `.env` 文件)

   ```
   DATABASE_URL=mongodb://localhost:27017/awesome-next?directConnection=true
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   ```

#### 使用 Docker

1. 启动所有服务

   ```bash
   docker-compose up -d
   ```

2. 仅启动数据库

   ```bash
   docker-compose up -d mongo
   ```

3. 仅启动应用
   ```bash
   docker-compose up -d app
   ```

### 数据库操作

#### Prisma 常用命令

1. 生成 Prisma 客户端

   ```bash
   npx prisma generate
   ```

2. 将架构变更推送到数据库 (MongoDB)

   ```bash
   npx prisma db push
   ```

3. 重置客户数据 (使用脚本)
   ```bash
   npx ts-node scripts/reset-customers.ts
   ```

### 常见问题与解决方案

#### 1. 日期类型不一致

**问题**: Prisma 查询时出现 "Inconsistent column data" 错误，无法将 DateTime 转换为 String

**解决方案**:

1. 确保 schema.prisma 中的字段类型与数据库一致
2. 对于日期字段，需保持类型一致性：

   ```prisma
   // 正确方式
   dateOfBirth DateTime?

   // 错误方式 (可能导致类型不一致)
   dateOfBirth String?
   ```

3. 清空有问题的数据或使用正确的类型重新创建记录

#### 2. Docker 环境更新

当在 Docker 环境中修改 Prisma schema 后:

1. 重新生成 Prisma 客户端

   ```bash
   docker exec awesome-next-app-1 npx prisma generate
   ```

2. 推送架构变更

   ```bash
   docker exec awesome-next-app-1 npx prisma db push
   ```

3. 重启应用容器
   ```bash
   docker-compose restart app
   ```

## 8. 部署指南

### 生产环境部署

1. 构建 Docker 镜像

   ```bash
   docker-compose build
   ```

2. 运行服务

   ```bash
   docker-compose up -d
   ```

3. 设置 MongoDB 副本集 (如果需要)

   ```bash
   docker exec -it awesome-next-mongo-1 mongosh
   rs.initiate({_id: "rs0", members: [{_id: 0, host: "localhost:27017"}]})
   ```

4. 监控日志
   ```bash
   docker-compose logs -f app
   ```

### 数据管理

1. 数据库备份

   ```bash
   docker exec awesome-next-mongo-1 mongodump --out /data/backup
   ```

2. 数据库恢复
   ```bash
   docker exec awesome-next-mongo-1 mongorestore /data/backup
   ```

---

## 9. 技术注意事项

1. **日期处理**：所有日期应该一致使用 DateTime 类型，前端使用 dayjs 处理
2. **MongoDB 特性**：MongoDB 不支持 Prisma migrate 命令，请使用 db push
3. **容器化**：应用和数据库均容器化，数据持久化到 Docker volume

## 10. 贡献指南

1. 创建功能分支
2. 实现功能/修复
3. 提交代码前运行测试
4. 提交 Pull Request

---
