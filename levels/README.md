# Levels

All level segments are in the [segments](./segments) directory. [graph.json](./graph.json) defines the MDP. Note, I would rather use a node editor, or interactive, rather than definite all edges and rewards with a JSON file, but I didn't find a tool that was easy enough to use such that it would be faster for me to learn it and use it than just typing it manually. I still want to change this, just out of principle.

##

Can you just move the canvas? 
If not, just iterate through every single thing and update all the positions. Store the offset so original positions don't get messed up. 

## 
- Moving platforms, definitely horizontal
- conveyor belt floors
- lasers
- spikes and/or spikes that fall when you are underneath
- dungeongrams style enemies
- Something that gives you a jump again in the air
- Jumping that is very tall that you can run underneath or in a cooridor
    - decide which obstacle you are going to deal with