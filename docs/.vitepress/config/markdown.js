import mdItCustomAttrs  from 'markdown-it-custom-attrs'

export default {
  markdown: {
    toc: { level: [1, 2, 3] },
    config: (md) => {
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery'
      })
    }
  }
}