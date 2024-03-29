import json
import os

id_to_edges = {}
id_to_lvl = {}
typescript = 'import { Graph } from "./GDM";\n\nconst G = new Graph();\n'


typescript += "\n// ========= Nodes =========\n"
for file_name in os.listdir("segments"):
    print(file_name)
    with open(os.path.join("segments", file_name)) as f:
        lvl = [line.strip() for line in f.readlines()]

    id, r, edges = file_name.split("_")
    r = float(r)

    edges = edges[:-4].split(",")  # remove .txt from the end and then split by comma

    id_to_lvl[id] = lvl
    id_to_edges[id] = edges

    typescript += f'G.addDefaultNode("{id}", {r}, 0, false);\n'

typescript += "\n// ========= Edges =========\n"
for id in id_to_edges:
    for e in id_to_edges[id]:
        typescript += f"G.addDefaultEdge({id}, {e});\n"

    typescript += "\n"


typescript += "\n\n// ========= Exports =========\n"
typescript += "export const G;\n"

TYPE = "{ [key: string]: string[] }"
typescript += f"export const idToLevel:{TYPE} = {json.dumps(id_to_lvl)};\n"


print(typescript)
