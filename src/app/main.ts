import { Firework } from "./Firework";
import { Renderer } from "./Renderer";

const engine = new Renderer(document.body,
  (delta, c, canv, store) => {
    for (const firework of store.fireworks as Firework[]) {
      const {from, to} = firework;
      c.moveTo(from.x, from.y);
      c.lineTo(to.x, to.y);
      c.stroke();
    }
  }
);

engine.storage = {
  fireworks: []
};

for (let i = 0; i < 10; i++) {
  engine.storage.fireworks.push(Firework.createRandom({
    bounds: {
      x: 0,
      y: 0,
      w: engine.canvas.width,
      h: engine.canvas.height
    },
    randomFromToVariation: 50
  }));
}

engine.start();