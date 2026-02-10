const prManager = new PRManager();

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const addItemBtn = document.getElementById("addItemBtn");
  const submitPRBtn = document.getElementById("submitPRBtn");
  const saveDraftBtn = document.getElementById("saveDraftBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");

  loginBtn.addEventListener("click", login);
  addItemBtn.addEventListener("click", addItem);
  submitPRBtn.addEventListener("click", submitPR);
  saveDraftBtn.addEventListener("click", saveDraft);
  clearAllBtn.addEventListener("click", clearAll);

  document.getElementById("manualItemToggle").addEventListener("change", toggleManual);
  document.getElementById("searchInput").addEventListener("input", searchItems);
});

/* LOGIN */
function login() {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("hidden");
}

/* SEARCH */
function searchItems(e) {
  const query = e.target.value.toLowerCase();
  const resultsBox = document.getElementById("searchResults");
  resultsBox.innerHTML = "";

  if (!query) {
    resultsBox.classList.add("hidden");
    return;
  }

  const matches = catalogData.filter(i =>
    i.description.toLowerCase().includes(query)
  );

  matches.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.code} - ${item.description}`;
    div.onclick = () => {
      document.getElementById("searchInput").value = item.description;
      document.getElementById("unitPrice").value = item.price;
      resultsBox.classList.add("hidden");
    };
    resultsBox.appendChild(div);
  });

  resultsBox.classList.remove("hidden");
}

/* MANUAL TOGGLE */
function toggleManual(e) {
  document.getElementById("manualDescription").classList.toggle("hidden", !e.target.checked);
}

/* ADD ITEM */
function addItem() {
  const qty = Number(document.getElementById("quantity").value);
  const price = Number(document.getElementById("unitPrice").value);
  const vendor = document.getElementById("vendorSource").value;
  const isManual = document.getElementById("manualItemToggle").checked;
  const emergency = document.getElementById("emergencyFlag").checked;

  if (!qty || !price || !vendor) {
    alert("Quantity, Price & Vendor are mandatory");
    return;
  }

  const item = {
    code: isManual ? "NEW-ITEM" : "CAT-ITEM",
    description: isManual
      ? document.getElementById("manualDescription").value
      : document.getElementById("searchInput").value,
    qty,
    unitPrice: price,
    total: qty * price,
    vendor,
    approval: emergency ? "Emergency Approval" : "Pending"
  };

  prManager.addItem(item);
  renderTable();
}

/* TABLE */
function renderTable() {
  const tbody = document.getElementById("itemsTable");
  tbody.innerHTML = "";

  prManager.items.forEach(i => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i.code}</td>
      <td>${i.description}</td>
      <td>${i.qty}</td>
      <td>${i.unitPrice}</td>
      <td>${i.vendor}</td>
      <td>${i.approval}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* SAVE DRAFT */
function saveDraft() {
  localStorage.setItem("prDraft", JSON.stringify(prManager.items));
  document.getElementById("prStatus").textContent = "Draft saved successfully.";
}

/* SUBMIT */
function submitPR() {
  localStorage.setItem("submittedPR", JSON.stringify(prManager.items));
  document.getElementById("prStatus").textContent = "PR submitted successfully.";
}

/* CLEAR */
function clearAll() {
  prManager.clearAll();
  renderTable();
}
