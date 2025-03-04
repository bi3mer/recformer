import { MDP, idToLevel } from "../src/LevelGeneration/levels";
import { rowsToColumns, columnsToRows } from "../server_src/util";

const level = idToLevel["1-a"];
for (let i = 0; i < level.length; ++i) {
  console.log(level[i]);
}

console.log("\n===================\n");
const rows = rowsToColumns(level);
for (let r = 0; r < rows.length; ++r) {
  console.log(rows[r]);
}

console.log("\n===================\n");
const cols = columnsToRows(rows);
for (let c = 0; c < cols.length; ++c) {
  console.log(cols[c]);
}
