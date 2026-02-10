# 🚀 GitHub Deployment Guide

This guide will help you deploy your PowerGrid PR Management System to GitHub and make it live on GitHub Pages.

## 📋 Prerequisites

- A GitHub account (create one at https://github.com/join if needed)
- Git installed on your computer

## 🎯 Step-by-Step Deployment

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `powergrid-pr-system` (or any name you prefer)
   - **Description**: "Purchase Requisition Management System for PowerGrid Corporation"
   - **Public** or **Private**: Choose based on your needs
   - ⚠️ **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Step 2: Upload Your Code to GitHub

You have two options:

#### Option A: Using Git Command Line (Recommended)

1. Open terminal/command prompt in your project folder
2. Run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: PowerGrid PR Management System"

# Add your GitHub repository as remote
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/powergrid-pr-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: Using GitHub Desktop (Easier)

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click **File** → **Add Local Repository**
4. Select your project folder
5. Click **Publish repository**
6. Choose repository name and click **Publish**

#### Option C: Upload Files Directly (Simplest)

1. On your repository page, click **"Add file"** → **"Upload files"**
2. Drag and drop all your project files
3. Write a commit message: "Initial commit"
4. Click **"Commit changes"**

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

### Step 4: Access Your Live Site

After a few minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/powergrid-pr-system/
```

You can find the exact URL in Settings → Pages under "Your site is live at..."

## 🎉 You're Done!

Your PowerGrid PR Management System is now live on the internet!

## 📝 Making Updates

Whenever you make changes to your code:

```bash
# Save your changes
git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages will automatically update your live site!

## 🔧 Troubleshooting

### Site Not Loading?

1. **Wait a few minutes** - GitHub Pages takes 1-5 minutes to deploy
2. **Check Settings → Pages** - Make sure it shows "Your site is published at..."
3. **Clear browser cache** - Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
4. **Check branch** - Make sure you selected the correct branch in Pages settings

### 404 Error?

1. Make sure `index.html` is in the root directory
2. Check that the repository is public (or you're logged in if private)
3. Verify the URL is correct: `https://username.github.io/repo-name/`

### CSS/JS Not Loading?

1. Check that file paths are relative (no leading `/`)
2. In HTML, use: `css/main.css` not `/css/main.css`
3. Files are case-sensitive: `Main.css` ≠ `main.css`

## 🌟 Optional Enhancements

### Custom Domain

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In repository Settings → Pages → Custom domain
3. Enter your domain name
4. Configure DNS settings with your domain provider

### HTTPS (Free)

GitHub Pages automatically provides HTTPS. Just check:
- Settings → Pages → **Enforce HTTPS** ✓

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Desktop Guide](https://docs.github.com/en/desktop)

## 💡 Tips

1. **Test locally first** - Always test changes on your computer before pushing
2. **Commit often** - Make small, frequent commits with clear messages
3. **Use branches** - Create feature branches for major changes
4. **Check the live site** - After pushing, wait a minute and check your live site

## 🆘 Need Help?

If you run into issues:
1. Check the troubleshooting section above
2. Google the error message
3. Ask in GitHub Discussions
4. Check Stack Overflow

---

**Congratulations!** 🎊 Your application is now live on the internet and anyone can access it!
