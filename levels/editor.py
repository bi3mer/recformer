import tkinter as tk
import json

NODE_WIDTH = 100
NODE_HEIGHT = 60


class Editor:
    def __init__(self, root):
        root.protocol("WM_DELETE_WINDOW", self.on_exit)

        self.root = root
        self.root.title("Level Graph Editor")

        self.canvas = tk.Canvas(root, width=1800, height=980, bg="gray28")
        self.canvas.pack()

        self.nodes = {}
        with open("graph.json", "r") as f:
            self.g = json.load(f)

            i = 0
            for id in self.g:
                self.add_node(id)
                i += 1

                if i > 3:
                    break

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
        r = tk.Entry(frame, textvariable=reward_var, width=3)
        r.pack()

        self.nodes[id] = {"rect": rect, "reward": reward_var, "frame": frame}

        self.canvas.tag_bind(
            rect,
            "<B1-Motion>",
            lambda event: self.on_drag(event, id),
        )

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

    def on_exit(self):
        print("here")
        with open("graph.json", "w") as f:
            json.dump(self.g, f, indent=2)


if __name__ == "__main__":
    root = tk.Tk()
    app = Editor(root)
    root.mainloop()
