class PRManager {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  clearAll() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.total, 0);
  }
}
