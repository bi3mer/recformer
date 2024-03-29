import json
import os

id_to_edges = {}
id_to_lvl = {}
nodes = []

typescript = "// Generated by ../levels/combiner.py\n\n"
typescript += 'import { Graph } from "./GDM-TS";\n'

typescript += "\n// ========= Nodes =========\n"
typescript += "export const MDP = new Graph();\n"
typescript += 'MDP.addDefaultNode("start", 0, 0, false);\n'
typescript += 'MDP.addDefaultNode("death", -1, 0, true);\n'
typescript += 'MDP.addDefaultNode("end", 1, 0, true);\n'

max_r = 0
for file_name in os.listdir("segments"):
    with open(os.path.join("segments", file_name)) as f:
        lvl = [line.strip() for line in f.readlines()]

    id, r, edges = file_name.split("_")
    r = float(r)
    max_r = max(max_r, r)

    edges = edges[:-4].split(",")  # remove .txt from the end and then split by comma

    id_to_lvl[id] = lvl
    id_to_edges[id] = edges

    nodes.append((id, r))

max_r += 1
for id, r in nodes:
    typescript += f'MDP.addDefaultNode("{id}, {r/max_r}, 0, false");\n'

typescript += "\n// ========= Edges =========\n"
for id in id_to_edges:
    if id[0] == "1":
        typescript += f'MDP.addDefaultEdge("start", "{id}")\n'

    for tgt in id_to_edges[id]:
        typescript += f'MDP.addDefaultEdge("{id}", "{tgt}", [["{tgt}", 0.99], ["death", 0.01]]);\n'

    typescript += "\n"


typescript += "\n// ========= Level Segments =========\n"
TYPE = "{ [key: string]: string[] }"
typescript += f"export const idToLevel:{TYPE} = {json.dumps(id_to_lvl, indent=2)};\n"

PATH = os.path.join("..", "src", "levels.ts")
with open(PATH, "w") as f:
    f.write(typescript)

print(f"Graph and levels written to: {PATH}")
