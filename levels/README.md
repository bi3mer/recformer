# Levels

All level segments are place in the [segments](./segments/) directory. They all follow a simple naming convention: "{name}_{reward}_{connectsTo1},{connectsTo2},...". The name is the name of the level, it will probably be very simple like "1-a" where '1' conveys the depth in the graph and 'a' is just a random but bad unique id. The reward is some number that can be parsed and represents the reward inside of the Markov Decision Process that [GDM](../src/GDM-TS/) will use when build the graph. Finally, the list at the end are the directed edges. So, if you have a name like "1-a_0.05_1-b,2-c,2-a" then you have a node with name "1-a", a reward of 0.05, with edges to "1-b", "2-c", and "2-a".

[Combiner.ts](./combiner.ts) takes all of this and builds a typescript file that is then put into the [source folder](../src/) of the main game.  Also, note that this process relies on an idea of a "start" node. So, for simplicity, any level name that starts with "1-" has an incoming edge from the start node by default. There is no way to remove that default behavior, at the moment.

The general workflow, then, is to build level segments and name them in some reasonable way. Then, run `bun combiner.ts` and that's it. The game will handle the rest.
