# 使用 Node.js 基礎映像
FROM node:18

# 設置工作目錄
WORKDIR /app

# 複製 package.json 並安裝依賴
COPY package*.json ./
RUN npm install

# 複製所有檔案
COPY . .

# 編譯應用（如果需要）
# RUN npm run build

# 暴露應用使用的端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "bin/www"]



