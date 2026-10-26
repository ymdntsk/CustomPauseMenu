//=============================================================================
// CustomPauseMenu.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Menu de pausa customizável (ESC) com fundo, seta em imagem e botões configuráveis.
 * @author Você
 *
 * @help
 * ============================================================================
 * CustomPauseMenu
 * ============================================================================
 * Substitui o menu que abre com ESC no mapa por um menu customizável.
 *
 * COMO USAR
 * 1. Salve este arquivo como CustomPauseMenu.js em js/plugins/
 *    (o nome do arquivo precisa ser exatamente esse).
 * 2. Coloque suas imagens na pasta img/system/ (fundo, seta, botões).
 * 3. Ative o plugin no Gerenciador de Plugins e ajuste os parâmetros.
 *
 * BOTÕES
 * Cada botão tem: texto, ação, posição (x, y), tamanho, imagem opcional,
 * alinhamento do texto e tamanho da fonte.
 *
 * Ações disponíveis:
 *   - Salvar          : abre a tela de salvar
 *   - Carregar        : abre a tela de carregar
 *   - Voltar ao título: vai para a tela inicial
 *   - Common Event    : executa o evento comum escolhido e fecha o menu
 *   - Fechar menu     : volta para o jogo
 *
 * A posição (x, y) é o canto superior esquerdo do botão, em pixels,
 * contando a partir do canto superior esquerdo da tela.
 *
 * COMANDO DE PLUGIN
 * "Abrir menu de pausa" abre o menu a partir de um evento.
 *
 * @param backgroundImage
 * @text Imagem de fundo
 * @desc Imagem em img/system/. Será esticada para a tela toda. Vazio = fundo padrão do jogo (desfocado).
 * @type file
 * @dir img/system/
 * @require 1
 *
 * @param cursorImage
 * @text Imagem da seta
 * @desc Imagem em img/system/. Vazio = usa uma seta de texto (▶).
 * @type file
 * @dir img/system/
 * @require 1
 *
 * @param cursorSide
 * @text Lado da seta
 * @desc Em qual lado do botão a seta aparece.
 * @type select
 * @option Esquerda
 * @value left
 * @option Direita
 * @value right
 * @default left
 *
 * @param cursorOffsetX
 * @text Ajuste X da seta
 * @desc Move a seta na horizontal (pixels). Pode ser negativo.
 * @type number
 * @min -9999
 * @default 0
 *
 * @param cursorOffsetY
 * @text Ajuste Y da seta
 * @desc Move a seta na vertical (pixels). Pode ser negativo.
 * @type number
 * @min -9999
 * @default 0
 *
 * @param cursorBob
 * @text Balanço da seta
 * @desc Quanto a seta balança para frente e para trás (pixels). 0 = parada.
 * @type number
 * @min 0
 * @default 4
 *
 * @param fadeInDuration
 * @text Duração do fade in
 * @desc Tempo para o menu aparecer, em frames (60 = 1 segundo). 0 = aparece na hora.
 * @type number
 * @min 0
 * @default 12
 *
 * @param fadeOutDuration
 * @text Duração do fade out
 * @desc Tempo para o menu sumir, em frames (60 = 1 segundo). 0 = some na hora.
 * @type number
 * @min 0
 * @default 12
 *
 * @param textColor
 * @text Cor do texto
 * @desc Cor dos textos dos botões (hexadecimal, ex: #ffffff).
 * @type string
 * @default #ffffff
 *
 * @param replaceEscMenu
 * @text Substituir o menu do ESC
 * @desc Se ligado, o ESC no mapa abre este menu no lugar do menu padrão.
 * @type boolean
 * @on Sim
 * @off Não
 * @default true
 *
 * @param buttons
 * @text Botões
 * @desc Lista de botões do menu, na ordem em que a seleção navega.
 * @type struct<Button>[]
 * @default ["{\"label\":\"Save\",\"action\":\"save\",\"commonEventId\":\"0\",\"x\":\"288\",\"y\":\"200\",\"width\":\"240\",\"height\":\"48\",\"image\":\"\",\"align\":\"center\",\"fontSize\":\"28\"}","{\"label\":\"Load\",\"action\":\"load\",\"commonEventId\":\"0\",\"x\":\"288\",\"y\":\"264\",\"width\":\"240\",\"height\":\"48\",\"image\":\"\",\"align\":\"center\",\"fontSize\":\"28\"}","{\"label\":\"Exit\",\"action\":\"title\",\"commonEventId\":\"0\",\"x\":\"288\",\"y\":\"328\",\"width\":\"240\",\"height\":\"48\",\"image\":\"\",\"align\":\"center\",\"fontSize\":\"28\"}","{\"label\":\"Participants\",\"action\":\"commonEvent\",\"commonEventId\":\"1\",\"x\":\"288\",\"y\":\"392\",\"width\":\"240\",\"height\":\"48\",\"image\":\"\",\"align\":\"center\",\"fontSize\":\"28\"}"]
 *
 * @command openMenu
 * @text Abrir menu de pausa
 * @desc Abre o menu de pausa customizado.
 */

/*~struct~Button:
 * @param label
 * @text Texto
 * @desc Texto exibido no botão.
 * @type string
 * @default Botão
 *
 * @param action
 * @text Ação
 * @desc O que acontece ao selecionar o botão.
 * @type select
 * @option Salvar
 * @value save
 * @option Carregar
 * @value load
 * @option Voltar ao título
 * @value title
 * @option Common Event
 * @value commonEvent
 * @option Fechar menu
 * @value close
 * @default close
 *
 * @param commonEventId
 * @text Common Event
 * @desc Usado só quando a ação é "Common Event".
 * @type common_event
 * @default 0
 *
 * @param x
 * @text Posição X
 * @desc Posição horizontal do botão (pixels).
 * @type number
 * @min -9999
 * @default 288
 *
 * @param y
 * @text Posição Y
 * @desc Posição vertical do botão (pixels).
 * @type number
 * @min -9999
 * @default 200
 *
 * @param width
 * @text Largura
 * @type number
 * @min 1
 * @default 240
 *
 * @param height
 * @text Altura
 * @type number
 * @min 1
 * @default 48
 *
 * @param image
 * @text Imagem do botão
 * @desc Imagem em img/system/ (opcional). Será esticada para o tamanho do botão.
 * @type file
 * @dir img/system/
 * @require 1
 *
 * @param align
 * @text Alinhamento do texto
 * @type select
 * @option Esquerda
 * @value left
 * @option Centro
 * @value center
 * @option Direita
 * @value right
 * @default center
 *
 * @param fontSize
 * @text Tamanho da fonte
 * @type number
 * @min 1
 * @default 28
 */

(() => {
    "use strict";

    const pluginName = "CustomPauseMenu";
    const params = PluginManager.parameters(pluginName);

    //-------------------------------------------------------------------------
    // Leitura dos parâmetros
    //-------------------------------------------------------------------------

    const backgroundImage = String(params.backgroundImage || "");
    const cursorImage = String(params.cursorImage || "");
    const cursorSide = String(params.cursorSide || "left");
    const cursorOffsetX = Number(params.cursorOffsetX || 0);
    const cursorOffsetY = Number(params.cursorOffsetY || 0);
    const cursorBob = Number(params.cursorBob || 0);
    const fadeInDuration = params.fadeInDuration === undefined ? 12 : Math.max(0, Number(params.fadeInDuration));
    const fadeOutDuration = params.fadeOutDuration === undefined ? 12 : Math.max(0, Number(params.fadeOutDuration));
    const textColor = String(params.textColor || "#ffffff");
    const replaceEscMenu = String(params.replaceEscMenu || "true") === "true";

    function parseButtons() {
        let list = [];
        try {
            list = JSON.parse(params.buttons || "[]").map(s => JSON.parse(s));
        } catch (e) {
            console.error(pluginName + ": erro ao ler os botões.", e);
        }
        return list.map(b => ({
            label: String(b.label || ""),
            action: String(b.action || "close"),
            commonEventId: Number(b.commonEventId || 0),
            x: Number(b.x || 0),
            y: Number(b.y || 0),
            width: Math.max(1, Number(b.width || 240)),
            height: Math.max(1, Number(b.height || 48)),
            image: String(b.image || ""),
            align: String(b.align || "center"),
            fontSize: Number(b.fontSize || 28)
        }));
    }

    const buttons = parseButtons();

    //-------------------------------------------------------------------------
    // Comando de plugin
    //-------------------------------------------------------------------------

    PluginManager.registerCommand(pluginName, "openMenu", () => {
        if (!$gameParty.inBattle()) {
            SceneManager.push(Scene_CustomPauseMenu);
        }
    });

    //-------------------------------------------------------------------------
    // Scene_Map: ESC abre o menu customizado
    //-------------------------------------------------------------------------

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (!replaceEscMenu || buttons.length === 0) {
            _Scene_Map_callMenu.call(this);
            return;
        }
        SoundManager.playOk();
        SceneManager.push(Scene_CustomPauseMenu);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    //-------------------------------------------------------------------------
    // Window_CustomPauseCommand
    //-------------------------------------------------------------------------

    function Window_CustomPauseCommand() {
        this.initialize(...arguments);
    }

    Window_CustomPauseCommand.prototype = Object.create(Window_Selectable.prototype);
    Window_CustomPauseCommand.prototype.constructor = Window_CustomPauseCommand;

    Window_CustomPauseCommand.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.setBackgroundType(2); // transparente
        this._images = buttons.map(b => (b.image ? ImageManager.loadSystem(b.image) : null));
        this._images.forEach(bmp => {
            if (bmp) {
                bmp.addLoadListener(() => this.refresh());
            }
        });
        this.refresh();
        this.select(0);
        this.activate();
    };

    // Sem margem interna: as posições dos botões são em pixels da tela.
    Window_CustomPauseCommand.prototype.updatePadding = function() {
        this.padding = 0;
    };

    Window_CustomPauseCommand.prototype.maxItems = function() {
        return buttons.length;
    };

    Window_CustomPauseCommand.prototype.maxVisibleItems = function() {
        return buttons.length;
    };

    Window_CustomPauseCommand.prototype.topIndex = function() {
        return 0;
    };

    Window_CustomPauseCommand.prototype.ensureCursorVisible = function() {
        //
    };

    // O cursor retangular padrão fica escondido (a seta é um sprite à parte).
    Window_CustomPauseCommand.prototype.refreshCursor = function() {
        this.setCursorRect(0, 0, 0, 0);
    };

    Window_CustomPauseCommand.prototype.itemRect = function(index) {
        const b = buttons[index];
        return new Rectangle(b.x, b.y, b.width, b.height);
    };

    Window_CustomPauseCommand.prototype.hitTest = function(x, y) {
        for (let i = 0; i < buttons.length; i++) {
            if (this.itemRect(i).contains(x, y)) {
                return i;
            }
        }
        return -1;
    };

    // Esquerda/direita também navegam, já que os botões podem estar em qualquer lugar.
    Window_CustomPauseCommand.prototype.cursorRight = function(wrap) {
        this.cursorDown(wrap);
    };

    Window_CustomPauseCommand.prototype.cursorLeft = function(wrap) {
        this.cursorUp(wrap);
    };

    Window_CustomPauseCommand.prototype.currentButton = function() {
        return buttons[this.index()];
    };

    Window_CustomPauseCommand.prototype.isEnabled = function(index) {
        const b = buttons[index];
        if (!b) {
            return false;
        }
        if (b.action === "save") {
            return $gameSystem.isSaveEnabled();
        }
        if (b.action === "load") {
            return DataManager.isAnySavefileExists();
        }
        return true;
    };

    Window_CustomPauseCommand.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_CustomPauseCommand.prototype.drawItem = function(index) {
        const b = buttons[index];
        const rect = this.itemRect(index);
        const bitmap = this._images ? this._images[index] : null;
        const enabled = this.isEnabled(index);

        this.resetFontSettings();
        this.changePaintOpacity(enabled);

        if (bitmap && bitmap.isReady()) {
            this.contents.blt(
                bitmap, 0, 0, bitmap.width, bitmap.height,
                rect.x, rect.y, rect.width, rect.height
            );
        }

        this.contents.fontSize = b.fontSize;
        this.contents.textColor = textColor;
        const textY = rect.y + Math.floor((rect.height - this.lineHeight()) / 2);
        const pad = 8;
        this.contents.drawText(
            b.label, rect.x + pad, textY, rect.width - pad * 2, this.lineHeight(), b.align
        );
        this.changePaintOpacity(true);
    };

    //-------------------------------------------------------------------------
    // Scene_CustomPauseMenu
    //-------------------------------------------------------------------------

    function Scene_CustomPauseMenu() {
        this.initialize(...arguments);
    }

    Scene_CustomPauseMenu.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CustomPauseMenu.prototype.constructor = Scene_CustomPauseMenu;

    Scene_CustomPauseMenu.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_CustomPauseMenu.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createCursorSprite();
        this.initMenuFade();
    };

    //---------------------------------------------------------------------
    // Fade in / fade out
    //---------------------------------------------------------------------

    Scene_CustomPauseMenu.prototype.initMenuFade = function() {
        // Ao voltar das telas de salvar/carregar, não repete o fade in.
        const returning = SceneManager.isPreviousScene(Scene_Save) ||
            SceneManager.isPreviousScene(Scene_Load);
        this._closing = false;
        this._closeCallback = null;
        if (fadeInDuration > 0 && !returning) {
            this._menuFadeValue = 0;
            this._menuFadeSign = 1;
        } else {
            this._menuFadeValue = 255;
            this._menuFadeSign = 0;
        }
        this.applyMenuFade();
    };

    Scene_CustomPauseMenu.prototype.applyMenuFade = function() {
        const o = Math.round(this._menuFadeValue);
        if (this._backgroundSprite) {
            // O fundo padrão do jogo tem opacidade máxima de 192.
            const max = backgroundImage ? 255 : 192;
            this._backgroundSprite.opacity = Math.round(o * max / 255);
        }
        if (this._commandWindow) {
            this._commandWindow.contentsOpacity = o;
        }
        if (this._cursorSprite) {
            this._cursorSprite.opacity = o;
        }
        if (this._cancelButton) {
            this._cancelButton.opacity = o;
        }
    };

    Scene_CustomPauseMenu.prototype.updateMenuFade = function() {
        if (this._menuFadeSign === 0) {
            return;
        }
        const duration = this._menuFadeSign > 0 ? fadeInDuration : fadeOutDuration;
        this._menuFadeValue += (255 / Math.max(1, duration)) * this._menuFadeSign;
        let finished = false;
        if (this._menuFadeSign > 0 && this._menuFadeValue >= 255) {
            this._menuFadeValue = 255;
            this._menuFadeSign = 0;
        } else if (this._menuFadeSign < 0 && this._menuFadeValue <= 0) {
            this._menuFadeValue = 0;
            this._menuFadeSign = 0;
            finished = true;
        }
        this.applyMenuFade();
        if (finished) {
            this.finishClose();
        }
    };

    // Fecha o menu com fade out e, no fim, executa o callback.
    Scene_CustomPauseMenu.prototype.startClose = function(callback) {
        if (this._closing) {
            return;
        }
        this._closing = true;
        this._closeCallback = callback;
        this._commandWindow.deactivate();
        if (fadeOutDuration <= 0) {
            this._menuFadeValue = 0;
            this._menuFadeSign = 0;
            this.applyMenuFade();
            this.finishClose();
        } else {
            this._menuFadeSign = -1;
        }
    };

    Scene_CustomPauseMenu.prototype.finishClose = function() {
        const callback = this._closeCallback;
        this._closeCallback = null;
        if (callback) {
            callback();
        }
    };

    // ESC, botão de cancelar e "Fechar menu" passam por aqui.
    Scene_CustomPauseMenu.prototype.popScene = function() {
        this.startClose(() => SceneManager.pop());
    };

    Scene_CustomPauseMenu.prototype.createBackground = function() {
        // Foto do jogo por baixo, para o fade mostrar o mapa em vez de tela preta.
        this._underlaySprite = new Sprite(SceneManager.backgroundBitmap());
        this.addChild(this._underlaySprite);
        if (backgroundImage) {
            const bitmap = ImageManager.loadSystem(backgroundImage);
            this._backgroundSprite = new Sprite(bitmap);
            bitmap.addLoadListener(() => {
                this._backgroundSprite.scale.x = Graphics.width / bitmap.width;
                this._backgroundSprite.scale.y = Graphics.height / bitmap.height;
            });
            this.addChild(this._backgroundSprite);
        } else {
            Scene_MenuBase.prototype.createBackground.call(this);
        }
    };

    Scene_CustomPauseMenu.prototype.createCommandWindow = function() {
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._commandWindow = new Window_CustomPauseCommand(rect);
        this._commandWindow.setHandler("ok", this.onCommandOk.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_CustomPauseMenu.prototype.createCursorSprite = function() {
        this._cursorSprite = new Sprite();
        if (cursorImage) {
            this._cursorSprite.bitmap = ImageManager.loadSystem(cursorImage);
        } else {
            const bmp = new Bitmap(32, 32);
            bmp.fontSize = 26;
            bmp.drawText("\u25B6", 0, 0, 32, 32, "center");
            this._cursorSprite.bitmap = bmp;
        }
        this.addChild(this._cursorSprite);
        this.updateCursorSprite();
    };

    Scene_CustomPauseMenu.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.updateMenuFade();
        this.updateCursorSprite();
    };

    Scene_CustomPauseMenu.prototype.updateCursorSprite = function() {
        const sprite = this._cursorSprite;
        const win = this._commandWindow;
        if (!sprite || !win) {
            return;
        }
        const index = win.index();
        const bitmap = sprite.bitmap;
        if (index < 0 || !bitmap || !bitmap.isReady()) {
            sprite.visible = false;
            return;
        }
        const rect = win.itemRect(index);
        const bob = cursorBob > 0 ? Math.sin(Graphics.frameCount / 10) * cursorBob : 0;
        const ox = this._windowLayer ? this._windowLayer.x : 0;
        const oy = this._windowLayer ? this._windowLayer.y : 0;
        let x;
        if (cursorSide === "right") {
            x = rect.x + rect.width + cursorOffsetX - bob;
        } else {
            x = rect.x - bitmap.width + cursorOffsetX + bob;
        }
        const y = rect.y + Math.floor((rect.height - bitmap.height) / 2) + cursorOffsetY;
        sprite.x = Math.round(x + ox);
        sprite.y = Math.round(y + oy);
        sprite.visible = true;
    };

    Scene_CustomPauseMenu.prototype.onCommandOk = function() {
        const b = this._commandWindow.currentButton();
        switch (b.action) {
            case "save":
                SceneManager.push(Scene_Save);
                break;
            case "load":
                SceneManager.push(Scene_Load);
                break;
            case "title":
                this.fadeOutAll();
                SceneManager.goto(Scene_Title);
                break;
            case "commonEvent":
                this.startClose(() => {
                    if (b.commonEventId > 0) {
                        $gameTemp.reserveCommonEvent(b.commonEventId);
                    }
                    SceneManager.pop();
                });
                break;
            default:
                this.popScene();
                break;
        }
    };

    window.Scene_CustomPauseMenu = Scene_CustomPauseMenu;
    window.Window_CustomPauseCommand = Window_CustomPauseCommand;
})();
