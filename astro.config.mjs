import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 部署后把这里改成你的实际域名（没有域名就填 Cloudflare 分配的 pages.dev 地址）
  // 例如: site: 'https://your-project.pages.dev',
  site: 'https://example.pages.dev',
  output: 'static',
  // 本地开发服务器绑定到 0.0.0.0，同时支持 IPv4/IPv6，避免 localhost 打不开
  server: {
    host: true,
    port: 4321,
  },
});
