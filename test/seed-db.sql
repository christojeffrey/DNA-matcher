-- MariaDB dump 10.19  Distrib 10.4.22-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: stima3
-- ------------------------------------------------------
-- Server version	10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hasil_prediksi`
--

DROP TABLE IF EXISTS `hasil_prediksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hasil_prediksi` (
  `idPrediksi` int(11) NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `nama_pasien` varchar(255) NOT NULL,
  `penyakit_prediksi` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `kesamaan` int(11) NOT NULL,
  PRIMARY KEY (`idPrediksi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hasil_prediksi`
--

LOCK TABLES `hasil_prediksi` WRITE;
/*!40000 ALTER TABLE `hasil_prediksi` DISABLE KEYS */;
/*!40000 ALTER TABLE `hasil_prediksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penyakit`
--

DROP TABLE IF EXISTS `penyakit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penyakit` (
  `idPenyakit` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `rantai` varchar(255) NOT NULL,
  PRIMARY KEY (`idPenyakit`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penyakit`
--

LOCK TABLES `penyakit` WRITE;
/*!40000 ALTER TABLE `penyakit` DISABLE KEYS */;
INSERT INTO `penyakit` VALUES (1,'HIV','TAAGGTA'),(2,'Alzheimer\'s','GCTCT'),(3,'Parkinson\'s','GGTCAG'),(4,'AIDS','GCTCTA'),(5,'batuk','GTCAGAT'),(6,'diare','GCTCTA'),(7,'gagal makan','TACAGAT'),(8,'gagal tidur','GCTAGTAGA'),(9,'kurang bahagia','GCACTA'),(10,'IQ jongkok','CACAT'),(11,'terjebak dalam rat race perkuliahan','TATAG'),(12,'sindrom tubes','ACTGATACT');
/*!40000 ALTER TABLE `penyakit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-29 16:35:14
