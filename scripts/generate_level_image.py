from PIL import Image, ImageDraw

LEVEL = [
      "----------------------------------------------------------------------------------XXXXXXXX--------",
      "-------------------------C---------------------------------------------------------XXXXXXX--------",
      "-----------------------------------------------------------------------------------XXXXXXX--------",
      "-------------------XXXXXXXXXXXXXXX----XXXXXX---------------------------------------XXXXXXX--------",
      "---------------------------------------V--V----------------------------------------V-V-V-V--------",
      "--------------------------------------------------------------------------------------------------",
      "----------------------------------XXXXXXXXXXXXXX--------------------------------------------------",
      "------------------------------------------V---VX-------------H--------X---------------------------",
      "----------------------------------------------------XXXXXXXXXXXXXXXXXXX---------------------------",
      "----XX--------------------------XX-------------------------------------------XXXXXXXX-------------",
      "-------------------------XXX-----------XXXXXXXXXX----------------------------C------C-------------",
      "--------------------------------------------------------------------------------------------------",
      "-------------------------V-V----------------------------------------------------------------------",
      "--------X---H---X---------V------------X---H----X-----------------------------------------------o-",
      "XXXXXXXXXXXXXXXXXX---XXXXXXXXXXXXXXXXXXXXXX--XXXXX---XXXXX---XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
]


HEIGHT = len(LEVEL)
WIDTH = len(LEVEL[0])

TILE_SIZE = 32
PIXEL_WIDTH = WIDTH * TILE_SIZE
PIXEL_HEIGHT = HEIGHT * TILE_SIZE

print(WIDTH, HEIGHT)
print(PIXEL_WIDTH, PIXEL_HEIGHT)

BACKGROUND_COLOR = (0,0,0,0)

level = Image.new("RGBA", (PIXEL_WIDTH, PIXEL_HEIGHT), BACKGROUND_COLOR)
draw = ImageDraw.Draw(level)

for y in range(HEIGHT):
    for x in range(WIDTH):
        _y = y*TILE_SIZE
        _x = x*TILE_SIZE
        match LEVEL[y][x]:
            case "X":
                draw.rectangle([(_x, _y), (_x + TILE_SIZE - 1, _y + TILE_SIZE - 1)], outline=(255, 255, 255, 255), width=1)
            case "o":
                draw.rectangle([(_x, _y), (_x + 16, _y+16)], (255,208, 128))
            case "H":
                draw.rectangle([(_x, _y), (_x + 25, _y + 15)], (254, 84, 111, 255))
            case "V":
                draw.rectangle([(_x, _y), (_x + 15, _y + 25)], (254, 84, 111, 255))
            case "C":
                draw.circle((_x, _y), 10, (254, 84, 111, 255))
            case "-":
                continue
            case _:
                print(f"unrecognized chararacter: {LEVEL[y][x]}")

level.save("level-alpha.png")