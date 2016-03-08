import xlsx from 'xlsx';

/**
 * 用于管理固定资产xls文件
 */
export default class GdzcXls {
  constructor(fileName = '') {
    if(fileName) this.fileName = fileName;
  }

  /**
   * 加载xls文件
   * @param  {String} fileName   待加载文件的路径
   * @param  {Number} sheetIndex =             0 待使用的数据表的索引号，默认为0
   * @return {null}
   */
  load (fileName, sheetIndex = 0) {
    if(fileName) this.fileName = fileName;
    if(!this.fileName) throw new Error('fileName can not empty.');

    let workbook = xlsx.readFile(this.fileName);
    this.sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
  }

  /**
   * 获取当前工作表的有值范围。
   * @return {Object} 取值范围对象。参见：https://github.com/SheetJS/js-xlsx#general-structures
   */
  range() {
    if(!this.sheet) throw new Error('Sheet have not been loaded yet.');
    return xlsx.utils.decode_range(this.sheet['!ref']);
  }

  /**
   * 将xls文档第一行当做标题栏，根据给定的列索引值获取列标题
   * @param  {Number} colIndex 列索引值，从0开始。
   * @return {String}          列标题的原始值
   */
  getTitle (colIndex) {
    return this.sheet[this.getCellAddress(colIndex, 0)].v;
  }

  /**
   * 获取指定行的数据
   * @param  {Number} rowIndex 行索引值，由于第0行是标题栏，因此从1开始。
   * @return {Object}          行数据，形如{ title: value }的对象。
   */
  getRowData(rowIndex) {
    let row = {};
    let range = this.range();
    for (var i = 0; i <= range.e.c; i++) {
      let title = this.getTitle(i);
      let value = this.sheet[this.getCellAddress(i, rowIndex)].v;
      row[title] = value;
    }
    return row;
  }

  /**
   * 根据给定的索引值计算单元格地址
   * @param  {Number} colIndex 列索引值
   * @param  {Number} rowIndex 行索引值
   * @return {String}          单元格地址
   */
  getCellAddress(colIndex, rowIndex) {
    let col = xlsx.utils.encode_col(colIndex);
    return `${col}${rowIndex + 1}`;
  }
}
