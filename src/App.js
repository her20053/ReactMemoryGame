
// Creamos una variable que mantenga un link src hacia las 6 posibles imagenes:
const imagenesEnCartas = [
    {"src": "/imagenes/darth-vader.png", encontada: false},
    {"src": "/imagenes/death-star.png", encontada: false},
    {"src": "/imagenes/jedi-order.png", encontada: false},
    {"src": "/imagenes/light-saber.png", encontada: false},
    {"src": "/imagenes/millennium-falcon.png", encontada: false},
    {"src": "/imagenes/r2d2.png", encontada: false}
]

function CartaSeparada({carta, administrarEleccion, volteada}){
    
    const establecerClick = () =>{
        administrarEleccion(carta)
    }

    return(
    <div className = 'carta'>
        <div className = {volteada ? 'volteada' : 'no_volteada'}>
            <img 
            className = 'frente' 
            alt = 'frente-carta' 
            src = {carta.src}
            />
            <img 
            className = 'vuelta' 
            alt = 'volteada-carta' 
            src = '/imagenes/star_wars_logo.gif'
            onClick = {establecerClick}
            />
        </div>
    </div>
    )
}

function App(){

    // Creamos un estado en el que 'cartas' es nuestra variable y 'establecerCartas' es nuestro metodo
    // Lo instanciamos a que empiece con un array vacio:
    const [cartas, establecerCartas] = React.useState([])

    // Creamos un estado en el que 'turnos' es nuestra variable y 'establecerTurnos' es nuestro metodo
    // Lo instanciamos a que empiece con 0 turnos usados
    const [turnos, establecerTurnos] = React.useState(0)

    // Creamos estados para las elecciones que el jugador elige:
    const [primeraEleccion, establecerPrimeraEleccion] = React.useState(null)
    const [segundaEleccion, establecerSegundaEleccion] = React.useState(null)

    // Aleatorizamos las cartas:
    const aleatorizarCartas = () =>{
        // Creamos una array que tenga descompuestos 2 veces el array 'imagenesEnCartas' para tener un total de 12 cartas
        // con cada imagen teniendo su pareja:
        const cartasAleatorizadas = [...imagenesEnCartas, ...imagenesEnCartas]
        // Con el metodo sort, aleatorizamos las cartas:
        .sort(() => Math.random() - 0.5 ) /*Creamos una arrow function que si el numero es positivo cambiara de posicion la carta*/
        // Para la nueva array ya aleatorizada por cada elemento aplicamos un id:
        .map((carta) => ({ ...carta, id: Math.random()})) /*Descomponemos sus atributos que solo son src y le agregamos un rnd id */
    establecerPrimeraEleccion(null)
    establecerSegundaEleccion(null)
    // Utilizamos el metodo del estado creado previamente y le enviamos como parametro las cartas aleatorias:
    establecerCartas(cartasAleatorizadas)
    // Establecemos el valor de turnos a 0 al crear un nuevo juego presionando el boton:
    establecerTurnos(0)
    }

    const resetearCartas = () => {
        establecerPrimeraEleccion(null)
        establecerSegundaEleccion(null)
        establecerTurnos(turnos => turnos + 1)
    }

    // Le creamos un estilo a la APP:
    const style_app = {
        maxWidth: '860px',
        margin: '40px auto'
    }

    // Creamos una manera de administrar las elecciones que el usuario elige en los turnos:
    const administrarEleccion = (carta) =>{
        if(primeraEleccion != null){
            establecerSegundaEleccion(carta)
        }
        else{
            establecerPrimeraEleccion(carta)
        }
    }

    // Comparar al momento que dos cartas ya no sean nulas:
    React.useEffect(() => {
        if(primeraEleccion && segundaEleccion){
            if(primeraEleccion.src === segundaEleccion.src){
                establecerCartas((cartasAnteriores) =>{
                    return cartasAnteriores.map(c => {
                        if(c.src === primeraEleccion.src){
                            return {... c, encontada: true}
                        }
                        else{
                            return c
                        }
                    })
                })
                resetearCartas()
            }
            else{
                setTimeout(() => resetearCartas(), 1000)
            }
        }
    }
    ,[primeraEleccion,segundaEleccion])

    const todas = false
    var conts = 0
    cartas.forEach(c => {
        if (c.encontada){conts++}
    });
    if(conts == 12){
        setTimeout(() => {alert("Felicidades! Has completado el juego!!")}, 500)
        // console.log('eureka')
    }

    const abrirGithub = () =>{
        window.open("https://github.com/her20053/ReactMemoryGame/commits/main")
    }

    React.useEffect(() => {
        aleatorizarCartas()
    },[])

    return(
        <div style={style_app}>
            
            <h1>Laboratorio React JS</h1>
            <h4>Andres Hernandez Guerra 20053 | Turnos : {turnos}</h4>
            <button onClick = {aleatorizarCartas}>Nuevo Juego</button>
            <button id = 'git' onClick = {abrirGithub}>Github</button>
            <div className = 'plantilla-carta'>
                { cartas.map( carta => (
                    <CartaSeparada 
                        key = {carta.id} 
                        carta = {carta}
                        administrarEleccion = {administrarEleccion} 
                        volteada = {carta === primeraEleccion || carta === segundaEleccion || carta.encontada}
                    />
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