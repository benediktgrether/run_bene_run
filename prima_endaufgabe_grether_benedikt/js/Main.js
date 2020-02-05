"use strict";
/// <reference path="./SpriteGenerator.ts"/>
var prima_endaufgabe_grether_benedikt;
/// <reference path="./SpriteGenerator.ts"/>
(function (prima_endaufgabe_grether_benedikt) {
    prima_endaufgabe_grether_benedikt.ƒ = FudgeCore;
    window.addEventListener("load", initGame);
    let keysPressed = {};
    let bene;
    function initGame() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtbene = new prima_endaufgabe_grether_benedikt.ƒ.TextureImage();
        txtbene.image = img;
        prima_endaufgabe_grether_benedikt.Bene.generateSprites(txtbene);
        prima_endaufgabe_grether_benedikt.Floor.generateSprites(txtbene);
        prima_endaufgabe_grether_benedikt.ƒ.RenderManager.initialize(true, false);
        prima_endaufgabe_grether_benedikt.game = new prima_endaufgabe_grether_benedikt.ƒ.Node("Game");
        prima_endaufgabe_grether_benedikt.game.addComponent(new prima_endaufgabe_grether_benedikt.ƒ.ComponentTransform());
        prima_endaufgabe_grether_benedikt.game.cmpTransform.local.translateY(-1.17);
        bene = new prima_endaufgabe_grether_benedikt.Bene("Bene");
        prima_endaufgabe_grether_benedikt.level = prima_endaufgabe_grether_benedikt.Level.createLevel();
        prima_endaufgabe_grether_benedikt.platform = prima_endaufgabe_grether_benedikt.Level.createPlatform();
        prima_endaufgabe_grether_benedikt.game.appendChild(bene);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.level);
        prima_endaufgabe_grether_benedikt.game.appendChild(prima_endaufgabe_grether_benedikt.platform);
        let cmpCamera = new prima_endaufgabe_grether_benedikt.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(prima_endaufgabe_grether_benedikt.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = prima_endaufgabe_grether_benedikt.ƒ.Color.CSS("#c2f0ff");
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
            // cmpCamera.pivot.lookAt(bene.cmpTransform.local.translation);
            cmpCamera.pivot.translation = new prima_endaufgabe_grether_benedikt.ƒ.Vector3(bene.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
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
})(prima_endaufgabe_grether_benedikt || (prima_endaufgabe_grether_benedikt = {}));
//# sourceMappingURL=Main.js.map