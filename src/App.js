function App(){

    const style_app = {
        maxWidth: '860px',
        margin: '40px auto'
    }

    return(
        <div style={style_app}>
            <h1>Laboratorio React JS</h1>
            <button>Nuevo Juego</button>
        </div>  
    )
}



// Renderizamos el componente APP hacia el DOM especificando el ID 'root'
ReactDOM.render(
    <App />,
    document.getElementById('root')
)