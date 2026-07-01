const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // Tus configuraciones existentes de Next.js aquí
  // Por ejemplo:
  // reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/**",
      },
    ],
  },
  // Add an empty Turbopack configuration to silence the warning about custom webpack config.
  turbopack: {},
};

const sentryWebpackPluginOptions = {
  // Opciones para el plugin de Webpack de Sentry.
  silent: true, // Suprime los logs de Sentry durante la compilación
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

// Asegúrate de que tu configuración de Next.js esté envuelta con withSentryConfig
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);