/**
 * 用于执行一些在后台一直运行的操作
 */

import GdzcModel from './model';

const gdzc = new GdzcModel();
const computeStatByYear = async () => {
  await gdzc.computeStatByYear();
  setTimeout(computeStatByYear, 60000);
}

const computeStatByLyr = async () => {
  await gdzc.computeStatByLyr();
  setTimeout(computeStatByLyr, 60000);
}

const computeScrapping = async () =>{
  await gdzc.computeScrapping();
  setTimeout(computeScrapping, 60000);
}

// 计算按年统计的金额和数量
computeStatByYear();

computeScrapping();

computeStatByLyr();

// 创建数据库索引
gdzc.createIndexes();
