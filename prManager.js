// PR Manager Class
class PRManager {
  constructor() {
    this.currentPR = {
      items: [],
      status: 'draft',
      totalAmount: 0
    };
    this.selectedItem = null;
  }

  // Search materials from catalog
  searchMaterials(query, searchType = 'all') {
    if (!query) return [];
    
    query = query.toLowerCase();
    
    return materialCatalog.filter(item => {
      switch(searchType) {
        case 'name':
          return item.name.toLowerCase().includes(query);
        case 'code':
          return item.code.toLowerCase().includes(query);
        case 'category':
          return item.category.toLowerCase().includes(query);
        default: // 'all'
          return item.name.toLowerCase().includes(query) ||
                 item.code.toLowerCase().includes(query) ||
                 item.category.toLowerCase().includes(query);
      }
    });
  }

  // Search equipment for spare parts
  searchEquipment(query) {
    if (!query) return [];
    
    query = query.toLowerCase();
    
    return equipmentDatabase.filter(equip => 
      equip.name.toLowerCase().includes(query) ||
      equip.manufacturer.toLowerCase().includes(query) ||
      equip.model.toLowerCase().includes(query)
    );
  }

  // Add item to PR
  addItem(itemData) {
    const item = {
      id: Date.now(),
      code: itemData.code || 'NEW-ITEM',
      name: itemData.name,
      quantity: parseInt(itemData.quantity) || 1,
      unitPrice: parseFloat(itemData.unitPrice) || 0,
      total: (parseInt(itemData.quantity) || 1) * (parseFloat(itemData.unitPrice) || 0),
      vendor: itemData.vendor || '',
      vendorDetails: itemData.vendorDetails || '',
      remarks: itemData.remarks || '',
      emergency: itemData.emergency || false,
      approval: itemData.code === 'NEW-ITEM' ? 'Pending HO Approval' : 'Normal'
    };

    this.currentPR.items.push(item);
    this.updateTotals();
    return item;
  }

  // Remove item from PR
  removeItem(itemId) {
    this.currentPR.items = this.currentPR.items.filter(item => item.id !== itemId);
    this.updateTotals();
  }

  // Update PR totals
  updateTotals() {
    this.currentPR.totalAmount = this.currentPR.items.reduce((sum, item) => sum + item.total, 0);
    this.currentPR.totalQuantity = this.currentPR.items.reduce((sum, item) => sum + item.quantity, 0);
    this.currentPR.emergencyCount = this.currentPR.items.filter(item => item.emergency).length;
  }

  // Clear all items
  clearAll() {
    this.currentPR.items = [];
    this.updateTotals();
  }

  // Submit PR
  submitPR() {
    if (this.currentPR.items.length === 0) {
      return { success: false, message: 'Cannot submit empty PR' };
    }

    this.currentPR.status = 'submitted';
    this.currentPR.prNumber = `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    this.currentPR.submissionDate = new Date().toISOString().split('T')[0];

    return { 
      success: true, 
      message: `PR ${this.currentPR.prNumber} submitted successfully!`,
      prNumber: this.currentPR.prNumber
    };
  }

  // Save as draft
  saveDraft() {
    if (this.currentPR.items.length === 0) {
      return { success: false, message: 'Cannot save empty draft' };
    }

    this.currentPR.status = 'draft';
    
    // Save to localStorage
    const drafts = JSON.parse(localStorage.getItem('prDrafts') || '[]');
    drafts.push({
      ...this.currentPR,
      savedDate: new Date().toISOString()
    });
    localStorage.setItem('prDrafts', JSON.stringify(drafts));

    return { 
      success: true, 
      message: 'Draft saved successfully!'
    };
  }

  // Get current PR summary
  getSummary() {
    return {
      totalItems: this.currentPR.items.length,
      totalQuantity: this.currentPR.totalQuantity || 0,
      totalAmount: this.currentPR.totalAmount || 0,
      emergencyCount: this.currentPR.emergencyCount || 0
    };
  }

  // Search vendors
  searchVendors(criteria) {
    return vendorDatabase.filter(vendor => {
      if (criteria.product) {
        return vendor.specialization.some(spec => 
          spec.toLowerCase().includes(criteria.product.toLowerCase())
        );
      }
      return true;
    });
  }
}

// Utility Functions
const utils = {
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  },

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  showMessage(elementId, message, type = 'success') {
    const msgDiv = document.getElementById(elementId);
    if (!msgDiv) return;

    msgDiv.className = type === 'success' ? 'success-msg' : 'error-msg';
    msgDiv.textContent = message;
    msgDiv.style.display = 'block';

    setTimeout(() => {
      msgDiv.style.display = 'none';
    }, 5000);
  },

  calculateVariance(actual, standard) {
    const diff = actual - standard;
    const percent = ((diff / standard) * 100).toFixed(1);
    
    let varClass = 'variance-good';
    if (Math.abs(percent) > 10) varClass = 'variance-warning';
    if (Math.abs(percent) > 20) varClass = 'variance-danger';

    return {
      amount: diff,
      percent: percent,
      class: varClass,
      text: diff > 0 ? `+${percent}%` : `${percent}%`
    };
  }
};
