const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    commonmark: true,
    gfm: true,
    remarkPlugins: [
      require('remark-images'),
      require('remark-emoji'),
      [require('remark-github'), {
        repository: "https://github.com/termux/termux-app"
      }],
      require('remark-slug'),
      require('./lib/frontmatter.js')
    ],
    rehypePlugins: []
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  experimental: { esmExternals: true }
})
