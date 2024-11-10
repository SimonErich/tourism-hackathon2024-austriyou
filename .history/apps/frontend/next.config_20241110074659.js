//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: [
      'www.upperaustria.com',
      'media.tourdata.at',
      'res.klook.com',
      'automotivemuseumguide.com',
      'fuutazbsb.filerobot.com',
      'encrypted-tbn0.gstatic.com',
      'cdn.salzburgerland.com',
      '*',
    ],
  },
  // output: 'export',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);