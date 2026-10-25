# 🎮 Aprendo Fácil Jugando 🎮

Aplicación web educativa diseñada para niños de **preprimaria y primaria**.  
Los estudiantes aprenden mediante juegos interactivos y los docentes pueden revisar su progreso en un tablero de control.

**Proyecto final del curso Desarrollo Web** · Universidad Mariano Gálvez de Guatemala · 2026  
**Autor:** Luis Alberto López Hernández · **Carné:** 5990-18-1186

---

## 🚀 Tecnologías utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | React (Vite) + CSS |
| Backend | Node.js + Express (API REST) + CORS |
| Base de datos | MySQL 8.0+ |

El frontend y el backend se comunican mediante **API REST (HTTP GET/POST)** con **CORS** habilitado. Ambas capas funcionan de manera independiente.

---

## 🔗 Enlaces publicados

- Aplicación: [COMPLETAR: URL del frontend]  
- API: [COMPLETAR: URL del backend]  

---

## 📋 Requisitos

- **Node.js 18 o superior** (`node -v`)  
- **MySQL 8.0 o superior** (Workbench opcional)  

---

## ⚙️ Instalación local paso a paso

### 1. Base de datos

1. Abre MySQL Workbench y conéctate a tu servidor local.
2. Ejecuta el archivo `database.sql` completo (icono del rayo ⚡), o copia el script que aparece abajo.

Script de la base de datos:

```sql
CREATE DATABASE IF NOT EXISTS aprendo_facil CHARACTER SET utf8mb4;
USE aprendo_facil;

CREATE TABLE IF NOT EXISTS estudiantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  edad TINYINT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  nivel ENUM('preprimaria','primaria') NOT NULL,
  tema VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS progreso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estudiante_id INT NOT NULL,
  actividad_id INT NOT NULL,
  puntaje INT NOT NULL,
  aciertos INT NOT NULL,
  intentos INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (actividad_id) REFERENCES actividades(id)
);

INSERT INTO actividades (nombre, nivel, tema) VALUES
('Adentro y Afuera','preprimaria','espaciales'),
('Arriba y Abajo','preprimaria','espaciales'),
('Cerca y Lejos','preprimaria','espaciales'),
('Encima y Debajo','preprimaria','espaciales'),
('Figuras Geométricas','preprimaria','figuras'),
('Memoria de Pares','preprimaria','memoria'),
('Tablas de Multiplicar','primaria','matematicas'),
('Suma de Quebrados','primaria','matematicas'),
('Multiplicación con Decimales','primaria','matematicas');
```

3. Verifica que exista la base `aprendo_facil` con las tablas `estudiantes`, `actividades` y `progreso`. Esta consulta debe devolver **9** actividades:

```sql
SELECT COUNT(*) AS actividades FROM aprendo_facil.actividades;
```

### 2. Backend

```powershell
cd backend
npm install
copy .env.example .env
```

Abre el archivo `.env` y escribe tu contraseña de MySQL en `DB_PASSWORD` (deja `DB_SSL=false` en local). Luego inicia el servidor:

```powershell
node server.js
```

Debe mostrar: `API lista en http://localhost:10001`. Prueba en el navegador: `http://localhost:10001/api/actividades`.

### 3. Frontend (en otra terminal)

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

Abre **http://localhost:5173** en el navegador.

> Si cambias el archivo `.env`, detén el servidor con Ctrl + C y vuelve a iniciarlo.

### 4. Opcional: limpiar los datos de prueba

Este script **borra todos los estudiantes y partidas** guardados. No modifica las actividades. Úsalo solo si quieres empezar con la base vacía:

```sql
USE aprendo_facil;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE progreso;
TRUNCATE TABLE estudiantes;
SET FOREIGN_KEY_CHECKS = 1;
```

---

## Cómo usar la aplicación

Al abrir la aplicación aparecen dos botones:

1. **Soy estudiante:** escribe su nombre y edad (3 a 12 años), elige Preprimaria o Primaria y juega. Al terminar, el resultado se guarda en MySQL.
2. **Soy docente:** abre el tablero con el historial de partidas y permite filtrar por estudiante.

## Actividades

- **Preprimaria:** Adentro y Afuera, Arriba y Abajo, Cerca y Lejos, Encima y Debajo, Figuras Geométricas, Memoria de Pares.
- **Primaria:** Tablas de Multiplicar, Suma de Quebrados, Multiplicación con Decimales.

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/estudiantes` | Registra un estudiante (nombre y edad) |
| GET | `/api/estudiantes` | Lista los estudiantes |
| GET | `/api/actividades?nivel=` | Catálogo de actividades (filtro opcional por nivel) |
| POST | `/api/progreso` | Guarda el resultado de una partida |
| GET | `/api/progreso?estudiante_id=` | Historial de progreso (filtro opcional por estudiante) |

## Estructura

```
ProyectoFinal/
├── README.md
├── database.sql
├── .gitignore
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── controllers/   (estudiantes, actividades, progreso)
│   ├── routes/index.js
│   └── .env.example
└── frontend/
    ├── index.html
    ├── .env.example
    └── src/
        ├── App.jsx · App.css · api.js
        ├── components/  (Inicio, Registro, Menu, Juegos, Memoria, Tablero)
        ├── data/preguntas.js
        └── img/
```

## 📝 Cumplimiento de requerimientos

| Requerimiento | Dónde se cumple |
|---------------|-----------------|
| RF-01 Gestión de estudiantes | `Registro.jsx` + `POST /api/estudiantes` |
| RF-02 Ejecución del juego | `Juegos.jsx`, `Memoria.jsx` |
| RF-03 Evaluación visual | Colores verde/rojo y mensajes al instante |
| RF-04 Cálculo de puntuación | Puntaje en vivo (10 puntos por acierto) |
| RF-05 Registro de progreso | `POST /api/progreso` guarda en MySQL |
| RF-06 Consulta de reporte | `Tablero.jsx` (botón Soy docente) + `GET /api/progreso` |
| RF-07 Catálogo de actividades | `GET /api/actividades` desde MySQL |
| RF-08 Filtrado de reportes | Selector de estudiante en el tablero |
| RNF-01 Interfaz infantil | Fuente legible, botones grandes e ilustrados |
| RNF-02 Rendimiento < 500 ms | Consultas simples con pool de conexiones |
| RNF-03 CORS | `cors()` en `server.js` con `FRONTEND_URL` |
| RNF-04 Integridad referencial | `FOREIGN KEY` en la tabla `progreso` |
| RNF-05 Arquitectura desacoplada | Carpetas `backend` y `frontend` independientes |
| RNF-06 Portabilidad | Node 18+ y MySQL 8.0+ |
| RNF-07 Calidad de código | Componentes React y rutas/controladores Express |

## Créditos de imágenes

Las imágenes del menú, el fondo y los emojis provienen de páginas de internet y se usan con fines académicos.

- https://www.flaticon.com/free-icons/emoji
- https://heroicons.com
- https://github.com/googlefonts/noto-emoji
- https://emojipedia.org/most-popular
- https://es.pinterest.com/ideas/adentro-afuera/914462519444/
- https://ar.pinterest.com/eugiin/arriba-abajo/
- https://www.pinterest.com/jenniferquesadaestrada/concepto-cerca-lejos/
- https://www.facebook.com/photo?fbid=122198710748537636&set=pcb.122198710886537636
- https://es.pngtree.com/free-backgrounds-photos/elemento-del-paisaje
- https://www.magnific.com/es/vectores/coleccion-comida
- https://math-center.org/es-AR/resources/6th/multiplying-and-dividing-decimals/
- https://impara.es/producto/aprender-a-multiplicar/
- https://soymatematicas.com/sumar-fracciones/
