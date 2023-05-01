/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "",
  siteMetadata: {
    title: "Gatsby No Trailing Slash Site on GitHub Pages",
    siteUrl: "https://no-trailing-slash.github.io",
    description: "Working example of Gatsby site on GitHub Pages with no-trailing-slash"
  },
  trailingSlash: "never",
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
              matchPath
            }
          }
          site {
            siteMetadata {
              siteUrl
              }
          }
        }
      `,
      resolveSiteUrl: ({ site: { siteMetadata: { siteUrl } } }) => {
        return siteUrl
      },
      resolvePages: ({
        allSitePage: { nodes: allPages },
      }) => {
        return allPages.map(page => {
          return { ...page };
        });
      },
      serialize: ({ path, matchPath }) => {

        let url = matchPath ? matchPath : path;
        url = url.startsWith("/") ? url : `/${url}`;
        
        return {
          url: url,
          changefreq: "daily",
          priority: 0.7,
        };
      },
    }, 
  }   
  ]
};

