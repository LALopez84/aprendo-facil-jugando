-- ============================================================
-- Aprendo Fácil Jugando - Script de base de datos (MySQL 8.0+)
-- Ejecutar una sola vez en MySQL Workbench o en la consola mysql
-- ============================================================

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