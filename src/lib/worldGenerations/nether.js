const Chunk = require('prismarine-chunk')(require("../version"));
const Vec3 = require('vec3').Vec3;
const rand = require('random-seed');

function generation({seed,level=50}={}) {
  function generateChunk(chunkX, chunkZ) {
    const seedRand = rand.create(seed+':'+chunkX+':'+chunkZ);
    const chunk=new Chunk();
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        const bedrockheighttop = 1 + seedRand(4);
        const bedrockheightbottom = 1 + seedRand(4);
        for (let y = 0; y < 128; y++) { // Nether only goes up to 128
          let block;
          let data;

          if (y < bedrockheightbottom) block = 7;
          else if (y < level) block = 87;
          else if (y > 127 - bedrockheighttop) block = 7;

          const pos = new Vec3(x, y, z);
          if (block) chunk.setBlockType(pos, block);
          if (data) chunk.setBlockData(pos, data);
          // Don't need to set light data in nether
        }
      }
    }
    return chunk;
  }
  return generateChunk;
}

module.exports = generation;