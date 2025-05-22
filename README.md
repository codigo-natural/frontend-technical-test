# Frontend Technical Test - User Directory

## Tecnologías Utilizadas

*   **Vue.js 3:** Framework progresivo para construir interfaces de usuario (usando Composition API).
*   **Vue Router:** Librería oficial de enrutamiento para Vue.js.
*   **Pinia:** Librería oficial de gestión de estado para Vue.js, intuitiva y ligera.
*   **Axios:** Cliente HTTP basado en promesas para el navegador y Node.js.
*   **Vue Test Utils:** Librería oficial de utilidades de prueba para Vue.js.
*   **CSS3:** Para estilos personalizados, buscando una interfaz limpia y funcional.

## Funcionalidades Implementadas

*   Mostrar una lista de usuarios obtenida desde `https://jsonplaceholder.typicode.com/users`.
*   Permitir consultar detalles de un usuario específico desde la lista, navegando a `/users/:id`.
*   Manejo de estados de carga (loading) mientras se obtienen los datos.
*   Manejo básico de errores (fallo en API, datos faltantes) mostrando mensajes al usuario.
*   Ruta 404 para URLs no encontradas.
*   Interfaz visual agradable y funcional, con diseño responsivo básico.

## Requisitos Previos

*   Node.js (v20.x o superior)
*   npm (v9.x o superior)

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/codigo-natural/frontend-technical-test.git
    cd frontend-technical-test
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

## Ejecución

### Servidor de Desarrollo

```bash
npm run serve
```

Para iniciar el servidor de desarrollo (generalmente en `http://localhost:5173`):
### Pruebas
Para ejecutar las pruebas unitarias y de integración:
```bash
npm run test:unit

# este mismo comando genera un reporte de cobertura de pruebas (se encontrará en la carpeta ./coverage/):
```

### Build para Producción

Para compilar la aplicación para producción (los archivos se generan en la carpeta ./dist/):
```bash
npm run build
```

## Estructura del Proyecto
El proyecto sigue una estructura modular estándar para aplicaciones Vue:

```
src/
├── App.vue                 # Componente raíz
├── main.js                 # Inicialización de Vue
├── assets/                 # CSS global, imágenes
├── components/             # Componentes UI reutilizables (UserCard, UserDetailsDisplay, etc.)
├── router/                 # Configuración de Vue Router
├── services/               # Lógica de llamadas API (userService.js)
├── store/                  # Módulos de Pinia (userStore.js)
├── views/                  # Componentes de página (UserListView, UserDetailView)
└── tests/                  # Pruebas unitarias y de integración
```

## Arquitectura y Decisiones Técnicas
- **Arquitectura Modular y Escalable:**

  - **Componentes:** La UI se divide en componentes reutilizables y de vista (páginas), promoviendo la separación de responsabilidades (SoC).

  - **Servicios:** La lógica de acceso a datos (API) está encapsulada en src/services/userService.js. Esto desacopla los componentes de la implementación específica de la API y facilita el mocking en pruebas.

  - **Gestión de Estado (Pinia):** `src/store/userStore.js` centraliza el estado de la aplicación relacionado con los usuarios (lista, usuario actual, estados de carga y error). Pinia fue elegido por su simplicidad, rendimiento y excelente integración con Vue 3 Composition API, además de su modularidad.
- **Manejo Avanzado de Estados:**

  - Cada operación asíncrona (obtener lista, obtener detalle) tiene sus propios indicadores isLoading y error en el store de Pinia.
  - Los componentes `LoadingSpinner.vue` y `ErrorMessage.vue` se utilizan para proporcionar feedback visual claro al usuario durante estos estados.
- **Enrutamiento (Vue Router):** Se utiliza para la navegación entre la lista de usuarios y la vista de detalle, así como para la página 404. Los parámetros de ruta (:id) se usan para identificar al usuario en la vista de detalle.
- **Pruebas (Vitest & Vue Test Utils):**
  - **Pruebas Unitarias:** Se enfocan en probar componentes individuales y la lógica del store de Pinia en aislamiento. Se mockean las dependencias externas (como userService). El objetivo es alcanzar una alta cobertura (>80%).
  - **Prueba de Integración Básica:** Se incluye una prueba que simula un flujo de usuario: navegar de la lista al detalle, verificando que los datos correctos se cargan y muestran, mockeando las llamadas API.

- **Manejo de Errores:**
  - El userService captura errores de red o respuestas HTTP no exitosas y los propaga.
  - El userStore captura estos errores y los almacena en el estado (errorList, errorDetail).
  - Las vistas reaccionan a estos estados de error mostrando un ErrorMessage.vue. Se consideran errores como "User not found" (404 de la API) o fallos generales de red.
- **Estilo de Código y Calidad:** Se ha priorizado código limpio, legible y mantenible, utilizando la Composition API de Vue 3 para una mejor organización lógica en los componentes. Los estilos CSS son scoped para evitar colisiones y se busca una UI funcional y estéticamente agradable.
---

## Diagrama Simple de Componentes y Flujo de Datos

```
                                    +-----------------+
                                    |     App.vue     |
                                    +--------+--------+
                                             | (router-view)
                 +---------------------------+---------------------------+
                 |                                                       |
            (path: /)                                          (path: /users/:id)
                 |                                                       |
    +------------V-------------+                         +----------------V-----------------+
    |     UserListView.vue     | -- (click user) ---->   |     UserDetailView.vue           |
    +------------+-------------+                         +----------------+-----------------+
                 |                                                       |
                 | (v-for)                                               | (renders)
                 |                                                       |
    +------------V-------------+                         +----------------V-----------------+
    |      UserCard.vue        |                         |   UserDetailsDisplay.vue       |
    +--------------------------+                         +----------------------------------+
                 |                                                       |
                 | (fetchUsers)                                          | (fetchUserById)
                 |                                                       |
    +------------V-------------+                         +----------------V-----------------+
    |      userStore.js        | <---- (API calls) ----> |       userService.js             |
    +--------------------------+                         +----------------------------------+

        (state: users,          (isLoadingList, errorList,
         currentUser,           isLoadingDetail, errorDetail)
         isLoading*, error*)
```