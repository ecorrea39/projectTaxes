import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import GeneralContext from "../../store/general-context";

const listaOficinas = () => {
  const array = [
    { "id": "1", "name": "Registro Civil" },
    { "id": "2", "name": "Registro Inmobiliario del Primer Cto. Mupio. Libertador" },
    { "id": "3", "name": "Registro Inmobiliario del Segundo Cto. Mupio. Libertdor" },
    { "id": "4", "name": "Registro Inmobiliario del Tercer Cto. Mupio. Libertador" },
    { "id": "5", "name": "Registro Inmobiliario del Cuarto Cto. Mupio. Libertador" },
    { "id": "6", "name": "Registro Inmobiliario del Quinto Cto. Mupio. Libertador" },
    { "id": "7", "name": "Registro Inmobiliario del Sexto Cto. Mupio. Libertador" },
    { "id": "8", "name": "Registro Mercantil  Primero" },
    { "id": "9", "name": "Registro Mercantil Segundo" },
    { "id": "10", "name": "Registro Mercantil Tercero" },
    { "id": "11", "name": "Registro Mercantil Cuarto" },
    { "id": "12", "name": "Registro Mercantil Quinto" },
    { "id": "13", "name": "Registro Mercantil Séptimo" },
    { "id": "14", "name": "Registro Inmobiliario " },
    { "id": "15", "name": "Registro Civil" },
    { "id": "16", "name": "Registro Inmobiliario del Distrito Anaco" },
    { "id": "17", "name": "Registro Inmobiliario del Distrito Aragua" },
    { "id": "18", "name": "Registro Inmobiliario del Mcpio.  Simón Bolívar" },
    { "id": "19", "name": "Registro Inmobiliario del Distrito Bruzual" },
    { "id": "20", "name": "Registro Inmobiliario del Mcpio. Turístico Diego Bautista Urbaneja" },
    { "id": "21", "name": "Registro Inmobiliario del Municipio Juan Manuel Cagigal" },
    { "id": "22", "name": "Registro Inmobiliario del Distrito Freites" },
    { "id": "23", "name": "Registro Inmobiliario del Distrito Guanipa" },
    { "id": "24", "name": "Registro Inmobiliario del Distrito Independencia" },
    { "id": "25", "name": "Registro Inmobiliario del Distrito Libertad" },
    { "id": "26", "name": "Registro Inmobiliario del Distrito Miranda" },
    { "id": "27", "name": "Registro Inmobiliario del Distrito Monagas" },
    { "id": "28", "name": "Registro Inmobiliario del Municipio Autónomo Fernando Peñalver" },
    { "id": "29", "name": "Registro Inmobiliario de los Municipios Píritu y San Juan de Capistrano" },
    { "id": "30", "name": "Registro Inmobiliario del Distrito Simón Rodríguez" },
    { "id": "31", "name": "Registro Inmobiliario del Distrito Esteller" },
    { "id": "32", "name": "Registro Inmobiliario del Distrito Sotillo" },
    { "id": "33", "name": "Registro Mercantil Primero" },
    { "id": "34", "name": "Registro Mercantil Segundo" },
    { "id": "35", "name": "Registro Mercantil Tercero" },
    { "id": "36", "name": "Registro Civil" },
    { "id": "37", "name": "Registro Inmobiliario del Distrito Achaguas" },
    { "id": "38", "name": "Registro Inmobiliario del Distrito Muñoz" },
    { "id": "39", "name": "Registro Inmobiliario del Distrito Páez" },
    { "id": "40", "name": "Registro Inmobiliario del Distrito Pedro Camejo" },
    { "id": "41", "name": "Registro Inmobiliario del Distrito Rómulo Gallegos" },
    { "id": "42", "name": "Registro Inmobiliario del Distrito San Fernando" },
    { "id": "43", "name": "Registro Mercantil " },
    { "id": "44", "name": "Registro Civil" },
    { "id": "45", "name": "Registro Inmobiliario de Los Municipios Mariño, Libertador y Linares Alcantara" },
    { "id": "46", "name": "Registro Inmobiliario del Distrito Ricaurte" },
    { "id": "47", "name": "Registro Inmobiliario del Distrito San Casimiro" },
    { "id": "48", "name": "Registro Inmobiliario del Distrito San Sebastián" },
    { "id": "49", "name": "Registro Inmobiliario de Mcpios. Sucre y Lamas" },
    { "id": "50", "name": "Registro Inmobiliario de los  Municipios Urdaneta y Camatagua" },
    { "id": "51", "name": "Registro Inmobiliario del Distrito Zamora" },
    { "id": "52", "name": "Registro Inmobiliario del Primer Circuito del Mcpio." },
    { "id": "53", "name": "Mcpios.  Girardot, Mario Briceño Iragorri y Costa de Oro" },
    { "id": "54", "name": "Registro Mercantil Primero" },
    { "id": "55", "name": "Registro Mercantil Segundo" },
    { "id": "56", "name": "Registro Civil" },
    { "id": "57", "name": "Registro Inmobiliario del Distrito Alberto Arvelo Torrealba" },
    { "id": "58", "name": "Registro Inmobiliario del Distrito Arismendi" },
    { "id": "59", "name": "Registro Inmobiliario del Distrito Barinas" },
    { "id": "60", "name": "Registro Inmobiliario del Distrito Bolívar" },
    { "id": "61", "name": "Registro Inmobiliario de los Municipios Ezequiel Zamora y Andrés Eloy Blanco" },
    { "id": "62", "name": "Registro Inmobiliario de los Mcpios. Obispos y Cruz Paredes" },
    { "id": "63", "name": "Registro Inmobiliario de los Mcpios. Pedraza y Sucre" },
    { "id": "64", "name": "Registro Inmobiliario del Distrito Rojas" },
    { "id": "65", "name": "Registro Inmobiliario del Sosa" },
    { "id": "66", "name": "Registro Mercantil Primero" },
    { "id": "67", "name": "Registro Mercantil Segundo" },
    { "id": "68", "name": "Registro Civil" },
    { "id": "69", "name": "Registro Inmobiliario del Distrito Caroní" },
    { "id": "70", "name": "Registro Inmobiliario del Distrito Cedeño" },
    { "id": "71", "name": "Registro Inmobiliario del Distrito Heres" },
    { "id": "72", "name": "Registro Inmobiliario del Distrito Piar" },
    { "id": "73", "name": "Registro Inmobiliario del Distrito Roscio" },
    { "id": "74", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "75", "name": "Registro Mercantil Primero       " },
    { "id": "76", "name": "Registro Mercantil Segundo " },
    { "id": "77", "name": "Registro Civil" },
    { "id": "78", "name": "Registro Inmobiliario del Distrito Bejuma" },
    { "id": "79", "name": "Registro Inmobiliario del Distrito Carlos Arvelo" },
    { "id": "80", "name": "Registro Inmobiliario de los Mcpios.  Guacara, SanJoaquín y Diego Ibarra" },
    { "id": "81", "name": "Registro Inmobiliario del Distrito Montalbán" },
    { "id": "82", "name": "Registro Inmobiliario del Distrito Puerto Cabello" },
    { "id": "83", "name": "Registro Inmobiliario de los Mcpios.  Autónomos Naguanagua y San Diego" },
    { "id": "84", "name": "Registro Inmobiliario del Primer  Circuito Mupio. Valencia" },
    { "id": "85", "name": "Registro Inmobiliario del Segundo Circuito Mupio. Valencia" },
    { "id": "86", "name": "Registro Mercantil Primero" },
    { "id": "87", "name": "Registro Mercantil Segundo" },
    { "id": "88", "name": "Registro Mercantil Tercero" },
    { "id": "89", "name": "Registro Civil" },
    { "id": "90", "name": "Registro Inmobiliario del Distrito Anzoátegui" },
    { "id": "91", "name": "Registro Inmobiliario del Disrtrito Falcón" },
    { "id": "92", "name": "Registro Inmobiliario del  Distrito Girardot" },
    { "id": "93", "name": "Registro Inmobiliario del  Distrito Pao" },
    { "id": "94", "name": "Registro Inmobiliario del Distrito Ricaurte" },
    { "id": "95", "name": "Registro Inmobiliario del Distrito San Carlos" },
    { "id": "96", "name": "Registro Inmobiliario del DistritoTinaco" },
    { "id": "97", "name": "Registro Mercantil" },
    { "id": "98", "name": "Registro Inmobiliario" },
    { "id": "99", "name": "Registro Mercantil" },
    { "id": "100", "name": "Registro Civil" },
    { "id": "101", "name": "Registro Inmobiliario del Distrito Acosta" },
    { "id": "102", "name": "Registro Inmobiliario del  Distrito   Bolívar" },
    { "id": "103", "name": "Registro Inmobiliario de los Mcpios. Buchivacoa y Dabajuro" },
    { "id": "104", "name": "Registro Inmobiliario del Distrito Carirubana" },
    { "id": "105", "name": "Registro Inmobilairio del Distrito Colina" },
    { "id": "106", "name": "Registro Inmobiliario del Distrito Democracia" },
    { "id": "107", "name": "Registro Inmobiliario de los Mcpios.  Falcón y los Taques" },
    { "id": "108", "name": "Registro Inmobiliario del Distrito Federación" },
    { "id": "109", "name": "Registro Inmobiliario del Distrito  Mauroa" },
    { "id": "110", "name": "Registro Inmobiliario del Distrito Miranda" },
    { "id": "111", "name": "Registro Inmobiliario del Distrito Petit" },
    { "id": "112", "name": "Registro Inmobiliario de los Mcpios. Lorenzo Silva Monseñor Iturriza y Palmazola" },
    { "id": "113", "name": "Registro Inmobiliario del Distrito Zamora" },
    { "id": "114", "name": "Registro Mercantil Primero" },
    { "id": "115", "name": "Registro Mercantil Segundo" },
    { "id": "116", "name": "Registro Civil" },
    { "id": "117", "name": "Registro Inmobiliario del Distrito Infante" },
    { "id": "118", "name": "Registro Inmobiliario del  Mcpio. Autónomo Julián Mellado" },
    { "id": "119", "name": "Registro Inmobiliario del Distrito Miranda" },
    { "id": "120", "name": "Registro Inmobiliario de los Mcpios.  Monagas y San José de Guaribe" },
    { "id": "121", "name": "Registro Inmobiliario del Distrito Ribas" },
    { "id": "122", "name": "Registro Inmobiliario de los Mcpios  Roscio y Ortiz" },
    { "id": "123", "name": "Registro Inmobiliario del Distrito Zaraza" },
    { "id": "124", "name": "Registro Mercantil   Primero" },
    { "id": "125", "name": "Registro Mercantil Segundo" },
    { "id": "126", "name": "Registro Mercantil Tercero" },
    { "id": "127", "name": "Registro Civil" },
    { "id": "128", "name": "Registro Inmobiliario del Distrito Crespo" },
    { "id": "129", "name": "Registro Inmobiliario del Distrito  Jiménez" },
    { "id": "130", "name": "Registro Inmobiliario del Distrito Morán" },
    { "id": "131", "name": "Registro Inmobiliario del Distrito Palavecino" },
    { "id": "132", "name": "Registro Inmobiliario del Distrito Torres" },
    { "id": "133", "name": "Registro Inmobiliario del Distrito Urdaneta" },
    { "id": "134", "name": "Registro Inmobiliario del Primer Cto. Dtto. Iribarren" },
    { "id": "135", "name": "Registro Inmobiliario del Segundo Cto. Dtto. Iribarren" },
    { "id": "136", "name": "Registro Mercantil Primero" },
    { "id": "137", "name": "Registro Mercantil Segundo" },
    { "id": "138", "name": "Registro Civil" },
    { "id": "139", "name": "Registro Inmobiliario del Dtto. Alberto Adriani" },
    { "id": "140", "name": "Registro Inmobiliario del  Dtto. Andrés Bello" },
    { "id": "141", "name": "Registro Inmobiliario del  Dtto. Antonio Pinto Salinas" },
    { "id": "142", "name": "Registro Inmobiliario del Dtto. Arzobispo Chacón" },
    { "id": "143", "name": "Registro Inmobiliario del Dtto. Campo Elías" },
    { "id": "144", "name": "Registro Inmobiliario del Dtto. Justo Briceño" },
    { "id": "145", "name": "Registro Inmobiliario del Dtto. Libertador" },
    { "id": "146", "name": "Registro Inmobiliario del Distrito Miranda" },
    { "id": "147", "name": "Registro Inmobiliario del Distrito Rangel" },
    { "id": "148", "name": "Registro Inmobiliario del Dtto. Rivas Dávila" },
    { "id": "149", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "150", "name": "Registro Inmobiliario del Distrito Tovar" },
    { "id": "151", "name": "Registro Mercantil Primero" },
    { "id": "152", "name": "Registro Mercantil Segundo" },
    { "id": "153", "name": "Registro Civil" },
    { "id": "154", "name": "Registro Inmobiliario del Distrito Acevedo" },
    { "id": "155", "name": "Registro Inmobiliario de los Municipios Brión y Buroz" },
    { "id": "156", "name": "Registro Inmobiliario del Dtto. Guaicaipuro" },
    { "id": "157", "name": "Registro Inmobiliario del Dtto. Independencia" },
    { "id": "158", "name": "Registro Inmobiliario de los Mcpios. Tomás  Lander, Simón Bolívar y La Democracia" },
    { "id": "159", "name": "Registro Inmobiliario del Dtto. Los Salias" },
    { "id": "160", "name": "Registro Inmobiliario de los Mcpios.  Páez,Andrés Bello y Pedro Gual" },
    { "id": "161", "name": "Registro Inmobiliario del Dtto. Paz Castillo" },
    { "id": "162", "name": "Registro Inmobiliario del Municpio Autónomo Plaza" },
    { "id": "163", "name": "Registro Inmobiliario de los Mupios. Urdaneta y Cristóbal Rojas" },
    { "id": "164", "name": "Registro Inmobiliario del Distrito Zamora" },
    { "id": "165", "name": "Registro Inmobiliario del Primer Circuito Mupio. Sucre" },
    { "id": "166", "name": "Registro Inmobiliario del Segundo Circuito Mupio. Sucre" },
    { "id": "167", "name": "Registro Inmobiliario del Municipio Chacao" },
    { "id": "168", "name": "Registro Inmobiliario del Primer Circuito Mupio. Baruta" },
    { "id": "169", "name": "Registro Inmobiliario del Segundo Circuito Mupio. Baruta" },
    { "id": "170", "name": "Registro Inmobiliario del Mupio. El Hatillo" },
    { "id": "171", "name": "Registro Civil" },
    { "id": "172", "name": "Registro Inmobiliario del Distrito Acosta" },
    { "id": "173", "name": "Registro Inmobiliario del Distrito Bolívar" },
    { "id": "174", "name": "Registro Inmobiliario del Distrito Caripe" },
    { "id": "175", "name": "Registro Inmobiliario del Distrito Cedeño" },
    { "id": "176", "name": "Registro Inmobiliario del Primer Circuito del Mupio. Maturín" },
    { "id": "177", "name": "Registro Inmobiliario del Segundo Circuito del Mupio. Maturín" },
    { "id": "178", "name": "Registro Inmobiliario del Distrito Piar" },
    { "id": "179", "name": "Registro Inmobiliario del Distrito Sotillo" },
    { "id": "180", "name": "Registro Inmobiliario del Mupio. Autónomo EzequielZamora" },
    { "id": "181", "name": "Registro Mercantil" },
    { "id": "182", "name": "Registro Civil" },
    { "id": "183", "name": "Registro Inmobiliario de los Mcpios. Arismendi y Antolín del Campo" },
    { "id": "184", "name": "Registro Inmobiliario del Distrito Díaz" },
    { "id": "185", "name": "Registro Inmobiliario del Distrito Gómez" },
    { "id": "186", "name": "Registro Inmobiliario del Distrito Maneiro" },
    { "id": "187", "name": "Registro Inmobiliario del Distrito Marcano" },
    { "id": "188", "name": "Registro Inmobiliario del Distrito Mariño" },
    { "id": "189", "name": "Registro Mercantil Primero" },
    { "id": "190", "name": "Registro Mercantil Segundo" },
    { "id": "191", "name": "Registro Civil" },
    { "id": "192", "name": "Registro Inmobiliario de los Municipios Araure, Agua Blanca y San Rafael de Onoto" },
    { "id": "193", "name": "Registro Inmobiliario del Distrito Guanare" },
    { "id": "194", "name": "Registro Inmobiliario del Distrito Guanarito" },
    { "id": "195", "name": "Registro Inmobiliario del Distrito Ospino" },
    { "id": "196", "name": "Registro Inmobiliario del Distrito Páez" },
    { "id": "197", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "198", "name": "Registro Inmobiliario del Distrito Turén" },
    { "id": "199", "name": "Registro Mercantil Primero" },
    { "id": "200", "name": "Registro Mercantil Segundo" },
    { "id": "201", "name": "Registro Civil" },
    { "id": "202", "name": "Registro Inmobiliario del Distrito Arismendi" },
    { "id": "203", "name": "Registro Inmobiliario del Benítez" },
    { "id": "204", "name": "Registro Inmobiliario del Distrito Bermúdez" },
    { "id": "205", "name": "Registro Inmobiliario del Distrito Cajigal     " },
    { "id": "206", "name": "Registro Inmobiliario  del Distrito Mariño" },
    { "id": "207", "name": "Registro Inmobiliario  del Distrito Mejía" },
    { "id": "208", "name": "Registro Inmobiliario del  Distrito Montes" },
    { "id": "209", "name": "Registro Inmobiliario del Distrito Ribero" },
    { "id": "210", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "211", "name": "Registro Inmobiliario del Distrito Valdez" },
    { "id": "212", "name": "Registro Mercantil Primero" },
    { "id": "213", "name": "Registro Civil" },
    { "id": "214", "name": "Registro Inmobiliario del Distrito Ayacucho" },
    { "id": "215", "name": "Registro Inmobiliario del Distrito Bolívar" },
    { "id": "216", "name": "Registro Inmobiliario del Capacho" },
    { "id": "217", "name": "Registro Inmobiliario de los Mcpios.  Cárdenas, Guásimos y Andrés Bello" },
    { "id": "218", "name": "Registro Inmobiliario del Distrito Córdoba" },
    { "id": "219", "name": "Registro Inmobiliario del Distrito García de Hevia" },
    { "id": "220", "name": "Registro Inmobiliario de los  Mcpios. Jáuregui, Seboruco, Antonio Rómulo Costa, José María Vargas y Francisco de Miranda" },
    { "id": "221", "name": "Registro Inmobiliario de los Mcpios,  Junín y RafaelUrdaneta" },
    { "id": "222", "name": "Registro Inmobiliario del Distrito Libertador" },
    { "id": "223", "name": "Registro Inmobiliario del Distrito Lobatera " },
    { "id": "224", "name": "Registro Inmobiliario del Michelena" },
    { "id": "225", "name": "Registro Inmobiliario del Distrito Baralt" },
    { "id": "226", "name": "Registro Inmobiliario de los Mcpios. Panamericano Samuel Darío Maldonado, Simón Rodríguez y San Judas Tadeo" },
    { "id": "227", "name": "Registro Inmobiliario del Distrito Pedro María Ureña" },
    { "id": "228", "name": "Registro Inmobiliario del Primer Cto. Mupio. San Cristóbal " },
    { "id": "229", "name": "Registro Inmobiliario del  Segundo Cto. Mupio. San Cristóbal" },
    { "id": "230", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "231", "name": "Registro Inmobiliario del Distrito Uribante" },
    { "id": "232", "name": "Registro Mercantil Primero" },
    { "id": "233", "name": "Registro Mercantil Segundo" },
    { "id": "234", "name": "Registro Mercantil Tercero" },
    { "id": "235", "name": "Registro Civil" },
    { "id": "236", "name": "Registro Inmobiliario del Distrito Boconó" },
    { "id": "237", "name": "Registro Inmobiliario del Distrito Carache" },
    { "id": "238", "name": "Registro Inmobiliario de Los Municipios Escuque y Monte Carmelo" },
    { "id": "239", "name": "Registro Inmobiliario del Distrito Rafael Rangel" },
    { "id": "240", "name": "Registro Inmobiliario de los Mcpios.  Trujillo, Pampán y Pampanito" },
    { "id": "241", "name": "Registro Inmobiliario del Distrito Urdaneta" },
    { "id": "242", "name": "Registro Inmobiliario de los Mcpios. Valera, Motatán y San Rafael de Carvajal" },
    { "id": "243", "name": "Registro Mercantil Primero" },
    { "id": "244", "name": "Registro Inmobiliario del Primer Circuito " },
    { "id": "245", "name": "Registro Inmobiliario del Segundo Circuito" },
    { "id": "246", "name": "Registro Mercantil" },
    { "id": "247", "name": "Registro Civil" },
    { "id": "248", "name": "Registro Inmobiliario del Distrito Bolívar" },
    { "id": "249", "name": "Registro Inmobiliario del Distrito Bruzual" },
    { "id": "250", "name": "Registro Inmobiliario del Distrito Nirgua" },
    { "id": "251", "name": "Registro Inmobiliario del Primer Circuito de los Mcpios.  San Felipe, Independencia, Cocorote y Veróes" },
    { "id": "252", "name": "Registro Inmobiliario de los Mcpios. Sucre, La Trinidad y Arístides Bastidas" },
    { "id": "253", "name": "Registro Inmobiliario del Distrito Urachiche" },
    { "id": "254", "name": "Registro Inmobiliario del Distrito Yaritagua" },
    { "id": "255", "name": "Registro Mercantil" },
    { "id": "256", "name": "Registro Civil" },
    { "id": "257", "name": "Registro Inmobiliario de los Mcpios.  Santa Rita, Cabimas y Simón Bolívar" },
    { "id": "258", "name": "Registro Inmobiliario de los Mcpios. Colón,  Catatumbo Jesús María Semprún y Francisco Javier Pulgar" },
    { "id": "259", "name": "Registro Inmobiliario de los Mcpios. Lagunillas y Valmore Rodríguez" },
    { "id": "260", "name": "Registro Inmobiliario de los Mcpios. Mara  e Insular Almirante Padilla" },
    { "id": "261", "name": "Registro Inmobiliario del Distrito Miranda" },
    { "id": "262", "name": "Registro Inmobiliario del Distrito Páez" },
    { "id": "263", "name": "Registro Inmobiliario del Distrito Perijá" },
    { "id": "264", "name": "Registro Inmobiliario del Municipio Jesús Enrique Lossada" },
    { "id": "265", "name": "Registro Inmobiliario del Distrito Sucre" },
    { "id": "266", "name": "Registro Inmobiliario del Urdaneta" },
    { "id": "267", "name": "Registro Inmobiliario del Primer Cto. Maracaibo" },
    { "id": "268", "name": "Registro Inmobiliario   del  Segundo Cto.    Distrito Maracaibo" },
    { "id": "269", "name": "Registro Inmobiliario del Tercer Cto. Distrito Maracaibo" },
    { "id": "270", "name": "Registro Inmobiliario del Municipio San Francisco" },
    { "id": "271", "name": "Registro Mercantil Primero" },
    { "id": "272", "name": "Registro Mercantil Segundo" },
    { "id": "273", "name": "Registro Mercantil Tercero" },
    { "id": "274", "name": "Registro Mercantil Cuarto" },
    { "id": "275", "name": "Registro Mercantil Quinto" }
  ];
  return array;
};

const textLabelColor = {
  'color': '#5A5EFF',
};

const UserDatosFormStep2 = (props) => {

  const [loading, setLoading] = useState(false);

  const generalCtx = useContext(GeneralContext);

  const [initialValues, setInitialValues] = useState({
    oficina: "",
    numero_de_documento: "",
    numero_de_tomo: "",
    numero_de_folio: "",
    numero_de_protocolo: "",
    fecha_constitucion: ""
  });

  const oficinaRef = useRef();

  const [siguiente, setSiguiente] = useState(false);

  const intl = useIntl();

  const oficinas = listaOficinas();

  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const token = localStorage.getItem('authToken');
  const rif = localStorage.getItem('rif');

  const getFechaFutura = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();
    return year + '-' + month + '-' + day;
  }

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    console.log("registradoValor::", props.registradoValor);

    axios.get(`${API_URL}user_mercantil_data/fondoporid/${generalCtx.theIdUserInformacionProfile}/`, axiosConfig)
      .then(function (res) {
        console.log("get_user_company::", res);

        if (res.data.data != null) {

          let initialValuesJson = {
            "oficina": res.data.data.attributes.oficina != null ? res.data.data.attributes.oficina : "",
            "numero_de_documento": res.data.data.attributes.numero_de_documento != null ? res.data.data.attributes.numero_de_documento : "",
            "numero_de_tomo": res.data.data.attributes.numero_de_tomo != null ? res.data.data.attributes.numero_de_tomo : "",
            "numero_de_folio": res.data.data.attributes.numero_de_folio != null ? res.data.data.attributes.numero_de_folio : "",
            "numero_de_protocolo": res.data.data.attributes.numero_de_protocolo != null ? res.data.data.attributes.numero_de_protocolo : "",
            "fecha_constitucion": res.data.data.attributes.fecha_constitucion != null ? res.data.data.attributes.fecha_constitucion.substring(0, 10) : ""
          };

          setInitialValues(initialValuesJson);
        } else {
          alert("No existe información alguna registrada del usuario");
        }

        disableLoading();
      }).catch((err) => {

      console.log("errGetUserCompany", err);
      alert("Error buscando datos mercantiles de la empresa del usuario")
      disableLoading();

    });

  }, []);

  const irAnterior = () => {
    props.cambiarFormularioActual(1);
  }

  const submitSiguiente = () => {
    setSiguiente(true);
    formik.submitForm();
  }

  const LoginSchema = Yup.object().shape({

    oficina: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    numero_de_documento: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Documento'})
      ),
    numero_de_tomo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Tomo'})
      ),
    numero_de_folio: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Folio'})
      ),
    numero_de_protocolo: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .test('len',
        intl.formatMessage({
          id: "AUTH.VALIDATION.RANGELEN",
        }, {min: 1, max: 9})
        , val => !val || (val && (val.toString().length >= 1 && val.toString().length <= 9)))
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Número de Protocolo'})
      ),
    fecha_constitucion: Yup.string()
      .required(
        intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED",
          },
          {name: 'Fecha de Constitución'})
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);

      const rif = localStorage.getItem('rif');

      console.log("rif", rif);
      console.log("authToken", token);

      let jsonAttributes = formik.values;

      jsonAttributes["user_information_id"] = generalCtx.theIdUserInformacionProfile;

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "userMercantilData",
          id: rif,
          attributes: jsonAttributes
        }
      };

      axios.post(`${API_URL}user_mercantil_data/`, data, axiosConfig)
        .then(function (res) {

          const oficinaC = oficinaRef.current.options[oficinaRef.current.selectedIndex].text;

          props.cambiarResumenFicha({
            oficina: oficinaC,
            numero_de_documento: formik.values.numero_de_documento,
            numero_de_tomo: formik.values.numero_de_tomo,
            numero_de_folio: formik.values.numero_de_folio,
            numero_de_protocolo: formik.values.numero_de_protocolo,
            fecha_constitucion: formik.values.fecha_constitucion
          });

          setSubmitting(false);
          disableLoading();

          console.log("resFormStep2", res);

          if (siguiente) {
            setSiguiente(false);
            props.cambiarFormularioActual(3);
          }
        }).catch((err) => {

        console.log("errUserDatosFormStep2", err);
        setSubmitting(false);
        disableLoading();

        alert("Error al guardar los Datos Mercantiles");
      });
    },
  });

  return(
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Datos Mercantiles
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="oficina">
                    <Form.Label style={textLabelColor}>Oficina</Form.Label>
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.oficina}
                                  ref={oficinaRef}
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    >
                      <option key="0" value="">Seleccione la Oficina</option>

                      {oficinas.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.oficina && formik.errors.oficina ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.oficina}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_documento">
                    <Form.Label style={textLabelColor}>Número de Documento</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Documento"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_documento}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_documento && formik.errors.numero_de_documento ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_documento}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_tomo">
                    <Form.Label style={textLabelColor}>Número de Tomo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Tomo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_tomo}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_tomo && formik.errors.numero_de_tomo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_tomo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_folio">
                    <Form.Label style={textLabelColor}>Número de Folio</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número Del Folio"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_folio}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_folio && formik.errors.numero_de_folio ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_folio}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="numero_de_protocolo">
                    <Form.Label style={textLabelColor}>Número de Protocolo</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Número De Protocolo"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.numero_de_protocolo}
                                  maxLength="20"
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                    />

                    {formik.touched.numero_de_protocolo && formik.errors.numero_de_protocolo ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.numero_de_protocolo}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="fecha_constitucion">
                    <Form.Label style={textLabelColor}>Fecha de Constitución</Form.Label>
                    <Form.Control size="lg" type="date" required
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fecha_constitucion}
                                  disabled={props.registradoValor && !props.actaEdicion ? "disabled" : ""}
                                  max={new Date().toISOString().split("T")[0]}
                    />

                    {formik.touched.fecha_constitucion && formik.errors.fecha_constitucion ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.fecha_constitucion}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br />

              <Row>
                {/*<Col md={4}>*/}
                {/*  <Button variant="success" size="lg" block*/}
                {/*          type="submit"*/}
                {/*          disabled={*/}
                {/*            formik.isSubmitting ||*/}
                {/*            !formik.isValid*/}
                {/*          }*/}
                {/*  >*/}
                {/*    Guardar*/}
                {/*  </Button>*/}
                {/*</Col>*/}
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={irAnterior}
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                          onClick={submitSiguiente}
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
                  >
                    Siguiente
                  </Button>
                </Col>
              </Row>
            </Container>
          </form>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default UserDatosFormStep2;