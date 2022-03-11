
// Creamos una variable que mantenga un link src hacia las 6 posibles imagenes:
const imagenesEnCartas = [
    {"src": "/imagenes/darth-vader.png"},
    {"src": "/imagenes/death-star.png"},
    {"src": "/imagenes/jedi-order.png"},
    {"src": "/imagenes/light-saber.png"},
    {"src": "/imagenes/millennium-falcon.png"},
    {"src": "/imagenes/r2d2.png"}
]

function App(){

    // Creamos un estado en el que 'cartas' es nuestra variable y 'establecerCartas' es nuestro metodo
    // Lo instanciamos a que empiece con un array vacio:
    const [cartas, establecerCartas] = React.useState([])

    // Creamos un estado en el que 'turnos' es nuestra variable y 'establecerTurnos' es nuestro metodo
    // Lo instanciamos a que empiece con 0 turnos usados
    const [turnos, establecerTurnos] = React.useState(0)

    // Aleatorizamos las cartas:
    const aleatorizarCartas = () =>{
        // Creamos una array que tenga descompuestos 2 veces el array 'imagenesEnCartas' para tener un total de 12 cartas
        // con cada imagen teniendo su pareja:
        const cartasAleatorizadas = [...imagenesEnCartas, ...imagenesEnCartas]
        // Con el metodo sort, aleatorizamos las cartas:
        .sort(() => Math.random() - 0.5 ) /*Creamos una arrow function que si el numero es positivo cambiara de posicion la carta*/
        // Para la nueva array ya aleatorizada por cada elemento aplicamos un id:
        .map((carta) => ({ ...carta, id: Math.random()})) /*Descomponemos sus atributos que solo son src y le agregamos un rnd id */
    
    // Utilizamos el metodo del estado creado previamente y le enviamos como parametro las cartas aleatorias:
    establecerCartas(cartasAleatorizadas)
    // Establecemos el valor de turnos a 0 al crear un nuevo juego presionando el boton:
    establecerTurnos(0)
    }

    // Le creamos un estilo a la APP:
    const style_app = {
        maxWidth: '860px',
        margin: '40px auto'
    }

    console.log(cartas,turnos)

    return(
        <div style={style_app}>
            
            <h1>Laboratorio React JS</h1>
            <button onClick = {aleatorizarCartas}>Nuevo Juego</button>

            <div className = 'plantilla-carta'>
                { cartas.map( carta => (
                    <div className = 'carta' key = {carta.id }>
                        <div>
                            <img className = 'frente' alt = 'frente-carta' src = {carta.src}/>
                            <img className = 'vuelta' alt = 'volteada-carta' src = '/imagenes/physics.png'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>  
    )
}



// Renderizamos el componente APP hacia el DOM especificando el ID 'root'
ReactDOM.render(
    <App />,
    document.getElementById('root')
)