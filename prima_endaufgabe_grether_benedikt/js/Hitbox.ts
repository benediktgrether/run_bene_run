namespace prima_endaufgabe_grether_benedikt {
  import fudge = FudgeCore;

  export class Hitbox extends fudge.Node {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    // private static material: fudge.Material = new fudge.Material("Hitbox", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("black", 0.5)));
    private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));

    public constructor(_name?: string) {

      if (_name) {
        super(_name);
      } else {
        super("Hitbox");
      }
      this.addComponent(new fudge.ComponentTransform());
      // this.addComponent(new fudge.ComponentMaterial(Hitbox.material));
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Hitbox.mesh);
      cmpMesh.pivot = Hitbox.pivot;
      this.addComponent(cmpMesh);

    }

    public getRectWorld(): fudge.Rectangle {
      let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
      let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
      let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);

      //let pivot: fudge.Matrix4x4 = this.getComponent(fudge.ComponentMesh).pivot;
      let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Hitbox.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }

    public checkCollision(): void {
      for (let floor of platform.getChildren()) {
        for (let child of floor.getChildren()) {
          if (child.name == "Item") {
            let hitbox: Hitbox;
            hitbox = (<Items>child).hitbox;
            if (this.detectedHit(hitbox)) {
              if (child.name == "Item") {
                if (hero.item == null || hero.item.type == ITEM.NONE) {
                  hero.item = (<Items>child);
                  hero.createSwordHitbox();
                  let element: HTMLElement = document.getElementById("itemHealthBar");
                  element.style.width = "100%";
                  console.log(child.getParent());
                  floor.removeChild(child);
                  child.cmpTransform.local.translateY(2);
                }
              }
            }
          } else {
            continue;
          }
        }

        for (let child of game.getChildren()) {
          if (child.name == "Zombie") {
            let hitbox: Hitbox;
            hitbox = (<Enemy>child).hitbox;
            if (this.detectedHit(hitbox)) {
              if ((<Enemy>child).direction == 1 && fight == false) {
                hero.cmpTransform.local.translateX(0.05);
                Sound.play("playerHit");
                hero.updateHealtpoints();

              } else if ((<Enemy>child).direction == -1 && fight == false) {
                hero.cmpTransform.local.translateX(-0.05);
                Sound.play("playerHit");
                hero.updateHealtpoints();

              } else if (hero.item.type == "Sword" && fight == true) {
                if ((<Enemy>child).direction == 1 && hero.directionChar === -1) {
                  (<Enemy>child).cmpTransform.local.translateX(-0.15);
                  (<Enemy>child).updateHealtpoints(<Enemy>child);
                  hero.item.itemUsability();
                  Sound.play("enemyHit");

                } else if ((<Enemy>child).direction == -1 && hero.directionChar === 1) {
                  (<Enemy>child).cmpTransform.local.translateX(0.15);
                  (<Enemy>child).updateHealtpoints(<Enemy>child);
                  hero.item.itemUsability();
                  Sound.play("enemyHit");

                } else if ((<Enemy>child).direction == 1 && hero.directionChar === 1) {
                  Sound.play("playerHit");
                  hero.cmpTransform.local.translateX(0.05);
                  hero.updateHealtpoints();

                } else if ((<Enemy>child).direction == -1 && hero.directionChar === -1) {
                  Sound.play("playerHit");
                  hero.cmpTransform.local.translateX(-0.05);
                  hero.updateHealtpoints();
                }
                else {
                  continue;
                }
              }
            }
          }
        }
      }
      for (let child of game.getChildren()) {
        if (child.name == "Item") {
          let hitbox: Hitbox;
          hitbox = (<Items>child).hitbox;
          if (this.detectedHit(hitbox)) {
            if (child.name == "Item") {
              if (hero.item.type == ITEM.NONE) {
                hero.item = (<Items>child);
                hero.createSwordHitbox();
                let element: HTMLElement = document.getElementById("itemHealthBar");
                element.style.width = "100%";
                child.cmpTransform.local.translateY(5);
              }
            }
          }
        }
      }
    }

    private detectedHit(hitbox: Hitbox): boolean {
      let hit: boolean = false;
      let rectOfThis: fudge.Rectangle = (<Hitbox>this).getRectWorld();
      let rectOfThat: fudge.Rectangle = hitbox.getRectWorld();
      let expansionRight: fudge.Vector2 = new fudge.Vector2(rectOfThat.size.x);
      let expansionDown: fudge.Vector2 = new fudge.Vector2(0, rectOfThat.size.y);
      let topRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionRight);
      let bottomLeft: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown);
      let bottomRight: fudge.Vector2 = fudge.Vector2.SUM(rectOfThat.position, expansionDown, expansionRight);

      if (rectOfThis.isInside(rectOfThat.position)) {
        hit = true;
      } else if (rectOfThis.isInside(topRight)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomLeft)) {
        hit = true;
      } else if (rectOfThis.isInside(bottomRight)) {
        hit = true;
      }
      return hit;
    }
  }
}