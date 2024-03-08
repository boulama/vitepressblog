import path from 'node:path'
import { createRequire } from 'node:module'
import type { VPBThemeConfig } from '@jcamp/vitepress-blog-theme'
import { defineConfigWithTheme } from 'vitepress'
import { genFeed, processData } from '@jcamp/vitepress-blog-theme/config'
import plugin from "markdown-it-mathjax3";
// can't use here
// import { defineConfig } from '@jcamp/vitepress-blog-theme/config'

const require = createRequire(import.meta.url)
// const pkg = require('@jcamp/vitepress-blog-theme/package.json')

// https://vitepress.dev/reference/site-config

export default defineConfigWithTheme<VPBThemeConfig>({
  vite: {
    build: {
      minify: false,
    },
    resolve: {
      alias: {
        '@jcamp/vitepress-blog-theme/config': path.join(
          __dirname,
          '../../src/config'
        ),
        '@jcamp/vitepress-blog-theme': path.join(__dirname, '../../src/theme'),
      },
    },
  },
  cleanUrls: true,
  title: 'Boulama\'s Blog',
  description: 'Boulama\'s blog',
  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/boulama/blog/edit/main/docs/:path',
    },
    blog: {
      title: 'Boulama\'s blog',
      description: '',
      defaultAuthor: 'Boulama',
      categoryIcons: {
        article: 'i-[heroicons-outline/book-open]',
        tutorial: 'i-[heroicons-outline/academic-cap]',
        document: 'i-[heroicons-outline/annotation]',
      },
      tagIcons: {
        github: 'i-[carbon/logo-github]',
        vue: 'i-[carbon/logo-vue]',
      },
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // {
      //   text: 'Guide',
      //   link: '/guide/what-is-vitepress-blog',
      //   activeMatch: '/guide/',
      // },
      // {
      //   text: 'Reference',
      //   link: '/reference/config',
      //   activeMatch: '/reference/',
      // },
      {
        text: 'About',
        link: '/about'
      },
      // {
      //   text: 'Examples',
      //   items: [
      //     {
      //       text: 'Markdown',
      //       link: '/markdown-examples',
      //     },
      //     {
      //       text: 'Theme Test',
      //       link: '/theme-test',
      //     },
      //   ],
      // },
      {
        text: 'Blog',
        activeMatch: '/blog/',
        items: [
          {
            text: 'Blog Home',
            link: '/blog/',
            activeMatch: '/blog/$',
          },
          {
            text: 'Tags',
            link: '/blog/tags',
            activeMatch: '/blog/tags',
          },
          {
            text: 'Archives',
            link: '/blog/archives',
            activeMatch: '/blog/archives',
          },
          // {
          //   text: 'RSS Feed',
          //   link: '/blog/feed.rss',
          // },
        ],
      },
    ],

    sidebar: {
      '/guide/': sidebarGuide(),
      '/reference/': sidebarReference(),
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/boulama',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/boulama_k',
      },
      {
        icon: 'instagram',
        link: 'https://twitter.com/boulama',
      },
    ],
  },
  markdown: {
    config(md) {
        md.use(plugin, {})
    },
  },
  buildEnd: genFeed,
  async transformPageData(pageData, ctx) {
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content:
            pageData.frontmatter.layout === 'home'
                ? `Boulama's Blog`
                : `${pageData.title} | Boulama's Blog`
      }
    ])
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:image',
        content: `https://og.boulama.com/api/param?title=${pageData.frontmatter.title}`
      }
    ])
    await processData(pageData, ctx)
  },
})

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {
          text: 'What is VitePress Blog?',
          link: '/guide/what-is-vitepress-blog',
        },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Roadmap', link: '/guide/roadmap' },
        { text: 'Credits', link: '/guide/credits' },
      ],
    },
    {
      text: 'Front Matter',
      collapsed: false,
      items: [
        { text: 'Post Front Matter', link: '/guide/frontmatter-post' },
        { text: 'Author Front Matter', link: '/guide/frontmatter-author' },
      ],
    },
    {
      text: 'Config & API Reference',
      link: '/reference/config',
    },
  ]
}

function sidebarReference() {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: '/reference/config' },
        { text: 'Tailwind', link: '/reference/tailwind' },
        { text: 'Icons', link: '/reference/icons' },
      ],
    },
  ]
}
