export default {
  // 多页面共享的商品ID
  cid: '',
  setCid(cid) {
    this.cid = cid
  },
  // 多页面共享的商品
  goods: {
    id: '',
    commodityName: '',
    commoditySubHead: '',
    category: '',
    brand: '',
    inventory: '',
    sort: '',
    status: '',
    putawayStatus: '',
    photo: '',
    price: '',
    weight: '',
    height: '',
    length: '',
    width: '',
    specificType: '',
    productDetail: '',
    createTime: '',
    updateTime: ''
  },
  setGoods(goods) {
    this.goods.id = goods.id,
      this.goods.commodityName = goods.commodityName,
      this.goods.commoditySubHead = goods.commoditySubHead,
      this.goods.category = goods.category,
      this.goods.brand = goods.brand,
      this.goods.inventory = goods.inventory,
      this.goods.sort = goods.sort,
      this.goods.status = goods.status,
      this.goods.putawayStatus = goods.putawayStatus,
      this.goods.photo = goods.photo,
      this.goods.price = goods.price,
      this.goods.weight = goods.weight,
      this.goods.height = goods.height,
      this.goods.length = goods.length,
      this.goods.specificType = goods.specificType,
      this.goods.productDetail = goods.productDetail,
      this.goods.createTime = goods.createTime,
      this.goods.updateTime = goods.updateTime
  },
}
