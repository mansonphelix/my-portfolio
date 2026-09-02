# Manso Felix Kofi — Professional Portfolio

Multi-page, production-ready portfolio with **dual language (English / French)**, **dark & light themes**, tech animations, tutorials, and a working contact form.

Built with plain HTML, CSS and JavaScript — no build step. Ready for GitHub Pages.

## Features

- **Multi-page site**: Home, About, Skills, Experience, Projects, Tutorials (with 4 full articles), Education, Contact
- **Dual language**: English (en-GB) and French — switcher in the header, preference saved
- **Dual theme**: Dark and light mode — toggle + system preference + localStorage
- **Tech animations**: Network particle background on hero, scroll reveals, skill progress bars, floating cards, smooth transitions
- **High-quality images**: Unsplash tech / infrastructure photography
- **Contact form**: FormSubmit (free, no API key) — messages go to email
- **Direct contact**: Email, phone, WhatsApp
- **Responsive** and accessible (reduced-motion support)
- **Zero dependencies** beyond CDN fonts and Font Awesome

## Structure

```
manso-felix-portfolio/
├── index.html              # Home
├── css/style.css           # All styles + dual themes
├── js/
│   ├── translations.js     # EN + FR strings
│   └── main.js             # Theme, language, particles, reveals
├── pages/
│   ├── about.html
│   ├── skills.html
│   ├── experience.html
│   ├── projects.html
│   ├── tutorials.html
│   ├── education.html
│   └── contact.html
├── tutorials/
│   ├── network-design.html
│   ├── active-directory.html
│   ├── cctv-deploy.html
│   └── php-mysql-app.html
└── README.md
```

## Deploy on GitHub Pages

1. Create a repository and push these files (or upload the folder).
2. **Settings → Pages** → Source: branch `main`, folder `/ (root)`.
3. Site will be available at `https://<username>.github.io/<repo>/`.

## Contact form

Uses [FormSubmit](https://formsubmit.co). First submission requires a one-time confirmation email. After that, messages arrive at `mansonphelix@gmail.com`. No API keys needed.

## Local preview

Open `index.html` in a browser, or:

```bash
python -m http.server 8000
# or
npx serve .
```

## Credits

Content based on the CV of **Manso Felix Kofi** — IT Manager & Systems Engineer, Ashaiman, Ghana.
