#!/usr/bin/env node
/**
 * 发布新版本辅助脚本
 * 用法: node scripts/release.mjs
 *
 * 作用：交互式地问你几个问题，自动往 src/data/downloads.json
 * 里追加一条新版本记录。
 * 这样你就不用手动改 JSON 了。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

const downloadsPath = resolve('src/data/downloads.json');

const productNames = {
  'can-analyzer': '车载网络检测仪',
  'diagnostic-tool': '汽车维修电子教学积木',
};

function calcSha256(filePath) {
  try {
    const buf = readFileSync(filePath);
    return createHash('sha256').update(buf).digest('hex');
  } catch {
    return '';
  }
}

async function main() {
  console.log('\n=== 发布新版本 ===\n');

  const productId = (await ask('产品ID (can-analyzer / diagnostic-tool): ')).trim();
  const type = (await ask('类型 (firmware / software): ')).trim();
  const version = (await ask('版本号 (如 v1.2.0): ')).trim();
  const date =
    (await ask(`日期 (回车默认今天 ${new Date().toISOString().slice(0, 10)}): `)).trim() ||
    new Date().toISOString().slice(0, 10);
  const file = (await ask('文件名 (如 can-analyzer_firmware_v1.2.0.bin): ')).trim();
  const url = (await ask('GitHub Release 下载链接: ')).trim();
  const size = (await ask('文件大小 (如 30 MB): ')).trim();
  const localFile = (await ask('本地文件路径 (回车跳过自动算SHA256): ')).trim();
  const sha256 = localFile ? calcSha256(localFile) : (await ask('SHA256 (回车留空): ')).trim();
  const notes = (await ask('更新说明: ')).trim();

  const downloads = JSON.parse(readFileSync(downloadsPath, 'utf-8'));
  if (!downloads[productId]) downloads[productId] = { firmware: [], software: [] };
  if (!downloads[productId][type]) downloads[productId][type] = [];

  downloads[productId][type].unshift({ version, date, file, url, size, sha256, notes });
  writeFileSync(downloadsPath, JSON.stringify(downloads, null, 2) + '\n');

  console.log('\n✅ 已更新 downloads.json，产品: ' + (productNames[productId] || productId));
  console.log('下一步: git add . && git commit -m "release ' + version + '" && git push\n');

  rl.close();
}

main();


