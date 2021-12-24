const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    commonmark: true,
    gfm: true,
    remarkPlugins: [
      require('remark-images'),
      require('remark-emoji'),
      [require('remark-github'), { repository: 'https://github.com/termux/termux-app' }],
      require('remark-slug'),
      require('remark-attr'),
      require('./lib/frontmatter.js')
    ],
    rehypePlugins: []
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp']
  }
})
