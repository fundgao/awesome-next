const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('开始清空Customer集合...');
    
    // 删除所有客户记录
    const deleteResult = await prisma.customer.deleteMany({});
    
    console.log(`成功删除${deleteResult.count}个客户记录`);
    console.log('Customer表已重置');
    
  } catch (error) {
    console.error('重置Customer表时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 