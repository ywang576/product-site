import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 的网址（仓库名是 product-site）
  site: 'https://ywang576.github.io',
  base: '/product-site',
  output: 'static',
  // 本地开发服务器绑定到 0.0.0.0，同时支持 IPv4/IPv6，避免 localhost 打不开
  server: {
    host: true,
    port: 4321,
  },
});
