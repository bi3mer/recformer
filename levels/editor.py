import tkinter as tk
import json
import os

NODE_WIDTH = 100
NODE_HEIGHT = 60


class Editor:
    def __init__(self, root):
        root.protocol("WM_DELETE_WINDOW", self.on_exit)

        self.root = root
        self.root.title("Level Graph Editor")

        self.canvas = tk.Canvas(self.root, width=1800, height=980, bg="gray28")
        self.canvas.pack(fill="both", expand=1)

        self.canvas.bind_all("<B3-Motion>", self.on_canvas_motion)

        self.nodes = {}
        with open("graph.json", "r") as f:
            self.g = json.load(f)

            # check segments directory for any new segments and add anode
            for filename in os.listdir("segments"):
                id = filename[:-4]  # remove .txt from end
                if id not in self.g:
                    self.g[id] = {
                        "reward": 1000,
                        "neighbors": [],
                        "x": 0,
                        "y": 0,
                    }

            # nodes
            for id in self.g:
                self.add_node(id)

            # create edges
            for id in self.g:
                N = self.g[id]
                x = N["x"]
                y = N["y"]

                for neighbor in self.g[id]["neighbors"]:
                    _nodeNeighbor = self.g[neighbor]

                    line = self.canvas.create_line(
                        x + NODE_WIDTH,
                        y + NODE_HEIGHT / 2,
                        _nodeNeighbor["x"],
                        _nodeNeighbor["y"] + NODE_HEIGHT / 2,
                        fill="yellow",
                        arrow=tk.LAST,
                    )

                    self.nodes[id]["outgoing_lines"].append(line)
                    self.nodes[neighbor]["incoming_lines"].append(line)

    def add_node(self, id):
        N = self.g[id]
        x = N["x"]
        y = N["y"]
        rect = self.canvas.create_rectangle(
            x, y, x + NODE_WIDTH, y + NODE_HEIGHT, fill="gray88"
        )

        frame = tk.Frame(self.root)
        frame.place(x=x, y=y)

        label = tk.Label(frame, text=id, width=5)
        label.pack()

        reward_var = tk.DoubleVar()
        reward_var.set(N["reward"])  # Initial width of the rectangle
        reward_var.trace_add(
            "write",
            lambda var, index, mode: self.on_reward_change(id, reward_var.get()),
        )
        r = tk.Entry(frame, textvariable=reward_var, width=3)
        r.pack()

        self.nodes[id] = {
            "rect": rect,
            "reward": reward_var,
            "frame": frame,
            "outgoing_lines": [],
            "incoming_lines": [],
        }

        self.canvas.tag_bind(
            rect,
            "<B1-Motion>",
            lambda event: self.on_drag(event, id),
        )

    def on_reward_change(self, id, val):
        try:
            self.g[id]["reward"] = float(val)
        except:
            print(f"Invalid value: {val}")

    def on_canvas_motion(self, event):
        pass
        # self.canvas.yview_scroll(-1, "units")

    def on_drag(self, event, id):
        N = self.nodes[id]
        RECT = N["rect"]

        x1, y1, _x2, _y2 = self.canvas.coords(RECT)
        dx = event.x - x1
        dy = event.y - y1
        self.canvas.move(RECT, dx, dy)
        self.canvas.itemconfig(RECT, tags=("rect", "dragged"))

        N["frame"].place(x=x1, y=y1)
        self.g[id]["x"] = x1
        self.g[id]["y"] = y1

        for neighbor in self.nodes[id]["incoming_lines"]:
            coords = self.canvas.coords(neighbor)
            self.canvas.coords(neighbor, coords[0], coords[1], x1, y1 + NODE_HEIGHT / 2)

        for neighbor in self.nodes[id]["outgoing_lines"]:
            coords = self.canvas.coords(neighbor)
            self.canvas.coords(
                neighbor, x1 + NODE_WIDTH, y1 + NODE_HEIGHT / 2, coords[2], coords[3]
            )

    def on_exit(self):
        with open("graph.json", "w") as f:
            json.dump(self.g, f, indent=2)


if __name__ == "__main__":
    root = tk.Tk()
    app = Editor(root)
    root.mainloop()
