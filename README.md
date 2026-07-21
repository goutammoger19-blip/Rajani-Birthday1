# 🎂 Rajani's 3D Birthday Website - Setup Guide

## Quick Start Guide

### Step 1: Add Your Photo

1. **Create an `images` folder:**
   - Go to your repository: https://github.com/goutammoger19-blip/Rajani-Birthday1
   - Click "Add file" → "Create new file"
   - Type: `images/rajani.jpg` (this creates the folder & file)
   - Click "Upload files" instead
   - Upload your photo as `rajani.jpg`

**OR** use these steps:

1. Click the **"Add file"** button (top right of repo)
2. Click **"Upload files"**
3. Drag and drop your photo, OR click to browse
4. Make sure the path is: `images/rajani.jpg`
5. Click **"Commit changes"**

**Photo Requirements:**
- File name: `rajani.jpg`
- File size: Less than 5MB
- Format: JPG or PNG
- Dimensions: Square (500x500px ideal)

---

### Step 2: Add Birthday Music (Optional)

1. Click **"Add file"** → **"Upload files"**
2. Upload an MP3 file named `music.mp3`
3. Place it in the **root** folder (same level as index.html)
4. Click **"Commit changes"**

**Music Requirements:**
- File name: `music.mp3`
- Format: MP3
- Size: Less than 10MB
- Duration: Any length (it loops)

**Where to get music:**
- YouTube Audio Library (free)
- Pixabay (free royalty-free)
- Bensound.com (free)

---

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll down to **"Pages"** section
3. Under "Source", select **"Deploy from a branch"**
4. Choose branch: **`main`**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be at: `https://goutammoger19-blip.github.io/Rajani-Birthday1/`

---

### Step 4: Test Your Website

1. Visit: `https://goutammoger19-blip.github.io/Rajani-Birthday1/`
2. You should see the 3D birthday page!
3. Click **"Begin the Surprise"** to start
4. Play through all 4 stages

---

## 📸 How to Add Photo (Detailed)

### Method 1: Direct Upload (Easiest)

```
1. Click "Add file" dropdown
2. Select "Upload files"
3. Click "choose your files" or drag & drop
4. Select your photo (rajani.jpg)
5. In the filename field, type: images/rajani.jpg
6. Click "Commit changes"
```

### Method 2: GitHub Web Editor

```
1. Click "Add file" → "Create new file"
2. Type exactly: images/rajani.jpg
3. You'll see an error (this is expected)
4. Go back and click "Upload files" instead
5. Upload your photo
```

### Method 3: Using Git Command Line (Advanced)

```bash
# Clone the repo
git clone https://github.com/goutammoger19-blip/Rajani-Birthday1.git
cd Rajani-Birthday1

# Create images folder
mkdir images

# Add your photo to images/ folder
# (copy rajani.jpg into the images folder)

# Commit and push
git add images/rajani.jpg
git commit -m "Add Rajani's birthday photo"
git push origin main
```

---

## 🎵 How to Add Music (Detailed)

### Method 1: Direct Upload

```
1. Click "Add file" → "Upload files"
2. Upload your mp3 file
3. Name it: music.mp3
4. Make sure it's in the ROOT folder (not in any subfolder)
5. Click "Commit changes"
```

### File Structure Should Look Like:

```
Rajani-Birthday1/
├── index.html          ← Main file
├── script.js           ← Game logic
├── style.css           ← Styling
├── three-setup.js      ← 3D animations
├── music.mp3           ← Your music (ROOT level)
├── images/
│   └── rajani.jpg      ← Your photo
└── README.md           ← This file
```

---

## 🚀 How to Deploy (GitHub Pages)

### Step-by-Step:

1. **Go to Repository Settings**
   - Visit: https://github.com/goutammoger19-blip/Rajani-Birthday1/settings

2. **Navigate to Pages**
   - Scroll down on the left sidebar
   - Click "Pages"

3. **Configure Deployment**
   - Under "Source": Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/ (root)"
   - Click "Save"

4. **Wait for Deployment**
   - GitHub will show a link after 1-2 minutes
   - It will look like: `https://goutammoger19-blip.github.io/Rajani-Birthday1/`

5. **Visit Your Site**
   - Copy the link from the Pages section
   - Share it with Rajani!

---

## ✨ Website Features

### 4 Interactive Stages:

**Stage 1: Welcome 🎂**
- Beautiful hero section
- 3D animated cakes in background
- Click "Begin the Surprise"

**Stage 2: Pop Bubbles 🫧**
- Pop all 12 bubbles
- Secret letters spell "RAJANI"
- 3D balloons floating above
- Progress tracker

**Stage 3: Solve Puzzle 🧩**
- Slide tiles to solve puzzle
- Move counter & timer
- 3D gifts rotating
- Celebrate when complete

**Stage 4: Birthday Wish 💌**
- Personal message
- Your photo displays
- All 3D objects celebrate
- Confetti & music playing

---

## 🎮 How It Works

### The 3D Magic:

The website uses **Three.js** (a powerful 3D library) to create:
- Animated 3D cakes with candles
- Floating balloons
- Rotating gift boxes
- Particle effects
- Smooth transitions between stages

Everything runs in the browser - no special server needed!

---

## 🔧 Customization

### Change the Name (If Needed):

1. Open `index.html` in the GitHub web editor
2. Find: `<span class="name">Rajani</span>`
3. Replace `Rajani` with any name
4. Click "Commit changes"

### Change the Message:

1. Open `index.html`
2. Find the section with the birthday message
3. Edit the text in the `<div class="message">` section
4. Commit changes

### Change Colors:

Open `style.css` and look for the `:root` section:
```css
:root {
  --pink: #ff6b9d;
  --purple: #9b59b6;
  --gold: #ffd700;
}
```

Change these color codes to any hex color!

---

## 📱 Mobile Friendly

The website works perfectly on:
- Desktop computers
- Tablets
- Smartphones
- All modern browsers

The 3D animations automatically adapt to screen size!

---

## 🎵 Music Credits

Free music sources:
- **YouTube Audio Library**: youtube.com/audiolibrary
- **Pixabay Music**: pixabay.com/music
- **Bensound**: bensound.com
- **Free Music Archive**: freemusicarchive.org

---

## ⚠️ Troubleshooting

### Photo not showing?
- Check filename is exactly: `rajani.jpg`
- Make sure it's in `images/` folder
- Try refreshing the page (Ctrl+F5)
- File size must be under 5MB

### Music not playing?
- Check filename is exactly: `music.mp3`
- It must be in the ROOT folder
- Try a different MP3 file
- Some browsers need user interaction first

### 3D not animating?
- Make sure JavaScript is enabled
- Try a different browser (Chrome/Firefox works best)
- Check internet connection

### Site not loading?
- Wait a few minutes after pushing changes
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check GitHub Pages is enabled in Settings

---

## 🎉 Final Checklist

- ✅ Repository created
- ✅ Code pushed to GitHub
- ✅ Photo added (images/rajani.jpg)
- ✅ Music added (music.mp3) - Optional
- ✅ GitHub Pages enabled
- ✅ Website deployed
- ✅ Link ready to share!

---

## 🎊 Share Your Website

Copy this link and send to Rajani:
```
https://goutammoger19-blip.github.io/Rajani-Birthday1/
```

Or create a short link using:
- bit.ly
- tinyurl.com
- Short.link

---

## 💡 Tips

1. **Test Before Sharing**: Open the link yourself first
2. **Use Mobile Preview**: Test on phone too
3. **Wait for Deployment**: GitHub Pages takes 1-2 minutes
4. **Cache Issues**: If updates don't show, try Ctrl+Shift+Delete (clear cache)
5. **Best Experience**: Desktop for full 3D effect, mobile for convenience

---

## 🆘 Need Help?

If something isn't working:
1. Check the troubleshooting section above
2. Verify file names and folders are correct
3. Hard refresh your browser
4. Check GitHub Pages is enabled
5. Wait 5 minutes and try again

---

**Made with ❤️ for Rajani's Birthday! 🎂✨**
