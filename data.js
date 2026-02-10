// Sample Material Catalog Data
const materialCatalog = [
  {
    code: "ELEC-MCB-001",
    name: "MCB 32A Single Pole",
    category: "Circuit Protection",
    unit: "pcs",
    standardPrice: 450,
    emergency: false
  },
  {
    code: "ELEC-MCB-002",
    name: "MCB 63A Triple Pole",
    category: "Circuit Protection",
    unit: "pcs",
    standardPrice: 1250,
    emergency: false
  },
  {
    code: "ELEC-CABLE-001",
    name: "4-Core Armoured Cable 95mm²",
    category: "Cables",
    unit: "meter",
    standardPrice: 850,
    emergency: false
  },
  {
    code: "ELEC-RELAY-001",
    name: "Protective Relay SEL-351",
    category: "Protection & Control",
    unit: "pcs",
    standardPrice: 125000,
    emergency: true
  },
  {
    code: "ELEC-CT-001",
    name: "Current Transformer 400/1A",
    category: "Metering",
    unit: "pcs",
    standardPrice: 18500,
    emergency: false
  },
  {
    code: "ELEC-INSUL-001",
    name: "Porcelain Insulator 220kV",
    category: "Insulators",
    unit: "pcs",
    standardPrice: 3200,
    emergency: false
  },
  {
    code: "ELEC-FUSE-001",
    name: "HRC Fuse 200A",
    category: "Circuit Protection",
    unit: "pcs",
    standardPrice: 2400,
    emergency: false
  },
  {
    code: "ELEC-BATT-001",
    name: "VRLA Battery 12V 100Ah",
    category: "Power Supply",
    unit: "pcs",
    standardPrice: 8500,
    emergency: false
  },
  {
    code: "MAINT-OIL-001",
    name: "Transformer Oil (Uninhibited)",
    category: "Maintenance",
    unit: "liter",
    standardPrice: 180,
    emergency: false
  },
  {
    code: "MAINT-GREASE-001",
    name: "Contact Grease Compound",
    category: "Maintenance",
    unit: "kg",
    standardPrice: 450,
    emergency: false
  }
];

// Equipment Database (for spare parts search)
const equipmentDatabase = [
  {
    name: "400kV SF6 Circuit Breaker",
    manufacturer: "Siemens",
    model: "3AP1FG",
    spares: [
      { code: "CB-SEAL-001", name: "SF6 Gas Seal Kit", price: 45000 },
      { code: "CB-CONTACT-001", name: "Main Contact Assembly", price: 125000 },
      { code: "CB-SPRING-001", name: "Operating Spring Set", price: 32000 }
    ]
  },
  {
    name: "Power Transformer 220/132kV",
    manufacturer: "ABB",
    model: "RESIBLOC",
    spares: [
      { code: "TF-BUSHING-001", name: "HV Bushing 220kV", price: 185000 },
      { code: "TF-TAP-001", name: "Tap Changer Contact", price: 65000 },
      { code: "TF-COOLING-001", name: "Cooling Fan Motor", price: 28000 }
    ]
  },
  {
    name: "Numerical Relay",
    manufacturer: "Schneider",
    model: "SEPAM-80",
    spares: [
      { code: "REL-MOD-001", name: "I/O Module", price: 12000 },
      { code: "REL-DISP-001", name: "Display Unit", price: 8500 },
      { code: "REL-PWR-001", name: "Power Supply Module", price: 15000 }
    ]
  }
];

// Vendor Database
const vendorDatabase = [
  {
    name: "PowerTech Solutions",
    location: "Delhi",
    specialization: ["Circuit Breakers", "Transformers", "Protection Equipment"],
    rating: 4.5,
    contact: "9876543210"
  },
  {
    name: "ElectroMart India",
    location: "Mumbai",
    specialization: ["Cables", "Insulators", "General Electrical"],
    rating: 4.2,
    contact: "9876543211"
  },
  {
    name: "Industrial Supplies Co",
    location: "Kolkata",
    specialization: ["Maintenance Items", "Tools", "Safety Equipment"],
    rating: 4.0,
    contact: "9876543212"
  },
  {
    name: "GeM Portal",
    location: "Online",
    specialization: ["All Categories"],
    rating: 4.8,
    contact: "gem.gov.in"
  }
];

// Sample PR data for demo
const samplePRs = {
  approved: [
    {
      prNumber: "PR-2026-001",
      date: "2026-01-15",
      items: 3,
      amount: 45000,
      status: "Approved",
      purchased: false
    },
    {
      prNumber: "PR-2026-002",
      date: "2026-01-22",
      items: 5,
      amount: 125000,
      status: "Approved",
      purchased: true
    }
  ],
  pending: [
    {
      prNumber: "PR-2026-003",
      date: "2026-02-05",
      items: 2,
      amount: 32000,
      status: "Pending L1 Approval",
      purchased: false
    }
  ],
  draft: [
    {
      prNumber: "Draft-001",
      date: "2026-02-10",
      items: 1,
      amount: 8500,
      status: "Draft",
      purchased: false
    }
  ],
  rejected: []
};
