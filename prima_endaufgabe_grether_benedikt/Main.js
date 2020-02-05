"use strict";
/// <reference path="./SpriteGenerator.ts"/>
var prima_endaufgabe_grether_benedikt;
/// <reference path="./SpriteGenerator.ts"/>
(function (prima_endaufgabe_grether_benedikt) {
    prima_endaufgabe_grether_benedikt.ƒ = FudgeCore;
    window.addEventListener("load", test);
    let keysPressed = {};
    let bene;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtbene = new prima_endaufgabe_grether_benedikt.ƒ.TextureImage();
        txtbene.image = img;
        prima_endaufgabe_grether_benedikt.Bene.generateSprites(txtbene);
        prima_endaufgabe_grether_benedikt.ƒ.RenderManager.initialize(true, false);
        prima_endaufgabe_grether_benedikt.game = new prima_endaufgabe_grether_benedikt.ƒ.Node("Game");
        bene = new prima_endaufgabe_grether_benedikt.Bene("Bene");
        prima_endaufgabe_grether_benedikt.level = createLevel();
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.level);
        prima_endaufgabe_grether_benedikt.game.appendChild(bene);
        let cmpCamera = new prima_endaufgabe_grether_benedikt.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(prima_endaufgabe_grether_benedikt.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = prima_endaufgabe_grether_benedikt.ƒ.Color.CSS("aliceblue");
        let viewport = new prima_endaufgabe_grether_benedikt.ƒ.Viewport();
        viewport.initialize("Viewport", prima_endaufgabe_grether_benedikt.game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        prima_endaufgabe_grether_benedikt.ƒ.Loop.start(prima_endaufgabe_grether_benedikt.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
        if (_event.code == prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.W && _event.type == "keydown")
            bene.act(prima_endaufgabe_grether_benedikt.ACTION.JUMP);
    }
    function processInput() {
        if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.A]) {
            bene.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[prima_endaufgabe_grether_benedikt.ƒ.KEYBOARD_CODE.D]) {
            bene.act(prima_endaufgabe_grether_benedikt.ACTION.WALK, prima_endaufgabe_grether_benedikt.DIRECTION.RIGHT);
            return;
        }
        bene.act(prima_endaufgabe_grether_benedikt.ACTION.IDLE);
    }
    function createLevel() {
        let level = new prima_endaufgabe_grether_benedikt.ƒ.Node("Level");
        let floor = new prima_endaufgabe_grether_benedikt.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        level.appendChild(floor);
        floor = new prima_endaufgabe_grether_benedikt.Floor();
        floor.cmpTransform.local.scaleY(0.2);
        floor.cmpTransform.local.scaleX(0.2);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
        return level;
    }
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Main.js.map