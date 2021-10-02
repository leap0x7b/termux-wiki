const matter = require('gray-matter')

const frontmatter = () => (tree, file) => {
  const { data } = matter(file.contents)

  tree.children.push({
    type: 'export',
    value: `export const frontMatter = ${JSON.stringify(data, null, 2).replace(
      /^[\t ]*"[^:\n\r]+(?<!\\)":/gm,
      (match) => match.replace(/"/g, '')
    )}`
  })

  if (tree.children[0].type === 'thematicBreak') {
    const firstHeadingIndex = tree.children.findIndex((t) => t.type === 'heading')
    if (firstHeadingIndex !== -1) {
      tree.children.splice(0, firstHeadingIndex + 1)
    }
  }
}

module.exports = frontmatter
