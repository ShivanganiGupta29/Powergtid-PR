// Initialize PR Manager
const prManager = new PRManager();

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Set current date
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    dateElement.textContent = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Attach event listeners
  attachLoginListeners();
  attachTabListeners();
  attachSearchListeners();
  attachPRFormListeners();
  attachMyPRListeners();
  attachVendorSearchListeners();
}

// ===========================
// LOGIN FUNCTIONALITY
// ===========================
function attachLoginListeners() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  // Allow Enter key to login
  const empIdInput = document.getElementById('empId');
  const pwdInput = document.getElementById('pwd');
  
  [empIdInput, pwdInput].forEach(input => {
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
      });
    }
  });
}

function handleLogin() {
  const empId = document.getElementById('empId').value;
  const pwd = document.getElementById('pwd').value;

  // Simple demo authentication
  if (empId === 'PG12345' && pwd === 'password') {
    document.getElementById('loginDiv').classList.add('hidden');
    document.getElementById('userDiv').classList.remove('hidden');
  } else {
    alert('Invalid credentials! Use PG12345 / password for demo.');
  }
}

// ===========================
// TAB FUNCTIONALITY
// ===========================
function attachTabListeners() {
  // Main tabs
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  // Sub-tabs
  const subtabButtons = document.querySelectorAll('.subtab-button');
  subtabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const subtabName = button.getAttribute('data-subtab');
      switchSubTab(subtabName);
    });
  });
}

function switchTab(tabName) {
  // Remove active class from all tabs and contents
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Add active class to selected tab
  const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
  const activeContent = document.getElementById(`${tabName}Tab`);
  
  if (activeButton) activeButton.classList.add('active');
  if (activeContent) activeContent.classList.add('active');

  // Load tab-specific content
  if (tabName === 'mypr') {
    loadMyPRs();
  }
}

function switchSubTab(subtabName) {
  // Remove active class from all subtabs and contents
  document.querySelectorAll('.subtab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.subtab-content').forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden');
  });

  // Add active class to selected subtab
  const activeButton = document.querySelector(`[data-subtab="${subtabName}"]`);
  const activeContent = document.getElementById(`${subtabName}SubTab`);
  
  if (activeButton) activeButton.classList.add('active');
  if (activeContent) {
    activeContent.classList.add('active');
    activeContent.classList.remove('hidden');
  }
}

// ===========================
// SEARCH FUNCTIONALITY
// ===========================
function attachSearchListeners() {
  const searchInput = document.getElementById('searchInput');
  const searchTypeSelect = document.getElementById('searchTypeSelect');
  const equipmentSearchInput = document.getElementById('equipmentSearchInput');

  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleMaterialSearch, 300));
    searchInput.addEventListener('blur', () => {
      setTimeout(() => hideSearchResults('searchResults'), 200);
    });
  }

  if (searchTypeSelect) {
    searchTypeSelect.addEventListener('change', () => {
      if (searchInput.value) handleMaterialSearch();
    });
  }

  if (equipmentSearchInput) {
    equipmentSearchInput.addEventListener('input', debounce(handleEquipmentSearch, 300));
    equipmentSearchInput.addEventListener('blur', () => {
      setTimeout(() => hideSearchResults('equipmentSearchResults'), 200);
    });
  }
}

function handleMaterialSearch() {
  const query = document.getElementById('searchInput').value;
  const searchType = document.getElementById('searchTypeSelect').value;
  const resultsDiv = document.getElementById('searchResults');

  if (!query || query.length < 2) {
    hideSearchResults('searchResults');
    return;
  }

  const results = prManager.searchMaterials(query, searchType);
  displaySearchResults(results, resultsDiv, 'material');
}

function handleEquipmentSearch() {
  const query = document.getElementById('equipmentSearchInput').value;
  const resultsDiv = document.getElementById('equipmentSearchResults');

  if (!query || query.length < 2) {
    hideSearchResults('equipmentSearchResults');
    return;
  }

  const results = prManager.searchEquipment(query);
  displaySearchResults(results, resultsDiv, 'equipment');
}

function displaySearchResults(results, resultsDiv, type) {
  if (!resultsDiv) return;

  if (results.length === 0) {
    resultsDiv.innerHTML = '<div class="search-result-item">No results found</div>';
    resultsDiv.classList.remove('hidden');
    return;
  }

  resultsDiv.innerHTML = results.map(item => {
    if (type === 'material') {
      return `
        <div class="search-result-item" onclick="selectMaterial('${item.code}')">
          <div class="result-code">${item.code}</div>
          <div class="result-name">${item.name}</div>
          <div class="result-category">${item.category} • ₹${item.standardPrice} per ${item.unit}</div>
        </div>
      `;
    } else if (type === 'equipment') {
      return `
        <div class="search-result-item" onclick="selectEquipment('${item.name}')">
          <div class="result-name">${item.name}</div>
          <div class="result-category">${item.manufacturer} ${item.model}</div>
        </div>
      `;
    }
  }).join('');

  resultsDiv.classList.remove('hidden');
}

function hideSearchResults(resultsId) {
  const resultsDiv = document.getElementById(resultsId);
  if (resultsDiv) {
    resultsDiv.classList.add('hidden');
  }
}

function selectMaterial(code) {
  const item = materialCatalog.find(m => m.code === code);
  if (!item) return;

  prManager.selectedItem = item;

  // Update UI
  document.getElementById('searchInput').value = item.name;
  document.getElementById('selectedItemDisplay').textContent = `${item.code} - ${item.name}`;
  document.getElementById('selectedItemInfo').classList.remove('hidden');
  document.getElementById('unit').value = item.standardPrice;
  
  hideSearchResults('searchResults');
  
  // Show price comparison if available
  showPriceComparison(item);
}

function selectEquipment(equipmentName) {
  const equipment = equipmentDatabase.find(e => e.name === equipmentName);
  if (!equipment) return;

  // Show spare parts options
  alert(`Equipment: ${equipment.name}\n\nAvailable spares:\n${equipment.spares.map(s => `- ${s.name} (${s.code})`).join('\n')}\n\nSelect from material search to add.`);
  
  hideSearchResults('equipmentSearchResults');
}

function showPriceComparison(item) {
  const priceInfoDiv = document.getElementById('priceInfo');
  if (!priceInfoDiv) return;

  priceInfoDiv.innerHTML = `
    <div class="price-info">
      <div class="price-comparison">
        <div class="price-item">
          <div class="label">Standard Price</div>
          <div class="value">₹${item.standardPrice}</div>
        </div>
        <div class="price-item">
          <div class="label">Your Price</div>
          <div class="value">₹<span id="yourPriceDisplay">${item.standardPrice}</span></div>
        </div>
      </div>
      <div class="variance variance-good" id="varianceDisplay">0%</div>
    </div>
  `;
  priceInfoDiv.classList.remove('hidden');

  // Update variance on price change
  document.getElementById('unit').addEventListener('input', (e) => {
    updatePriceVariance(item.standardPrice, e.target.value);
  });
}

function updatePriceVariance(standardPrice, actualPrice) {
  const variance = utils.calculateVariance(parseFloat(actualPrice) || 0, standardPrice);
  
  const yourPriceDisplay = document.getElementById('yourPriceDisplay');
  const varianceDisplay = document.getElementById('varianceDisplay');
  
  if (yourPriceDisplay) yourPriceDisplay.textContent = actualPrice;
  if (varianceDisplay) {
    varianceDisplay.textContent = variance.text;
    varianceDisplay.className = `variance ${variance.class}`;
  }
}

// ===========================
// PR FORM FUNCTIONALITY
// ===========================
function attachPRFormListeners() {
  const addItemBtn = document.getElementById('addItemBtn');
  const toggleManualBtn = document.getElementById('toggleManualBtn');
  const vendorSource = document.getElementById('vendorSource');
  const submitPRBtn = document.getElementById('submitPRBtn');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');

  if (addItemBtn) addItemBtn.addEventListener('click', addItemToPR);
  if (toggleManualBtn) toggleManualBtn.addEventListener('click', toggleManualEntry);
  if (vendorSource) vendorSource.addEventListener('change', handleVendorChange);
  if (submitPRBtn) submitPRBtn.addEventListener('click', submitPR);
  if (saveDraftBtn) saveDraftBtn.addEventListener('click', saveDraft);
  if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllItems);
}

function toggleManualEntry() {
  const manualDiv = document.getElementById('manualEntryDiv');
  const isHidden = manualDiv.classList.contains('hidden');
  
  if (isHidden) {
    manualDiv.classList.remove('hidden');
    prManager.selectedItem = null;
    document.getElementById('selectedItemInfo').classList.add('hidden');
    document.getElementById('priceInfo').classList.add('hidden');
  } else {
    manualDiv.classList.add('hidden');
  }
}

function handleVendorChange() {
  const vendorSource = document.getElementById('vendorSource').value;
  const vendorDetailsDiv = document.getElementById('vendorDetailsDiv');
  
  if (vendorSource && vendorSource !== '') {
    vendorDetailsDiv.classList.remove('hidden');
  } else {
    vendorDetailsDiv.classList.add('hidden');
  }
}

function addItemToPR() {
  const quantity = document.getElementById('qty').value;
  const unitPrice = document.getElementById('unit').value;
  const vendorSource = document.getElementById('vendorSource').value;
  const vendorDetails = document.getElementById('vendorDetails').value;
  const remarks = document.getElementById('itemRemarks').value;

  // Validation
  if (!quantity || quantity <= 0) {
    alert('Please enter a valid quantity');
    return;
  }

  if (!unitPrice || unitPrice <= 0) {
    alert('Please enter a valid unit price');
    return;
  }

  if (!vendorSource) {
    alert('Please select a vendor/purchase source');
    return;
  }

  let itemData;
  const isManualEntry = !document.getElementById('manualEntryDiv').classList.contains('hidden');

  if (isManualEntry) {
    const manualName = document.getElementById('manualItemName').value;
    if (!manualName) {
      alert('Please enter item name/description');
      return;
    }
    itemData = {
      code: 'NEW-ITEM',
      name: manualName,
      quantity: quantity,
      unitPrice: unitPrice,
      vendor: vendorSource,
      vendorDetails: vendorDetails,
      remarks: remarks,
      emergency: false
    };
  } else {
    if (!prManager.selectedItem) {
      alert('Please select an item from the catalog');
      return;
    }
    itemData = {
      code: prManager.selectedItem.code,
      name: prManager.selectedItem.name,
      quantity: quantity,
      unitPrice: unitPrice,
      vendor: vendorSource,
      vendorDetails: vendorDetails,
      remarks: remarks,
      emergency: prManager.selectedItem.emergency
    };
  }

  // Add item
  const item = prManager.addItem(itemData);
  
  // Update UI
  updatePRSummary();
  renderItemsTable();
  resetForm();
  
  utils.showMessage('msg', 'Item added successfully!', 'success');
}

function updatePRSummary() {
  const summary = prManager.getSummary();
  
  document.getElementById('totalItems').textContent = summary.totalItems;
  document.getElementById('totalQty').textContent = summary.totalQuantity;
  document.getElementById('totalAmount').textContent = summary.totalAmount.toLocaleString('en-IN');
  document.getElementById('emergencyCount').textContent = summary.emergencyCount;

  // Show/hide summary and action buttons
  const showElements = summary.totalItems > 0;
  document.getElementById('summaryDiv').style.display = showElements ? 'block' : 'none';
  document.getElementById('tableDiv').style.display = showElements ? 'block' : 'none';
  document.getElementById('actionButtons').style.display = showElements ? 'flex' : 'none';
}

function renderItemsTable() {
  const tbody = document.querySelector('#itemTable tbody');
  if (!tbody) return;

  tbody.innerHTML = prManager.currentPR.items.map(item => `
    <tr>
      <td>${item.code}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.unitPrice.toLocaleString('en-IN')}</td>
      <td>₹${item.total.toLocaleString('en-IN')}</td>
      <td>${item.vendor}${item.vendorDetails ? `<br><small>${item.vendorDetails}</small>` : ''}</td>
      <td><span class="badge ${item.approval === 'Normal' ? 'badge-normal' : 'badge-level2'}">${item.approval}</span></td>
      <td>${item.remarks || '-'}</td>
      <td><button class="btn btn-danger btn-small" onclick="removeItem(${item.id})">Remove</button></td>
    </tr>
  `).join('');
}

function removeItem(itemId) {
  if (confirm('Are you sure you want to remove this item?')) {
    prManager.removeItem(itemId);
    updatePRSummary();
    renderItemsTable();
    utils.showMessage('msg', 'Item removed', 'success');
  }
}

function resetForm() {
  document.getElementById('searchInput').value = '';
  document.getElementById('equipmentSearchInput').value = '';
  document.getElementById('qty').value = '1';
  document.getElementById('unit').value = '';
  document.getElementById('vendorSource').value = '';
  document.getElementById('vendorDetails').value = '';
  document.getElementById('itemRemarks').value = '';
  document.getElementById('manualItemName').value = '';
  
  document.getElementById('selectedItemInfo').classList.add('hidden');
  document.getElementById('priceInfo').classList.add('hidden');
  document.getElementById('manualEntryDiv').classList.add('hidden');
  document.getElementById('vendorDetailsDiv').classList.add('hidden');
  
  prManager.selectedItem = null;
}

function submitPR() {
  if (confirm('Are you sure you want to submit this PR for approval?')) {
    const result = prManager.submitPR();
    
    if (result.success) {
      utils.showMessage('msg', result.message, 'success');
      document.getElementById('prStatus').textContent = `Submitted - ${result.prNumber}`;
      
      // Disable editing
      document.getElementById('addItemBtn').disabled = true;
      document.getElementById('submitPRBtn').disabled = true;
      document.getElementById('saveDraftBtn').disabled = true;
      
      setTimeout(() => {
        if (confirm('PR submitted! Would you like to create a new PR?')) {
          clearAllItems();
        }
      }, 2000);
    } else {
      utils.showMessage('msg', result.message, 'error');
    }
  }
}

function saveDraft() {
  const result = prManager.saveDraft();
  
  if (result.success) {
    utils.showMessage('msg', result.message, 'success');
  } else {
    utils.showMessage('msg', result.message, 'error');
  }
}

function clearAllItems() {
  if (confirm('Are you sure you want to clear all items?')) {
    prManager.clearAll();
    updatePRSummary();
    renderItemsTable();
    resetForm();
    
    // Re-enable buttons
    document.getElementById('addItemBtn').disabled = false;
    document.getElementById('submitPRBtn').disabled = false;
    document.getElementById('saveDraftBtn').disabled = false;
    document.getElementById('prStatus').textContent = 'Draft (Not Submitted)';
    
    utils.showMessage('msg', 'All items cleared', 'success');
  }
}

// ===========================
// MY PRs TAB
// ===========================
function attachMyPRListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterApprovedPRs(filter);
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      filterButtons.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.add('active');
      btn.classList.remove('btn-secondary');
    });
  });
}

function loadMyPRs() {
  loadApprovedPRs();
  loadPendingPRs();
  loadDraftPRs();
  loadRejectedPRs();
}

function loadApprovedPRs() {
  const listDiv = document.getElementById('approvedPRList');
  if (!listDiv) return;

  listDiv.innerHTML = samplePRs.approved.map(pr => createPRCard(pr)).join('');
}

function loadPendingPRs() {
  const listDiv = document.getElementById('pendingPRList');
  if (!listDiv) return;

  listDiv.innerHTML = samplePRs.pending.length > 0 
    ? samplePRs.pending.map(pr => createPRCard(pr)).join('')
    : '<p style="color: #666;">No pending PRs</p>';
}

function loadDraftPRs() {
  const listDiv = document.getElementById('draftPRList');
  if (!listDiv) return;

  listDiv.innerHTML = samplePRs.draft.length > 0
    ? samplePRs.draft.map(pr => createPRCard(pr)).join('')
    : '<p style="color: #666;">No draft PRs</p>';
}

function loadRejectedPRs() {
  const listDiv = document.getElementById('rejectedPRList');
  if (!listDiv) return;

  listDiv.innerHTML = '<p style="color: #666;">No rejected PRs</p>';
}

function createPRCard(pr) {
  return `
    <div class="pr-card">
      <div class="pr-card-header">
        <div class="pr-card-title">${pr.prNumber}</div>
        <span class="badge badge-${pr.status.toLowerCase().includes('approved') ? 'approved' : 'pending'}">
          ${pr.status}
        </span>
      </div>
      <div class="pr-card-body">
        <p><strong>Date:</strong> ${utils.formatDate(pr.date)}</p>
        <p><strong>Items:</strong> ${pr.items} | <strong>Amount:</strong> ${utils.formatCurrency(pr.amount)}</p>
        ${pr.purchased !== undefined ? `<p><strong>Purchased:</strong> ${pr.purchased ? 'Yes' : 'No'}</p>` : ''}
      </div>
      <div class="pr-card-footer">
        <button class="btn btn-small">View Details</button>
        ${!pr.purchased && pr.status === 'Approved' ? '<button class="btn btn-small btn-success">Mark as Purchased</button>' : ''}
      </div>
    </div>
  `;
}

function filterApprovedPRs(filter) {
  const cards = document.querySelectorAll('#approvedPRList .pr-card');
  
  cards.forEach(card => {
    const purchasedText = card.textContent.includes('Purchased: Yes');
    const notPurchasedText = card.textContent.includes('Purchased: No');
    
    if (filter === 'all') {
      card.style.display = 'block';
    } else if (filter === 'purchased') {
      card.style.display = purchasedText ? 'block' : 'none';
    } else if (filter === 'unpurchased') {
      card.style.display = notPurchasedText ? 'block' : 'none';
    }
  });
}

// ===========================
// VENDOR SEARCH
// ===========================
function attachVendorSearchListeners() {
  const searchBtn = document.getElementById('searchVendorBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', searchVendors);
  }
}

function searchVendors() {
  const product = document.getElementById('vendorSearchProduct').value;
  const equipment = document.getElementById('vendorSearchEquipment').value;
  
  const vendors = prManager.searchVendors({ product: product || equipment });
  
  const resultsDiv = document.getElementById('vendorResults');
  if (!resultsDiv) return;
  
  if (vendors.length === 0) {
    resultsDiv.innerHTML = '<p style="color: #666;">No vendors found. Try different search terms.</p>';
    return;
  }
  
  resultsDiv.innerHTML = `
    <h3 style="margin: 20px 0 10px; color: #003366;">Search Results (${vendors.length} vendors)</h3>
    ${vendors.map(vendor => `
      <div class="pr-card">
        <div class="pr-card-header">
          <div class="pr-card-title">${vendor.name}</div>
          <span class="badge badge-approved">Rating: ${vendor.rating}/5</span>
        </div>
        <div class="pr-card-body">
          <p><strong>Location:</strong> ${vendor.location}</p>
          <p><strong>Specialization:</strong> ${vendor.specialization.join(', ')}</p>
          <p><strong>Contact:</strong> ${vendor.contact}</p>
        </div>
        <div class="pr-card-footer">
          <button class="btn btn-small">Contact Vendor</button>
          <button class="btn btn-small btn-secondary">View Products</button>
        </div>
      </div>
    `).join('')}
  `;
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions globally accessible for onclick handlers
window.selectMaterial = selectMaterial;
window.selectEquipment = selectEquipment;
window.removeItem = removeItem;
