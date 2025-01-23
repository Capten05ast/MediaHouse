const express = require("express")
const cors = require("cors")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

app.use(cors())

const cognitiveSearchProxy = createProxyMiddleware({
  target: "https://mediacogsearch.search.windows.net",
  changeOrigin: true,
  pathRewrite: {
    "^/api/cognitive-search": "/indexes/mediahouse333-index/docs",
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("api-key", "qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc")
  },
})

app.use("/api/cognitive-search", cognitiveSearchProxy)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



