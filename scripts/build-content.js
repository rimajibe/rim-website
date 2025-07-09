/* Convert Markdown & JSON from /content into JS bundles
   so BlogPage and ResourcesPage can import them statically */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function collect(dir, transform) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  const files = fs.readdirSync(dir).filter(f => !f.startsWith('.'));
  if (files.length === 0) {
    return [];
  }
  
  return files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    return transform(raw, f);
  });
}

// Blog → src/content/blog.json
const posts = collect("content/blog", (raw, file) => {
  const { data, content } = matter(raw);
  return { ...data, slug: file.replace(/\.md$/, ""), body: content };
});
fs.mkdirSync("src/content", { recursive: true });
fs.writeFileSync("src/content/blog.json", JSON.stringify(posts, null, 2));

// Resources → src/content/resources.json
const res = collect("content/resources", raw => {
  if (!raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse JSON file: ${e.message}`);
    return null;
  }
}).filter(Boolean);
fs.writeFileSync("src/content/resources.json", JSON.stringify(res, null, 2));