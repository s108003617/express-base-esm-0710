# 使用 Node.js 基礎映像
FROM node:18

# 設置工作目錄
WORKDIR /app

# 複製 package.json 並安裝依賴
COPY package*.json ./
RUN npm install

# 在構建映像時安裝 bcrypt 和其他依賴
RUN rm -rf node_modules && npm install

# 複製所有檔案
COPY . .

# 編譯應用（如果需要）
# RUN npm run build

# 暴露應用使用的端口
EXPOSE 8080

# 設置環境變量
ENV PORT=8080

# 啟動應用
CMD ["npm", "start"]



