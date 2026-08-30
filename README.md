<div align="center">

# 🚀 Mohammed Aliyan — Portfolio

### Certified by Google · AWS · NASA · Tata · Walmart · Siemens · EA · Accenture · UNICEF

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com)
[![HTML5](https://img.shields.io/badge/Built_with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/Styled_with-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/Powered_by-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-22c55e?style=for-the-badge)](#)

**A zero-dependency, single-page portfolio with 5 switchable UI themes, buttery-smooth animations, and a full-featured certificate viewer with pinch-to-zoom — designed to run anywhere, forever.**

[![Live Demo](https://img.shields.io/badge/LIVE-View_Portfolio-8b5cf6?style=for-the-flat-square)](https://mohammedaliyan07.github.io/portfolio/)

</div>

---

## ✨ Features

### 🎨 Five Hand-Crafted UI Themes (2026 Design Trends)
| Theme | Vibe | Trend Reference |
|-------|------|-----------------|
| **Nebula** | Dark · Purple/Blue gradients | Dark-mode-first + Glassmorphism |
| **Ocean** | Dark · Cyan glow | Glassmorphism · Vibrant gradients |
| **Aurora** | Dark · Emerald tones | Aurora gradients |
| **Daylight** | Light · Indigo accents | Clean light UI |
| **Brutalist** | Cream · Bold borders & hard shadows | Neo-Brutalism |

Theme choice is saved to `localStorage` and persists across visits.

### 🖼️ Professional Certificate Viewer
Every one of the **28 certifications** opens in a custom lightbox with:
- 🤏 **Pinch to zoom** (multi-touch) & scroll-wheel zoom toward cursor
- ✋ **Drag to pan** when zoomed
- ↔️ **Swipe / arrow keys** to browse between certificates
- 🖱️ Double-click / double-tap to toggle zoom
- ⌨️ Keyboard shortcuts (`Esc` close · `←/→` navigate · `+/−` zoom · `0` reset)
- ⛶ Fullscreen mode & one-click download
- Credential IDs, skills and issue dates displayed per certificate

### 🎬 Animations & Micro-interactions
- Animated **preloader** with progress counter
- **Scroll-triggered reveals** with staggered delays (IntersectionObserver)
- **3D tilt cards** (hero avatar) and **magnetic buttons**
- **Typing effect** cycling through professional roles
- Animated **skill bars** & **stat counters**
- Parallax **gradient orbs**, infinite **issuer marquee**, animated **timeline**
- Custom **cursor** with hover states (desktop only)
- Full `prefers-reduced-motion` support — animations disabled for users who opt out

### ⚡ Engineering
- **Zero dependencies** — pure HTML/CSS/JS, no build step, nothing to install
- Optimized images (25 MB → 4.4 MB) with lazy loading & progressive JPEGs
- Fully **responsive** (desktop → tablet → mobile) with hamburger nav
- **SEO ready** — meta tags, Open Graph, Twitter cards, JSON-LD Person schema
- **Accessible** — ARIA labels, keyboard navigation, focus states, semantic HTML

---

## 🧑‍💼 About

**Mohammed Aliyan** — final-year **B.Com (Computer Applications)** student at Kakatiya University (Class of 2027), building a profile at the intersection of **business and technology**.

- 📧 **Email:** [aliyan8834@gmail.com](mailto:aliyan8834@gmail.com)
- 🐙 **GitHub:** [@mohammedaliyan07](https://github.com/mohammedaliyan07)
- 🎓 **Education:** B.Com (Computer Applications), Kakatiya University
- 🎂 **DOB:** 28 November 2005

### 📜 Credential Highlights (28 total)

| Domain | Count | Notable Issuers |
|--------|-------|-----------------|
| 🤖 AI & Prompt Engineering | 8 | Google, AWS, Accenture, Infosys, Intel, Dubai Future Foundation |
| 🛡️ Cybersecurity | 5 | Tata, Tech Mahindra, HP Foundation, Reliance Foundation |
| 📋 Project & Product Management | 5 | Siemens, Electronic Arts, Simplilearn (CAPM®), HP |
| 📊 Data & Analytics | 4 | NASA, Tata, TCS iON, The Open University |
| 💼 Business & Operations | 2 | Walmart, Mind Luster |
| 💰 Finance | 3 | UNICEF, Skill India · NSDC |
| 🎨 Design | 1 | Canva Design School |

> Includes **4 virtual job simulations** (Walmart Area Manager, Siemens Project Manager, EA Product Manager, Tata Cybersecurity Analyst) via Forage.

---

## 🚀 Deploy on GitHub Pages (2 minutes)

1. **Fork or upload** this repository to your GitHub account.
2. Go to the repo → **Settings** → **Pages**.
3. Under *Build and deployment* → Source: select **Deploy from a branch**.
4. Branch: **`main`** · Folder: **`/ (root)`** → **Save**.
5. Wait ~1 minute, then visit:
   ```
   https://<your-username>.github.io/portfolio/
   ```

No build step. No npm install. No configuration. It just works.

### 🔄 Updating Certifications Later

1. Add the new certificate image to `assets/img/certs/full/` (≤1600px JPEG recommended) and a smaller copy to `assets/img/certs/thumbs/` (≤640px).
2. Open `assets/js/data.js` and add an entry to the `CERTS` array:
   ```js
   {
     id: "my-new-cert",                    // must match the image filename
     title: "Certificate Title",
     issuer: "Issuing Organization",
     issued: "2026-09",                    // YYYY-MM or "" if undated
     credential: "CERT-ID-123",            // or "" if none
     category: "ai",                       // ai | cybersecurity | project-management | data | business | finance | design
     featured: false,                      // true = shows the ★ Top badge
     skills: ["Skill 1", "Skill 2"]
   }
   ```
3. Commit & push — done. Filters, search, timeline and the lightbox update automatically.

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Single-page application markup
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css           # Design system · 5 themes · animations
│   │   └── lightbox.css        # Certificate viewer styles
│   ├── js/
│   │   ├── data.js             # ⭐ All content (profile, certs, skills)
│   │   └── main.js             # Interactions · lightbox engine · animations
│   └── img/
│       ├── profile-square.jpg  # Hero avatar
│       ├── profile.jpg         # Full portrait (downloadable)
│       └── certs/
│           ├── thumbs/         # 28 card thumbnails (~640px)
│           └── full/           # 28 high-res certificates (~1600px)
```

---

## 🛠️ Customization Guide

| What | Where |
|------|-------|
| Name, email, education, DOB | `assets/js/data.js` → `PROFILE` |
| Certificates | `assets/js/data.js` → `CERTS` |
| Skill categories & levels | `assets/js/data.js` → `SKILL_GROUPS` |
| Theme colors | `assets/css/style.css` → `[data-theme="..."]` blocks |
| Typing-effect phrases | `assets/js/main.js` → `typing()` |
| Section copy | `index.html` |

### Run locally
Just open `index.html` in a browser — or serve it for a production-like environment:
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

---

## 🌐 Browser Support

| Browser | Status |
|---------|--------|
| Chrome / Edge (last 2 yrs) | ✅ Full |
| Firefox (last 2 yrs) | ✅ Full |
| Safari 15+ / iOS 15+ | ✅ Full |
| Samsung Internet | ✅ Full |

Pinch-zoom uses Pointer Events (universally supported since 2019); graceful fallbacks included for older browsers (clipboard, fullscreen).

---

## 📄 License

Released under the [MIT License](LICENSE). The certificates and photograph remain the property of **Mohammed Aliyan** — please don't reuse them without permission.

---

<div align="center">

**⭐ Found this useful? Star the repo!**

Made with ♥ and zero dependencies · Hosted on GitHub Pages

</div>
