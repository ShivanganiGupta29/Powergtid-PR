# PowerGrid PR Management System

A modern web-based Purchase Requisition (PR) management system built for PowerGrid Corporation. This application allows employees to create, manage, and track purchase requisitions with an intuitive interface.

![PowerGrid PR System](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

- **Material Catalog Search**: Search and select items from a comprehensive material catalog
- **Equipment Spare Parts**: Find spare parts by equipment type
- **Price Comparison**: Compare your quoted price with standard prices
- **PR Management**: Create, submit, save drafts, and track purchase requisitions
- **Vendor Search**: Find vendors by product type and location
- **Multi-tab Interface**: Organized workflow with separate tabs for different functions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📋 Demo Credentials

- **Employee ID**: PG12345
- **Password**: password

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS variables, Grid, and Flexbox
- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript
- **LocalStorage**: Client-side data persistence

## 📁 Project Structure

```
powergrid-pr-system/
├── index.html              # Main HTML file
├── css/
│   └── main.css           # All styles with CSS variables
├── js/
│   ├── data.js            # Sample data (catalog, equipment, vendors)
│   ├── prManager.js       # PR management logic
│   └── app.js             # Main application & UI interactions
├── assets/                 # Images and other assets (if needed)
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: GitHub Pages (Recommended)

1. **Fork this repository** or clone it to your GitHub account

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select `main` branch
   - Folder: Select `/ (root)`
   - Click Save

3. **Access your site**: Your site will be available at:
   ```
   https://your-username.github.io/powergrid-pr-system/
   ```

### Option 2: Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/powergrid-pr-system.git
   cd powergrid-pr-system
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access**: Navigate to `http://localhost:8000`

## 📖 Usage Guide

### Creating a Purchase Requisition

1. **Login** with demo credentials (PG12345 / password)
2. Click **"Create New PR"** tab
3. **Search for materials**:
   - Type in the search box to find items from catalog
   - OR search by equipment name for spare parts
   - OR click "New Item" to add unlisted items
4. **Enter details**:
   - Quantity
   - Unit price
   - Vendor/source
   - Optional remarks
5. Click **"Add Item"** to add to PR
6. Review items in the table below
7. Click **"Submit PR"** or **"Save Draft"**

### Viewing Your PRs

1. Click **"My PRs"** tab
2. Use sub-tabs to filter:
   - **Approved**: View approved PRs
   - **Pending**: PRs awaiting approval
   - **Draft**: Saved drafts
   - **Rejected**: Rejected PRs

### Finding Vendors

1. Click **"Find Vendor"** tab
2. Search by product type or equipment
3. View vendor details, ratings, and contact information

## 🎨 Customization

### Changing Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --primary-color: #003366;      /* Main brand color */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #28a745;      /* Success messages */
  --danger-color: #dc3545;       /* Error messages */
}
```

### Adding More Materials

Edit the `materialCatalog` array in `js/data.js`:

```javascript
{
  code: "YOUR-CODE",
  name: "Item Name",
  category: "Category",
  unit: "pcs",
  standardPrice: 1000,
  emergency: false
}
```

### Modifying Workflows

The main application logic is in `js/app.js`. Key functions:
- `addItemToPR()` - Adding items to PR
- `submitPR()` - Submitting PR for approval
- `loadMyPRs()` - Loading user's PRs

## 🔐 Security Notes

**⚠️ Important**: This is a demo application with client-side authentication only.

For production use, you should:
- Implement proper server-side authentication
- Use HTTPS
- Add API endpoints for data storage
- Implement proper user session management
- Sanitize all user inputs
- Add CSRF protection
- Use environment variables for sensitive data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created with ❤️ for PowerGrid Corporation

## 🙏 Acknowledgments

- Design inspired by modern enterprise applications
- Built with clean, maintainable code following best practices
- No external dependencies - pure vanilla JavaScript

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Note**: This is a demonstration application. For production deployment, please implement proper backend services, authentication, and security measures.
