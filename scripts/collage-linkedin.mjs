// Genera un collage para LinkedIn (1200 × 627, exportado a 2400 × 1254) a partir de la demo publicada.
// Uso: npm run linkedin -- <URL-DE-MI-DEMO-EN-CLOUDFLARE>
// No modifica el sitio: solo lee sus datos (site.js, content.es.js, tailwind.config.js) y escribe en capturas/linkedin/.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer-core'
import { site } from '../src/data/site.js'
import content from '../src/data/content.es.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outFile = path.join(root, 'capturas', 'linkedin', 'collage-linkedin.png')
const demoUrl = process.argv[2] || '<URL-DE-MI-DEMO-EN-CLOUDFLARE>'

if (!/^https?:\/\//.test(demoUrl)) {
  console.error(`URL de la demo no válida: ${demoUrl}\nUso: npm run linkedin -- https://tu-demo.pages.dev`)
  process.exit(1)
}

// --- Datos de marca (salen de la plantilla, no se inventan) ---
// tailwind.config.js importa 'tailwindcss/plugin' (sin extensión), que Node no resuelve: se leen los colores como texto.
const tailwindSource = fs.readFileSync(path.join(root, 'tailwind.config.js'), 'utf8')
const hex = (re, label) => {
  const m = tailwindSource.match(re)
  if (!m) {
    console.error(`No se encontró el color ${label} en tailwind.config.js`)
    process.exit(1)
  }
  return m[1]
}
const brand = hex(/accent:\s*\{\s*DEFAULT:\s*'(#[0-9A-Fa-f]{6})'/, 'accent')
const paper = hex(/paper:\s*'(#[0-9A-Fa-f]{6})'/, 'paper')
const ink = hex(/ink:\s*'(#[0-9A-Fa-f]{6})'/, 'ink')
const hotelName = site.hotel.name
const subtitle = (content.hero.subtitle || '').trim()
const tagline = subtitle ? (subtitle.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? subtitle) : ''

// --- Chrome / Edge ya instalado ---
function findBrowser() {
  const local = process.env.LOCALAPPDATA
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    local && path.join(local, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean)
  const found = candidates.find((p) => fs.existsSync(p))
  if (!found) {
    console.error(
      'No se encontró Chrome ni Edge. Instálalo o define la variable de entorno CHROME_PATH con la ruta del ejecutable.\nRutas probadas:\n  ' +
        candidates.join('\n  '),
    )
    process.exit(1)
  }
  return found
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Rechaza todas las cookies (true solo en las obligatorias) y fuerza español.
const consent = {
  ...Object.fromEntries(content.cookies.categories.map((c) => [c.id, Boolean(c.required)])),
  date: new Date().toISOString(),
}

async function preparePage(browser, viewport) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.evaluateOnNewDocument(
    (consentKey, consentValue, langKey) => {
      localStorage.setItem(consentKey, JSON.stringify(consentValue))
      localStorage.setItem(langKey, 'es')
    },
    site.cookies.storageKey,
    consent,
    site.languageStorageKey,
  )
  await page.goto(demoUrl, { waitUntil: 'networkidle2', timeout: 60000 })
  // Estilos en memoria: sin botón de WhatsApp y sin scroll suave (para que el desplazamiento sea exacto).
  await page.addStyleTag({
    content: 'a[href*="wa.me"]{display:none!important}html{scroll-behavior:auto!important}',
  })
  await sleep(3000)
  return page
}

// Lleva la sección bajo la barra fija, para que su título no quede tapado.
async function scrollToSection(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) throw new Error(`No existe ${sel} en la página`)
    el.scrollIntoView({ block: 'start' })
    const header = document.querySelector('header')
    const barHeight = header ? header.getBoundingClientRect().height : 0
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - barHeight - 16, behavior: 'instant' })
  }, selector)
  await sleep(1000)
}

async function capture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'collage-linkedin-'))
  const shots = {
    hero: path.join(dir, 'desktop-hero.png'),
    rooms: path.join(dir, 'desktop-habitaciones.png'),
    mobileHero: path.join(dir, 'mobile-hero.png'),
    mobileSearch: path.join(dir, 'mobile-reservar.png'),
  }
  const browser = await puppeteer.launch({ executablePath: findBrowser(), headless: true })
  try {
    const desktop = await preparePage(browser, { width: 1440, height: 900, deviceScaleFactor: 1 })
    await desktop.screenshot({ path: shots.hero })
    await scrollToSection(desktop, `#${content.roomsSection.id}`)
    await desktop.screenshot({ path: shots.rooms })

    const mobile = await preparePage(browser, { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
    await mobile.screenshot({ path: shots.mobileHero })
    await scrollToSection(mobile, `#${content.search.id}`)
    await mobile.screenshot({ path: shots.mobileSearch })
  } finally {
    await browser.close()
  }
  return { dir, shots }
}

function buildHtml(shots) {
  const url = (p) => pathToFileURL(p).href
  const phone = (src, style) => `
    <div style="position:absolute;width:206px;height:427px;box-sizing:border-box;padding:7px;background:${ink};border-radius:30px;box-shadow:0 18px 40px rgba(30,36,32,.45);${style}">
      <img src="${url(src)}" style="display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:23px;background:${paper}" />
    </div>`
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;background:${brand}">
  <div style="position:relative;width:1200px;height:627px;overflow:hidden;background:${brand};color:${paper}">
    <div style="position:absolute;left:40px;top:30px;width:720px">
      <div style="font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:46px;line-height:1.1">${hotelName}</div>
      ${tagline ? `<div style="margin-top:8px;font-family:'Manrope',system-ui,sans-serif;font-weight:600;font-size:20px;line-height:1.35">${tagline}</div>` : ''}
    </div>
    <div style="position:absolute;left:40px;top:${tagline ? 132 : 108}px;width:720px;height:450px;overflow:hidden;border-radius:16px;background:${paper};box-shadow:0 18px 40px rgba(30,36,32,.45)">
      <img src="${url(shots.hero)}" style="display:block;width:100%;height:100%;object-fit:cover;object-position:top" />
    </div>
    ${phone(shots.mobileHero, 'left:782px;top:70px;')}
    ${phone(shots.mobileSearch, 'left:970px;top:140px;')}
  </div>
</body></html>`
}

async function render(shots, dir) {
  const htmlPath = path.join(dir, 'collage.html')
  fs.writeFileSync(htmlPath, buildHtml(shots))
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  const browser = await puppeteer.launch({ executablePath: findBrowser(), headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 627, deviceScaleFactor: 2 })
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.evaluate(async () => {
      await Promise.all([document.fonts.load('500 46px Fraunces'), document.fonts.load('600 20px Manrope')])
      await document.fonts.ready
    })
    await page.screenshot({ path: outFile, clip: { x: 0, y: 0, width: 1200, height: 627 } })
  } finally {
    await browser.close()
  }
}

const { dir, shots } = await capture()
await render(shots, dir)
console.log(`Collage guardado en ${outFile}`)
console.log(`Capturas intermedias en ${dir}`)
