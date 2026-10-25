// Plugin de Vite: inyecta los metadatos de SEO en el HTML inicial y genera robots.txt y sitemap.xml al compilar.
// Así los buscadores y las redes sociales (que no ejecutan JavaScript) ven el título, la descripción y la vista previa
// en el idioma por defecto. Los textos salen de site.js y de los archivos de idioma.
import { buildContent } from './src/data/content.js'
import { site } from './src/data/site.js'
import { robotsTxt, seoTags, sitemapXml } from './src/lib/seo.js'

export default function seoPlugin() {
  return {
    name: 'hotel-seo',

    transformIndexHtml(html) {
      const tags = seoTags(buildContent(site.defaultLanguage)).map(({ tag, key, attrs, children }) => ({
        tag,
        attrs: { ...attrs, 'data-seo': key },
        children,
        injectTo: 'head',
      }))
      const clean = html
        .replace(/<html lang="[^"]*"/, `<html lang="${site.defaultLanguage}"`)
        .replace(/\s*<title>[\s\S]*?<\/title>/, '')
        .replace(/\s*<meta\s+name="description"[^>]*>/, '')
      return { html: clean, tags }
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      const sitemap = sitemapXml()
      if (sitemap) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}
