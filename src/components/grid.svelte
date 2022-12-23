<script lang="ts">
    import { onMount } from "svelte";
    import { AmigoOcultolde } from "../game/index.ts";
    import image from "../../public/image.png";
    import { confetti } from "@neoconfetti/svelte";

    let rows = 8;
    let columns = 10;

    let game;
    let code: string[][];
    let isWin;
    let messages: string[] = [];
    let currentMessage = "";

    onMount(() => {
        game = new AmigoOcultolde(columns, rows);
        code = game.guessCode;
    });

    const onInput = (keyboard: KeyboardEvent) => {
        const element = keyboard.target as HTMLInputElement;

        console.log(keyboard.key);
        element.value = element.value.toUpperCase();
        const isFinnished = game.updateGuess(keyboard);

        if (isFinnished) {
            const { guessCode, win, message } = game.checkGuess();
            code = guessCode;
            isWin = win;
            !isWin && game.nextGuess(element.form);
            messages.push(message);
            currentMessage = message;
        }
    };

    const addValue = (keyboard: KeyboardEvent) => {
        const element = keyboard.target as HTMLInputElement;
        element.value = "";
    };
</script>

<svelte:head>
    <title>Amigo Oculto</title>
</svelte:head>

<form on:submit={(e) => e.preventDefault()}>
    <div class="grid">
        {#each Array(rows) as _, i}
            <div
                class="row {i}"
                class:selected={code?.length === i + 1}
                class:past={code?.length > i + 1}
            >
                {#each Array(columns) as _, j}
                    <div
                        class="letter cell{j}"
                        class:green={code?.[i]?.[j] === "X"}
                        class:yellow={code?.[i]?.[j] === "O"}
                    >
                        <input
                            type="text"
                            name=""
                            id={(i * columns + j).toString()}
                            on:keydown={addValue}
                            on:keyup={onInput}
                        />
                    </div>
                {/each}
                <div
                    class="rowMessage {i + 1}"
                    id={code?.length.toString()}
                    class:show={code?.length === i + 2}
                    style="grid-column-end:{columns + 1}"
                >
                    {currentMessage || ""}
                </div>
            </div>
        {/each}
    </div>
</form>

{#if isWin}
    <div class="winMessageContainer" class:isWin>
        <img src={image} alt="es lindo" />
        <div class="winMessage" style="z-index: 1">Acertaste!!!</div>
        <div
            class="confetti"
            use:confetti={{
                particleSize: 40,
                destroyAfterDone: false,
                force: 0.3,
                stageWidth: 1500,
                stageHeight: 1500,
            }}
        />
    </div>
{/if}

<style>
    .grid {
        max-width: 90%;
        align-self: center;
        justify-self: center;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .grid .row {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 0.5rem;
        margin: 0 0 0.5rem 0;
    }

    .letter {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-sizing: border-box;
        text-transform: lowercase;
        border: none;
        font-size: calc(20px + 1.5vw);
        border-radius: 2px;
        background: white;
        margin: 0;
        color: rgba(0, 0, 0, 0.7);
    }

    input {
        height: 80px;
        width: 80px;
        border: 1px solid grey;
        border-radius: 4px;
        text-align: center;
        font-size: calc(20px + 1.5vw);
        opacity: 0.5;
    }

    .green input {
        background-color: green;
        color: white;
    }
    .yellow input {
        background-color: orange;
        color: white;
    }
    .past input {
        opacity: 0.6;
        pointer-events: none;
    }
    .selected input {
        opacity: 1;
        border: 1px solid black;
        pointer-events: all;
    }
    .rowMessage {
        justify-content: center;
        grid-column-start: 1;
        font-size: 40px;
        display: none;
    }
    .show {
        display: flex;
    }

    .winMessageContainer {
        position: fixed;
        width: 100%;
        height: 100%;
        display: none;
        opacity: 0;
    }
    .winMessageContainer.isWin {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        z-index: 1;
        font-size: 6vw;
        background-color: rgba(255, 255, 255, 0.568);
    }
    .winMessage {
        z-index: 1;
        color: white;
    }
    .confetti {
        position: absolute;
        left: 50%;
        top: 20%;
        width: 100%;
        height: 100%;
    }
    img {
        position: absolute;
        top: 0%;
        z-index: 0;
    }
</style>
