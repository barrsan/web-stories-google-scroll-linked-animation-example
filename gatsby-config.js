module.exports = {
  siteMetadata: {
    title: 'Web Stories Google Scrolling Example',
    description: 'Web Stories Google scrolling example',
    author: 'Alex Baretsky',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-css-modules',
      options: {
        exclude: '/global/',
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@pages': 'src/pages',
          '@constants': 'src/constants',
          '@components': 'src/components',
          '@hooks': 'src/hooks',
          '@utils': 'src/utils',
          '@assets': 'src/assets',
          '@content': 'content',
        },
        extensions: ['js', 'jsx', 'yaml', 'mp4', 'png', 'jpg'],
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'web-stories-google-scroll-linked-animation-example',
        short_name: 'wsg-example',
        start_url: '/',
        background_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/assets/images/gatsby-icon.png',
      },
    },
  ],
};
