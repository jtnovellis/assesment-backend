# Favs API

Este proyecto es una API tipo CRUD que corre en local a traves de la siguiente url: http://localhost:8080 permitiendole al usuario crear sus propias listas de favoritos, actualizarlas y borrarlas al su gusto siempre y cuando esté autenticado.

## Requisitos

Para este proyecto necesitas tener instalado las siguientes librerias/tecnologias:

- Node.js

[Desde esta dirección lo puedes instalar en caso de no tenerlo](https://nodejs.org/es/download/)

## Configuración

Para configurar este proyecto de forma local sigue estas instrucciones:

1. Clona el proyecto de GitHub con el siguiente comando:

```
git clone <link del repositorio> <nombre de la carpeta>
```

2. Instala las dependencias con NPM, corriendo el siguiente comando:

```
npm install
```

3. Ejecuta el proyecto con el siguiente comando:

```
npm run dev
```

## Endpoints

- Todas las runas requiren autenticación

### User

- POST /api/auth/local/signup
  --> Registra un usuario

- POST /api/auth/local/signin
  --> Inicia sesión a un usuario

### List

- POST /api/lists
  --> Crea una lista

- GET /api/lists
  --> Lista todas las listas

- GET /api/lists/:listId
  --> Muestra la lista deseada por el usuario

- PUT /api/lists/:listId
  --> Actualiza una lista

- DELETE /api/lists/:listId
  --> Borra la lista deseada por el usuario

### Fav

- POST /api/favs/:listId
  --> Crea un favorito

- GET /api/favs/:listId
  --> Lista todas los favoritos

- GET /api/only/favs/:favId
  --> Muestra el favorito deseado por el usuario

- PUT /api/favs/:favId
  --> Actualiza un favorito

- DELETE /api/favs/:favId
  --> Borra un favorito deseado por el usuario
