# Deployment Instructions

## 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name it: `smart-money-manager`
4. Make it **Public** (required for free Vercel deployment)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## 2. Push to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/smart-money-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `smart-money-manager` repository
4. Keep all default settings
5. Click "Deploy"

Your app will be deployed to: `https://smart-money-manager-YOUR_USERNAME.vercel.app`

## 4. Install as PWA on Mobile

### Android (Chrome):
1. Open your deployed app in Chrome
2. Tap the three dots menu (⋮)
3. Tap "Add to Home screen" or "Install app"
4. Follow the prompts

### iOS (Safari):
1. Open your deployed app in Safari
2. Tap the share button (square with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add"

### Alternative Method:
1. Open your app in any browser
2. Look for the install prompt banner
3. Click "Install" when prompted

## 5. Test PWA Features

- ✅ Offline functionality
- ✅ App-like experience
- ✅ Home screen icon
- ✅ Full-screen mode
- ✅ Theme switching
- ✅ Data persistence

## 6. Customize Icons (Optional)

Replace the placeholder icons in `public/` with your own:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use tools like:
- [Figma](https://figma.com)
- [Canva](https://canva.com)
- [Favicon.io](https://favicon.io)

## 7. Environment Variables (Future)

If you add Firebase or other APIs later, add them in Vercel:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your API keys

## 8. Custom Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Configure DNS as instructed

---

**Your Smart Money Manager PWA is now live and installable! 🎉** 