import sequelize from '#configs/db.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('開始處理 GET 請求');

      // 檢查數據庫連接
      await sequelize.authenticate();
      console.log('數據庫連接成功');

      // 從 Sequelize 實例獲取 PurchaseOrder 模型
      const PurchaseOrder = sequelize.models.Purchase_Order;

      // 檢查 PurchaseOrder 模型是否存在
      if (!PurchaseOrder) {
        throw new Error('PurchaseOrder 模型未找到');
      }

      // 假設用戶ID是4（實際應用中,這應該從session或token中獲取）
      const userId = 4;

      console.log('正在查詢訂單，用戶ID:', userId);
      const orders = await PurchaseOrder.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']]
      });

      console.log('查詢完成，訂單數量:', orders.length);

      // 將訂單數據轉換為純JSON對象
      const plainOrders = orders.map(order => order.get({ plain: true }));

      res.status(200).json({ status: 'success', data: { orders: plainOrders } });
    } catch (error) {
      console.error('獲取訂單時發生錯誤:', error);
      res.status(500).json({ status: 'error', message: '獲取訂單失敗', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}