import { Glob } from "bun";

const glob = new Glob("*");
const dir = "levels/segments/";

let levelSegments = 0;
let levelNodes = 0;
for (const file of glob.scanSync(dir)) {
  ++levelNodes;
  ++levelSegments;

  const filePath = `${dir}${file}`;
  const f = Bun.file(filePath);
  const lvl = await f.text();
  const rows = lvl.split("\n");
  for (let i = 0; i < rows.length; ++i) {
    levelSegments += rows[i] === "&";
  }
}

console.log(`Level nodes: ${levelNodes}`);
console.log(`Level segments: ${levelSegments}`);
