/* Convert Markdown & JSON from /content into JS bundles
   so BlogPage and ResourcesPage can import them statically */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function collect(dir, transform) {
  return fs.readdirSync(dir).map(f => {
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
const res = collect("content/resources", raw => JSON.parse(raw));
fs.writeFileSync("src/content/resources.json", JSON.stringify(res, null, 2));