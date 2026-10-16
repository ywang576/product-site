// 产品图片配置。
// 数据来自同目录下的 product-images.json（构建期读取，稳定可靠）。
// 结构： { 产品ID: { cover: "图片地址", images: ["图片地址", ...] } }
import data from './product-images.json';

/** 把文件名转成网站路径：http 开头原样，/ 开头原样，否则加 base + images/ 前缀 */
export function toSrc(name) {
  if (!name) return '';
  if (name.startsWith('http')) return name;
  if (name.startsWith('/')) return name;
  const _b = import.meta.env.BASE_URL;
  const base = _b.endsWith('/') ? _b : _b + '/';
  return `${base}images/${name}`;
}

/** 获取某个产品的图片配置 */
export function getProductImages(id) {
  const item = data[id] || {};
  const cover = toSrc(item.cover);
  const images = (item.images || []).map(toSrc).filter(Boolean);
  return { cover, images };
}

export default data;
