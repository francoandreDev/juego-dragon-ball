# Dragon Ball Mini Game

Este proyecto es una aplicación React que consume la API de Dragon Ball para crear un minijuego interactivo. El juego permite al jugador interactuar con personajes de Dragon Ball y realizar diferentes acciones como transformarse en un luchador o disparar bolas de energía.

## Características del Juego

- **Interacción con personajes de Dragon Ball**: Los jugadores pueden interactuar con personajes de la saga, como Goku, Vegeta, entre otros.
- **Transformación**: El jugador puede transformar a su personaje en un luchador con diferentes habilidades.
- **Bolas de energía**: El jugador puede disparar bolas de energía hacia enemigos o metas.
- **Puntuaciones**: El juego mantiene un puntaje que se actualiza a medida que el jugador interactúa con el juego.

## Tecnologías utilizadas

- **React**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **TypeScript**: Superset de JavaScript para una mayor seguridad en los tipos de datos.
- **@react-three/fiber**: Biblioteca para usar Three.js con React, permitiendo crear gráficos 3D interactivos.
- **Three.js**: Biblioteca de gráficos 3D para crear escenas, personajes y efectos visuales.
- **Dragon Ball API**: API para obtener datos de personajes, ataques y habilidades de la serie Dragon Ball.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/dragon-ball-mini-game.git
cd dragon-ball-mini-game
```

2. Instala las dependencias del proyecto e inicia el proyecto:

```bash
npm install
npm run dev
```
Abre tu navegador y ve a http://localhost:3000 o http://localhost:5173 para empezar.

Estructura del Proyecto
```
├── public/
│   └── index.html          # Archivo principal HTML
├── src/
│   ├── components/         # Componentes de la interfaz de usuario
│   ├── hooks/              # Custom hooks
│   ├── game/               # Lógica del juego y componentes de Three.js
│   ├── styles/             # Estilos CSS
│   ├── interfaces/         # Interfaces CSS
│   ├── types/              # Tipos principalmente para las props de los componentes
│   ├── App.tsx             # Componente principal
│   └── index.tsx           # Punto de entrada
├── package.json            # Configuración de npm y dependencias
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Este archivo
```

## Funcionalidad del Juego
1. Consumo de la API de Dragon Ball: La aplicación consume la API de Dragon Ball para obtener datos de personajes como Goku, Vegeta, etc. Estos datos se usan para crear el entorno del juego y las interacciones con los personajes.

2. Juego interactivo en 3D: El juego se ejecuta en un lienzo de Three.js y presenta elementos en 3D, como el personaje que el jugador controla. El jugador puede interactuar con el entorno disparando bolas de energía, moviéndose por el espacio y activando transformaciones de personajes.

3. Estado Global con Context API: Los datos del juego (como la puntuación, la energía de los personajes y las bolas de energía) se gestionan a través de un estado global utilizando React Context.

4. Persistencia: El estado del juego se mantiene incluso cuando el jugador navega entre las diferentes páginas de la aplicación, utilizando el estado global proporcionado por el Context API.

## Instrucciones para Jugar
Seleccionar un personaje: Cuando inicies el juego, podrás elegir entre diferentes personajes de la saga Dragon Ball. Cada uno tiene habilidades y características únicas.

Moverse y disparar: Usa el mouse o los controles de teclado para mover al personaje y disparar bolas de energía hacia los enemigos o las metas.

- Transformación: Presiona la tecla T para transformar a tu personaje, si es posible. Dependiendo de los personajes, las transformaciones ofrecen ventajas durante el juego.

- Puntuación: El puntaje se muestra en la parte superior de la pantalla y se actualiza conforme el jugador interactúa con el juego.

## Desarrollado con
- React: Biblioteca principal para la construcción de la interfaz de usuario.
- TypeScript: Lenguaje utilizado para mejorar la seguridad del código.
- Three.js: Biblioteca para gráficos 3D interactivos.
- @react-three/fiber: Para integrar Three.js con React.
- Dragon Ball API: API para obtener datos de personajes y habilidades.


## Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork de este repositorio.
Crea una rama (git checkout -b feature/nueva-funcionalidad).
Haz tus cambios y agrega tus pruebas.
Realiza un commit con tus cambios (git commit -am 'Añadir nueva funcionalidad').
Haz push a la rama (git push origin feature/nueva-funcionalidad).
Abre un pull request.

Contacto
Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto a través de correo electrónico o abre un problema en el repositorio.

¡Gracias por jugar y disfrutar del Dragon Ball Mini Game! ✨