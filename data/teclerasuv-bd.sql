-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: teclerasuv
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tv_asignatura`
--

DROP TABLE IF EXISTS `tv_asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_asignatura` (
  `ASI_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID correlativo automático\n',
  `ASI_CODIGO` varchar(10) NOT NULL COMMENT 'Código de la asignatura (ej.: INC201)',
  `ASI_NOMBRE` varchar(45) NOT NULL COMMENT 'Nombre de la asignatura',
  PRIMARY KEY (`ASI_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de asignaturas. Prefijo: ASI.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_asignatura`
--

LOCK TABLES `tv_asignatura` WRITE;
/*!40000 ALTER TABLE `tv_asignatura` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_asistencia_clase`
--

DROP TABLE IF EXISTS `tv_asistencia_clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_asistencia_clase` (
  `AC_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id correlativo automatico',
  `EST_ID` int(11) NOT NULL COMMENT 'Id estudiante',
  `CLA_ID` int(11) NOT NULL COMMENT 'ID clase',
  PRIMARY KEY (`AC_ID`),
  KEY `fk_TV_ASISTENCIA_CLASE_TV_ESTUDIANTE1_idx` (`EST_ID`),
  KEY `fk_TV_ASISTENCIA_CLASE_TV_CLASE1_idx` (`CLA_ID`),
  CONSTRAINT `fk_TV_ASISTENCIA_CLASE_TV_CLASE1` FOREIGN KEY (`CLA_ID`) REFERENCES `tv_clase` (`CLA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TV_ASISTENCIA_CLASE_TV_ESTUDIANTE1` FOREIGN KEY (`EST_ID`) REFERENCES `tv_estudiante` (`EST_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Estudiantes que asisten a una clase. Se crea un registro cuando el estudiante se agrega a una clase.\nPrefijo: AC';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_asistencia_clase`
--

LOCK TABLES `tv_asistencia_clase` WRITE;
/*!40000 ALTER TABLE `tv_asistencia_clase` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_asistencia_clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_clase`
--

DROP TABLE IF EXISTS `tv_clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_clase` (
  `CLA_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID correlativo automático de Clase\n',
  `CLA_PASSWORD` varchar(45) NOT NULL COMMENT 'Clave de conexión generada para que alumnos se agreguen a una clase',
  `CLA_FECHA_HORA_INICIO` datetime NOT NULL COMMENT 'Fecha y hora de inicio de la clase',
  `PAR_ID` int(11) NOT NULL COMMENT 'ID paralelo',
  `ASI_ID` int(11) NOT NULL COMMENT 'Id asignatra',
  `DOC_ID` int(11) NOT NULL COMMENT 'ID Docente',
  PRIMARY KEY (`CLA_ID`),
  KEY `fk_TV_CLASE_TV_PARALELO1_idx` (`PAR_ID`,`ASI_ID`,`DOC_ID`),
  CONSTRAINT `fk_TV_CLASE_TV_PARALELO1` FOREIGN KEY (`PAR_ID`, `ASI_ID`, `DOC_ID`) REFERENCES `tv_paralelo` (`PAR_ID`, `ASI_ID`, `TV_DOCENTE_DOC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Clase realizada por el profesor usando el sistema. Creada en CU Realizar Pregunta.\nPrefijo_CLA.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_clase`
--

LOCK TABLES `tv_clase` WRITE;
/*!40000 ALTER TABLE `tv_clase` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_docente`
--

DROP TABLE IF EXISTS `tv_docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_docente` (
  `DOC_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID correlativo automático\n',
  `DOC_CORREO` varchar(100) NOT NULL COMMENT 'Correo electrónico. Uso como nombre de usuario',
  `DOC_NOMBRE` varchar(45) NOT NULL COMMENT 'Nombre del docente',
  `DOC_PASSWORD` varchar(45) NOT NULL COMMENT 'Contraseña para usuarios de tipo Docente.',
  PRIMARY KEY (`DOC_ID`),
  UNIQUE KEY `DOC_CORREO_UNIQUE` (`DOC_CORREO`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Docentes. Sólo un docente es el encargado de hacer preguntas de su paralelo.\nPrefijo: DOC';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_docente`
--

LOCK TABLES `tv_docente` WRITE;
/*!40000 ALTER TABLE `tv_docente` DISABLE KEYS */;
INSERT INTO `tv_docente` VALUES (1,'erickfmm@gmail.com','erickprofe','b1548ff90b58beac609e0f9ccaba66025b1f9039');
/*!40000 ALTER TABLE `tv_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_estudiante`
--

DROP TABLE IF EXISTS `tv_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_estudiante` (
  `EST_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id correlativo automático',
  `EST_CORREO` varchar(100) NOT NULL COMMENT 'Correo Electrónico del Estudiante. Usado como nombre de usuario.',
  `EST_NOMBRE` varchar(100) NOT NULL COMMENT 'Nombre completo del estudiante',
  `EST_PASSWORD` varchar(45) NOT NULL COMMENT 'Contraseña para usuario de tipo estudiante.',
  PRIMARY KEY (`EST_ID`),
  UNIQUE KEY `EST_CORREO_UNIQUE` (`EST_CORREO`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Estudiante.\nPrefijo: EST';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_estudiante`
--

LOCK TABLES `tv_estudiante` WRITE;
/*!40000 ALTER TABLE `tv_estudiante` DISABLE KEYS */;
INSERT INTO `tv_estudiante` VALUES (1,'erickfmm@gmail.com','erick','b1548ff90b58beac609e0f9ccaba66025b1f9039');
/*!40000 ALTER TABLE `tv_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_paralelo`
--

DROP TABLE IF EXISTS `tv_paralelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_paralelo` (
  `PAR_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id. correlativo automático.',
  `PAR_NUMERO` int(11) NOT NULL COMMENT 'Número del paralelo\n',
  `ASI_ID` int(11) NOT NULL COMMENT 'ID de la asignatura',
  `TV_DOCENTE_DOC_ID` int(11) NOT NULL,
  PRIMARY KEY (`PAR_ID`,`ASI_ID`,`TV_DOCENTE_DOC_ID`),
  KEY `fk_Paralelo_Asignatura1_idx` (`ASI_ID`),
  KEY `fk_TV_PARALELO_TV_DOCENTE1_idx` (`TV_DOCENTE_DOC_ID`),
  CONSTRAINT `fk_Paralelo_Asignatura1` FOREIGN KEY (`ASI_ID`) REFERENCES `tv_asignatura` (`ASI_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TV_PARALELO_TV_DOCENTE1` FOREIGN KEY (`TV_DOCENTE_DOC_ID`) REFERENCES `tv_docente` (`DOC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Paralelos de una asignatura. Prefijo: PAR';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_paralelo`
--

LOCK TABLES `tv_paralelo` WRITE;
/*!40000 ALTER TABLE `tv_paralelo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_paralelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_pregunta_maestra`
--

DROP TABLE IF EXISTS `tv_pregunta_maestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_pregunta_maestra` (
  `PM_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID correlativo automático\n',
  `PM_NOMBRE` varchar(45) NOT NULL COMMENT 'Nombre corto de la pregunta',
  `PM_TEXTO` varchar(2000) NOT NULL COMMENT 'Texto de la pregunta\n',
  `PM_TIPO` varchar(1) NOT NULL COMMENT 'Tipo de la pregunta. Valores posibles: \n1: Alternativas\n2: Dicotómicas\n3: Likert\n',
  `PM_FECHA_CREACION` datetime DEFAULT NULL COMMENT 'Fecha y hora de creación de la pregunta',
  `PM_RUTA_IMAGEN` varchar(45) DEFAULT NULL COMMENT 'Ruta física en disco de la imagen cargada.',
  `PM_RUTA_VIDEO` varchar(45) DEFAULT NULL COMMENT 'Ruta física en disco de la imagen cargada.',
  `PM_EXPLICACION` varchar(2000) NOT NULL COMMENT 'Explicación de respuesta correcta.',
  `PM_RUTA_IMAGEN_EXPLICACION` varchar(45) DEFAULT NULL COMMENT 'Ruta del archivo de image cargado como explicacion',
  `TV_PARALELO_PAR_ID` int(11) NOT NULL,
  `TV_PARALELO_ASI_ID` int(11) NOT NULL,
  `TV_PARALELO_TV_DOCENTE_DOC_ID` int(11) NOT NULL,
  PRIMARY KEY (`PM_ID`),
  KEY `fk_TV_PREGUNTA_MAESTRA_TV_PARALELO1_idx` (`TV_PARALELO_PAR_ID`,`TV_PARALELO_ASI_ID`,`TV_PARALELO_TV_DOCENTE_DOC_ID`),
  CONSTRAINT `fk_TV_PREGUNTA_MAESTRA_TV_PARALELO1` FOREIGN KEY (`TV_PARALELO_PAR_ID`, `TV_PARALELO_ASI_ID`, `TV_PARALELO_TV_DOCENTE_DOC_ID`) REFERENCES `tv_paralelo` (`PAR_ID`, `ASI_ID`, `TV_DOCENTE_DOC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Pregunta maestra (Creada en CU Gestionar Pregunta). Prefijo: PM';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_pregunta_maestra`
--

LOCK TABLES `tv_pregunta_maestra` WRITE;
/*!40000 ALTER TABLE `tv_pregunta_maestra` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_pregunta_maestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_pregunta_realizada`
--

DROP TABLE IF EXISTS `tv_pregunta_realizada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_pregunta_realizada` (
  `PR_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID correlativo automático',
  `PR_HORA_INICIO` datetime NOT NULL COMMENT 'Fecha y hora de realización de a pregunta',
  `PR_HORA_FIN` datetime DEFAULT NULL COMMENT 'Fecha y hora de termino de la pregunta. Se llena cuando el docente da por terminada la pregunta, cuando se acaba el tiempo máximo de respuesta, o cuando todos los estudiates de la clase responden.',
  `PR_TIEMPO_MAX` int(11) DEFAULT NULL COMMENT 'Tiempo máximo de respuesta, en minutos',
  `PM_ID` int(11) NOT NULL COMMENT 'ID Pregunta maestra',
  `CLA_ID` int(11) NOT NULL COMMENT 'ID Clase',
  PRIMARY KEY (`PR_ID`),
  KEY `fk_TV_PREGUNTA_REALIZADA_TV_PREGUNTA_MAESTRA1_idx` (`PM_ID`),
  KEY `fk_TV_PREGUNTA_REALIZADA_TV_CLASE1_idx` (`CLA_ID`),
  CONSTRAINT `fk_TV_PREGUNTA_REALIZADA_TV_CLASE1` FOREIGN KEY (`CLA_ID`) REFERENCES `tv_clase` (`CLA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TV_PREGUNTA_REALIZADA_TV_PREGUNTA_MAESTRA1` FOREIGN KEY (`PM_ID`) REFERENCES `tv_pregunta_maestra` (`PM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Preguntas realizadas en una clase. Creadas en CU Realizar pregunta.\nPrefijo: PR';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_pregunta_realizada`
--

LOCK TABLES `tv_pregunta_realizada` WRITE;
/*!40000 ALTER TABLE `tv_pregunta_realizada` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_pregunta_realizada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_pregunta_respondida`
--

DROP TABLE IF EXISTS `tv_pregunta_respondida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_pregunta_respondida` (
  `PRES_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID Correlativo automático',
  `PR_ID` int(11) NOT NULL COMMENT 'ID de la pregunta realizada a la que se responde',
  `EST_ID` int(11) NOT NULL COMMENT 'Estudiante que responde',
  `RES_ID` int(11) DEFAULT NULL COMMENT 'Id de la respuesta seleccionada.\nPuede ser nulo para preguntas tipo Likert',
  `PRES_LIKERT` varchar(1) DEFAULT NULL COMMENT 'Respuesta para una pregunta tipo Likert. Valores posibles:\n1: Muy en desacuerdo\n2: …',
  PRIMARY KEY (`PRES_ID`),
  KEY `fk_TV_PREGUNTA_RESPONDIDA_TV_PREGUNTA_REALIZADA1_idx` (`PR_ID`),
  KEY `fk_TV_PREGUNTA_RESPONDIDA_TV_ESTUDIANTE1_idx` (`EST_ID`),
  KEY `fk_TV_PREGUNTA_RESPONDIDA_TV_RESPUESTAS1_idx` (`RES_ID`),
  CONSTRAINT `fk_TV_PREGUNTA_RESPONDIDA_TV_ESTUDIANTE1` FOREIGN KEY (`EST_ID`) REFERENCES `tv_estudiante` (`EST_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TV_PREGUNTA_RESPONDIDA_TV_PREGUNTA_REALIZADA1` FOREIGN KEY (`PR_ID`) REFERENCES `tv_pregunta_realizada` (`PR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_TV_PREGUNTA_RESPONDIDA_TV_RESPUESTAS1` FOREIGN KEY (`RES_ID`) REFERENCES `tv_respuestas` (`RES_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Respuestas dadas por los estudiantes.\nPrefijo: PRES';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_pregunta_respondida`
--

LOCK TABLES `tv_pregunta_respondida` WRITE;
/*!40000 ALTER TABLE `tv_pregunta_respondida` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_pregunta_respondida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tv_respuestas`
--

DROP TABLE IF EXISTS `tv_respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tv_respuestas` (
  `RES_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RES_TEXTO` varchar(2000) NOT NULL,
  `PM_ID` int(11) NOT NULL COMMENT 'ID de la Pregunta Maestra\n',
  `PM_CORRECTA` varchar(45) NOT NULL COMMENT 'Indica si la respuesta es correcta. Valores posibles:\n1: Correcta.\n0: Incorrecta.\n',
  PRIMARY KEY (`RES_ID`),
  KEY `fk_Alternativa_PreguntaMaestra_idx` (`PM_ID`),
  CONSTRAINT `fk_Alternativa_PreguntaMaestra` FOREIGN KEY (`PM_ID`) REFERENCES `tv_pregunta_maestra` (`PM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Respuestas posibles para una Pregunta Maestra. Prefijo: RES';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tv_respuestas`
--

LOCK TABLES `tv_respuestas` WRITE;
/*!40000 ALTER TABLE `tv_respuestas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tv_respuestas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-17 16:50:21
