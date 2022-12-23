<script>
    import Grid from "./grid.svelte";
</script>

<div class="container">
    <div class="header">
        <h1>Amigo Oculto</h1>
        <div>
            Existem 10 colunas porque o maior nome da familia tem 10 caracteres,
            insere 'K' quando acabar o nome
        </div>
        <div>Por exemplo SARAKKKKKK</div>
        <div>
            <b> Pista: </b>
            Este website
        </div>
    </div>
    <Grid />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .header {
        text-align: center;
        margin-bottom: 100px;
        min-width: 700px;
        font-size: calc(20px + 1.5vw);
    }
    b {
        font-weight: 1500;
    }
</style>
