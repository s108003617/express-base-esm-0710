# 使用 Node.js 基礎映像
FROM node:14

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製應用程式碼
COPY . .

# 暴露應用程式的埠
EXPOSE 8080

# 啟動應用程式
CMD [ "npm", "run", "start" ]