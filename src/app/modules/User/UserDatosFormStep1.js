import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

const listaClaseEmpresa = () => {

  const array = [
    {"id": "1", "name": "S.A."},
    {"id": "2", "name": "S.R.L."},
    {"id": "3", "name": "S.A.I.C.A."},
    {"id": "4", "name": "C.A."},
    {"id": "5", "name": "S.A.C.A."},
    {"id": "6", "name": "CRL"},
    {"id": "7", "name": "Firma Personal"},
    {"id": "8", "name": "Sociedad Civil"},
    {"id": "9", "name": "Sociedad en Comandita"},
    {"id": "10", "name": "Persona Natural"},
    {"id": "11", "name": "Cooperativas"},
    {"id": "12", "name": "Sociedad en Nombre Colectivo"},
    {"id": "13", "name": "Subsidiaria"},
    {"id": "14", "name": "Empresa Extranjera con Sucursal en Venezuela"},
    {"id": "15", "name": "Gobierno"},
    {"id": "16", "name": "Sociedad en Comandita por Acciones"},
    {"id": "17", "name": "Empresa sin Domicilio en Venezuela"},
    {"id": "18", "name": "ETT"},
    {"id": "19", "name": "Sucesión"},
    {"id": "20", "name": "Empresa de Propiedad Social Directa Comunal"},
    {"id": "21", "name": "Empresa de Propiedad Social InDirecta Comunal"},
    {"id": "22", "name": "Unidad Productiva Familiar"},
    {"id": "23", "name": "Grupo de Intercambio Solidario (Trueque)"},
    {"id": "24", "name": "Empresas Conjuntas"},
    {"id": "25", "name": "Alianzas Estrategicas"},
    {"id": "26", "name": "Conglomerados"},
    {"id": "27", "name": "Empresa Extranjera con Capital Nacional"}
  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const listaEstatus = () => {
  const array = [
    {"id": "1", "name": "Activa"},
    {"id": "2", "name": "Cesante temporal"},
    {"id": "3", "name": "Cesante permanente"},
    {"id": "4", "name": "Fusionada"},
    {"id": "5", "name": "Suspendida"},
    {"id": "6", "name": "Bloqueada"}
  ];
  return array.sort((a, b) => a.name < b.name ? -1 : +(a.name > b.name));
};

const listaActividad = () => {
  const array = [
    {"id": "1", "name": "1313 | Acabado de productos textiles", "code": "1313", "motor": "Industria"},
    {
      "id": "2",
      "name": "8211 | Actividades combinadas de servicios administrativos de oficina",
      "code": "8211",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "3",
      "name": "9000 | Actividades creativas, artísticas y de entretenimiento",
      "code": "9000",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {"id": "4", "name": "5510 | Actividades de alojamiento en hoteles", "code": "5510", "motor": "Turismo"},
    {"id": "5", "name": "0161 | Actividades de apoyo a la agricultura", "code": "0161", "motor": "Agroalimentario"},
    {
      "id": "6",
      "name": "8550 | Actividades de apoyo a la enseñanza",
      "code": "8550",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {"id": "7", "name": "0164 | Actividades de apoyo a la ganadería", "code": "0164", "motor": "Agroalimentario"},
    {
      "id": "8",
      "name": "0990 | Actividades de apoyo para la explotación de otras minas y canteras",
      "code": "0990",
      "motor": "Mineria"
    },
    {
      "id": "9",
      "name": "0910 | Actividades de apoyo para la extracción de petróleo y gas natural",
      "code": "0910",
      "motor": "Hidrocarburos"
    },
    {
      "id": "10",
      "name": "9411 | Actividades de asociaciones empresariales y de empleadores",
      "code": "9411",
      "motor": "Industria"
    },
    {
      "id": "11",
      "name": "9412 | Actividades de asociaciones profesionales",
      "code": "9412",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "12",
      "name": "9101 | Actividades de bibliotecas y archivos",
      "code": "9101",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "13",
      "name": "6920 | Actividades de contabilidad, teneduría de libros y auditoría consultoría fiscal",
      "code": "6920",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "14", "name": "8422 | Actividades de defensa", "code": "8422", "motor": "Industria Militar"},
    {
      "id": "15",
      "name": "3900 | Actividades de descontaminación y otros servicios de gestión de desechos",
      "code": "3900",
      "motor": "Industria"
    },
    {
      "id": "16",
      "name": "5913 | Actividades de distribución de películas, videos y programas de televisión",
      "code": "5913",
      "motor": "Telecomunicaciones e Informatica"
    },
    {"id": "17", "name": "8292 | Actividades de envasado y empaquetado", "code": "8292", "motor": "Industria"},
    {
      "id": "18",
      "name": "6630 | Actividades de gestión de fondos",
      "code": "6630",
      "motor": "Banca, Seguro y Finanzas"
    },
    {
      "id": "19",
      "name": "8411 | Actividades de la administración pública en general",
      "code": "8411",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "20",
      "name": "9102 | Actividades de museos y gestión de lugares y edificios históricos",
      "code": "9102",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {"id": "21", "name": "7912 | Actividades de operadores turísticos", "code": "7912", "motor": "Turismo"},
    {
      "id": "22",
      "name": "8423 | Actividades de orden público y seguridad y protección civil",
      "code": "8423",
      "motor": "Industria Militar"
    },
    {
      "id": "23",
      "name": "9900 | Actividades de organizaciones y órganos extraterritoriales",
      "code": "9900",
      "motor": "Nuevas Exportaciones para Generación de Divisas"
    },
    {
      "id": "24",
      "name": "9499 | Actividades de otras asociaciones n.c.p.",
      "code": "9499",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "25",
      "name": "9321 | Actividades de parques de atracciones y parques temáticos",
      "code": "9321",
      "motor": "Turismo"
    },
    {
      "id": "26",
      "name": "8430 | Actividades de planes de seguridad social de afiliación obligatoria",
      "code": "8430",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "27",
      "name": "5221 | Actividades de servicios vinculadas al transporte terrestre",
      "code": "5221",
      "motor": "Automotriz"
    },
    {
      "id": "28",
      "name": "6820 | Actividades inmobiliarias realizadas a cambio de una retribución o por contrata",
      "code": "6820",
      "motor": "Banca, Seguro y Finanzas"
    },
    {
      "id": "29",
      "name": "6810 | Actividades inmobiliarias realizadas con bienes propios o arrendados",
      "code": "6810",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "30", "name": "6910 | Actividades jurídicas", "code": "6910", "motor": "Banca, Seguro y Finanzas"},
    {"id": "31", "name": "0162 | Actividades posteriores a la cosecha", "code": "0162", "motor": "Agroalimentario"},
    {
      "id": "32",
      "name": "6010 | Actividades programación y difusión de radio",
      "code": "6010",
      "motor": "Telecomunicaciones e Informatica"
    },
    {"id": "33", "name": "5210 | Almacenamiento y depósito", "code": "5210", "motor": "Industria"},
    {"id": "34", "name": "1610 | Aserrado y acepilladura de madera (aserraderos)", "code": "1610", "motor": "Forestal"},
    {"id": "35", "name": "3600 | Captación, tratamiento y distribución de agua", "code": "3600", "motor": "Industria"},
    {
      "id": "36",
      "name": "1410 | Confección de prendas de vestir, excepto prendas de piel y cuero",
      "code": "1410",
      "motor": "Industria"
    },
    {"id": "37", "name": "3011 | Construcción de buques y estructuras flotantes", "code": "3011", "motor": "Industria"},
    {
      "id": "38",
      "name": "4210 | Construcción de carreteras, vías de ferrocarril, puentes y túneles",
      "code": "4210",
      "motor": "Construccion"
    },
    {
      "id": "39",
      "name": "4290 | Construcción de otras obras de ingeniería civil",
      "code": "4290",
      "motor": "Construccion"
    },
    {
      "id": "40",
      "name": "4220 | Construcción de proyectos de servicio público",
      "code": "4220",
      "motor": "Construccion"
    },
    {
      "id": "41",
      "name": "4100 | Construcción reforma y reparación de edificios residenciales",
      "code": "4100",
      "motor": "Construccion"
    },
    {"id": "42", "name": "0141 | Cría de ganado vacuno para leche", "code": "0141", "motor": "Agroalimentario"},
    {"id": "43", "name": "0144 | Cría de porcinos", "code": "0144", "motor": "Agroalimentario"},
    {
      "id": "44",
      "name": "0150 | Cultivo de prodoductos agrícolas en combinación con la cría de animales (unidad de producción agrícola mixta)",
      "code": "0150",
      "motor": "Agroalimentario"
    },
    {"id": "45", "name": "5811 | Edición de libros", "code": "5811", "motor": "Economía Comunal, Social y Socialista"},
    {
      "id": "46",
      "name": "8530 | Educación universitaria",
      "code": "8530",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "47",
      "name": "1080 | Elaboración de alimentos balanceados para animales",
      "code": "1080",
      "motor": "Agroalimentario"
    },
    {"id": "48", "name": "1072 | Elaboración de azúcar", "code": "1072", "motor": "Agroalimentario"},
    {
      "id": "49",
      "name": "1079 | Elaboración de otros productos alimenticios n.c.p.",
      "code": "1079",
      "motor": "Agroalimentario"
    },
    {"id": "50", "name": "1050 | Elaboración de productos lácteos", "code": "1050", "motor": "Agroalimentario"},
    {"id": "51", "name": "0899 | Explotación de otras minas y canteras n.c.p.", "code": "0899", "motor": "Mineria"},
    {"id": "52", "name": "0510 | Extracción de carbón de piedra", "code": "0510", "motor": "Mineria"},
    {
      "id": "53",
      "name": "0729 | Extracción de minerales metalíferos no ferrosos n.c.p.",
      "code": "0729",
      "motor": "Mineria"
    },
    {
      "id": "54",
      "name": "0891 | Extracción de minerales para la fabricación de abonos y productos químicos",
      "code": "0891",
      "motor": "Mineria"
    },
    {"id": "55", "name": "0810 | Extracción de piedra, arena y arcilla", "code": "0810", "motor": "Mineria"},
    {
      "id": "56",
      "name": "1040 | Fabricación de aceites y grasas comestibles de origen vegetal",
      "code": "1040",
      "motor": "Agroalimentario"
    },
    {"id": "57", "name": "3092 | Fabricación de bicicletas", "code": "3092", "motor": "Industria"},
    {"id": "58", "name": "2394 | Fabricación de cemento, cal y yeso", "code": "2394", "motor": "Industria"},
    {
      "id": "59",
      "name": "2620 | Fabricación de computadores y equipo periférico",
      "code": "2620",
      "motor": "Telecomunicaciones e Informatica"
    },
    {
      "id": "60",
      "name": "2630 | Fabricación de equipo de comunicaciones",
      "code": "2630",
      "motor": "Telecomunicaciones e Informatica"
    },
    {
      "id": "61",
      "name": "2392 | Fabricación de materiales de arcilla para la construcción",
      "code": "2392",
      "motor": "Industria"
    },
    {
      "id": "62",
      "name": "1030 | Fabricación de mermeladas, jaleas y frutas secas o en almíbar",
      "code": "1030",
      "motor": "Agroalimentario"
    },
    {
      "id": "63",
      "name": "2710 | Fabricación de motores, generadores y transformadores eléctricos y aparatos de distribución y control de la energía eléctrica",
      "code": "2710",
      "motor": "Industria"
    },
    {"id": "64", "name": "2219 | Fabricación de otros productos de caucho", "code": "2219", "motor": "Industria"},
    {
      "id": "65",
      "name": "2599 | Fabricación de otros productos elaborados de metal n.c.p.",
      "code": "2599",
      "motor": "Industria"
    },
    {
      "id": "66",
      "name": "2399 | Fabricación de otros productos minerales no metálicos n.c.p.",
      "code": "2399",
      "motor": "Industria"
    },
    {"id": "67", "name": "2220 | Fabricación de productos de plástico", "code": "2220", "motor": "Industria"},
    {
      "id": "68",
      "name": "2100 | Fabricación de productos farmacéuticos, sustancias químicas medicinales y productos botánicos de uso farmacéutico",
      "code": "2100",
      "motor": "Farmaceutico"
    },
    {
      "id": "69",
      "name": "2511 | Fabricación de productos metálicos para uso estructural",
      "code": "2511",
      "motor": "Industria"
    },
    {
      "id": "70",
      "name": "2420 | Fabricación de productos primarios de metales preciosos y otros metales no ferrosos",
      "code": "2420",
      "motor": "Industria"
    },
    {"id": "71", "name": "2910 | Fabricación de vehículos automotores", "code": "2910", "motor": "Automotriz"},
    {
      "id": "72",
      "name": "6430 | Fondos y sociedades de inversión",
      "code": "6430",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "73", "name": "2591 | Forja, prensado, estampado y laminado de metales", "code": "2591", "motor": "Mineria"},
    {
      "id": "74",
      "name": "3510 | Generación, transmisión y distribución de energía eléctrica",
      "code": "3510",
      "motor": "Industrias Basicas"
    },
    {
      "id": "75",
      "name": "9311 | Gestión de instalaciones deportivas",
      "code": "9311",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {"id": "76", "name": "2410 | Industrias básicas de hierro y acero", "code": "2410", "motor": "Industrias Basicas"},
    {
      "id": "77",
      "name": "7210 | Investigaciones y desarrollo experimental en el campo de las ciencias naturales y la ingeniería",
      "code": "7210",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {
      "id": "78",
      "name": "7220 | Investigaciones y desarrollo experimental en el campo de las ciencias sociales y las humanidades",
      "code": "7220",
      "motor": "Economía Comunal, Social y Socialista"
    },
    {"id": "79", "name": "5224 | Manipulación de la carga", "code": "5224", "motor": "Industria"},
    {
      "id": "80",
      "name": "4520 | Mantenimiento y reparación de vehículos automotores",
      "code": "4520",
      "motor": "Automotriz"
    },
    {
      "id": "81",
      "name": "6619 | Otras actividades auxiliares de las actividades de servicios financieros",
      "code": "6619",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "82", "name": "6491 | Otras actividades crediticias", "code": "6491", "motor": "Banca, Seguro y Finanzas"},
    {"id": "83", "name": "5590 | Otras actividades de alojamiento", "code": "5590", "motor": "Turismo"},
    {"id": "84", "name": "5229 | Otras actividades de apoyo al transporte", "code": "5229", "motor": "Automotriz"},
    {
      "id": "85",
      "name": "9329 | Otras actividades de esparcimiento y recreativas n.c.p.",
      "code": "9329",
      "motor": "Turismo"
    },
    {"id": "86", "name": "5629 | Otras actividades de servicio de comidas", "code": "5629", "motor": "Turismo"},
    {
      "id": "87",
      "name": "8299 | Otras actividades de servicios de apoyo a las empresas n.c.p.",
      "code": "8299",
      "motor": "Industria"
    },
    {
      "id": "88",
      "name": "6499 | Otras actividades de servicios financieros n.c.p.",
      "code": "6499",
      "motor": "Banca, Seguro y Finanzas"
    },
    {
      "id": "89",
      "name": "9609 | Otras actividades de servicios personales n.c.p.",
      "code": "9609",
      "motor": "Banca, Seguro y Finanzas"
    },
    {
      "id": "90",
      "name": "6209 | Otras actividades de tecnología de la información y de servicios informáticos n.c.p.",
      "code": "6209",
      "motor": "Telecomunicaciones e Informatica"
    },
    {
      "id": "91",
      "name": "6190 | Otras actividades de telecomunicación n.c.p.",
      "code": "6190",
      "motor": "Telecomunicaciones e Informatica"
    },
    {
      "id": "92",
      "name": "4922 | Otras actividades de transporte por vía terrestre",
      "code": "4922",
      "motor": "Automotriz"
    },
    {
      "id": "93",
      "name": "4390 | Otras actividades especializadas de construcción",
      "code": "4390",
      "motor": "Construccion"
    },
    {
      "id": "94",
      "name": "7490 | Otras actividades profesionales, científicas y técnicas n.c.p.",
      "code": "7490",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {"id": "95", "name": "3290 | Otras industrias manufactureras n.c.p.", "code": "3290", "motor": "Industria"},
    {
      "id": "96",
      "name": "6399 | Otros servicios de información n.c.p.",
      "code": "6399",
      "motor": "Telecomunicaciones e Informatica"
    },
    {
      "id": "97",
      "name": "8690 | Otros servicios relacionados con la salud humana n.c.p.",
      "code": "8690",
      "motor": "Farmaceutico"
    },
    {
      "id": "98",
      "name": "8549 | Otros tipos de enseñanza n.c.p.",
      "code": "8549",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {"id": "99", "name": "0312 | Pesca fluvial y lacustre", "code": "0312", "motor": "Agroalimentario"},
    {"id": "100", "name": "0311 | Pesca marítima", "code": "0311", "motor": "Agroalimentario"},
    {"id": "101", "name": "6312 | Portales Web", "code": "6312", "motor": "Telecomunicaciones e Informatica"},
    {"id": "102", "name": "1311 | Preparación de fibras textiles", "code": "1311", "motor": "Industria"},
    {
      "id": "103",
      "name": "3520 | Producción de gas distribución de combustibles gaseosos por tuberías",
      "code": "3520",
      "motor": "Hidrocarburos"
    },
    {
      "id": "104",
      "name": "6020 | Programación y transmisiones de televisión",
      "code": "6020",
      "motor": "Telecomunicaciones e Informatica"
    },
    {"id": "105", "name": "3811 | Recogida de desechos no peligrosos", "code": "3811", "motor": "Industria"},
    {"id": "106", "name": "3812 | Recogida de desechos peligrosos", "code": "3812", "motor": "Industria"},
    {"id": "107", "name": "3830 | Recuperación de materiales", "code": "3830", "motor": "Industria"},
    {
      "id": "108",
      "name": "8412 | Regulación de las actividades de organismos que prestan servicios sanitarios, educativos, culturales y otros servicios sociales, excepto servicios de seguridad social",
      "code": "8412",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "109",
      "name": "8413 | Regulación y facilitación de la actividad económica",
      "code": "8413",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "110",
      "name": "8893 | Servicios comunitarios de alimentación",
      "code": "8893",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "111",
      "name": "8891 | Servicios de atención a niños, niñas y adolescentes",
      "code": "8891",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "112",
      "name": "8892 | Servicios de atención a personas y familias",
      "code": "8892",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "113",
      "name": "6419 | Servicios de intermediación financiera n.c.p.",
      "code": "6419",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "114", "name": "5610 | Servicios de restaurantes", "code": "5610", "motor": "Turismo"},
    {
      "id": "115",
      "name": "6511 | Servicios de seguros de personas",
      "code": "6511",
      "motor": "Banca, Seguro y Finanzas"
    },
    {
      "id": "116",
      "name": "6512 | Servicios de seguros generales (patrimoniales y de obligaciones y/o responsabilidad)",
      "code": "6512",
      "motor": "Banca, Seguro y Finanzas"
    },
    {"id": "117", "name": "8610 | Servicios hospitalarios", "code": "8610", "motor": "Farmaceutico"},
    {
      "id": "118",
      "name": "8620 | Servicios médicos y otros especialistas en consultorios",
      "code": "8620",
      "motor": "Farmaceutico"
    },
    {
      "id": "119",
      "name": "8730 | Servicios sociales con alojamiento para personas mayores y personas con discapacidad",
      "code": "8730",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {
      "id": "120",
      "name": "8810 | Servicios sociales sin alojamiento para personas mayores y personas con discapacidad",
      "code": "8810",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {"id": "121", "name": "4330 | Terminación y acabado de edificios", "code": "4330", "motor": "Construccion"},
    {"id": "122", "name": "5012 | Transporte de carga marítimo y de cabotaje", "code": "5012", "motor": "Industria"},
    {"id": "123", "name": "4923 | Transporte de carga por carretera", "code": "4923", "motor": "Industria"},
    {
      "id": "124",
      "name": "5011 | Transporte de pasajeros marítimo y de cabotaje",
      "code": "5011",
      "motor": "Industria"
    },
    {"id": "125", "name": "5110 | Transporte de pasajeros por vía aérea", "code": "5110", "motor": "Industria"},
    {
      "id": "126",
      "name": "4921 | Transporte urbano y suburbano de pasajeros por vía terrestre",
      "code": "4921",
      "motor": "Automotriz"
    },
    {
      "id": "127",
      "name": "3821 | Tratamiento y eliminación de desechos no peligrosos",
      "code": "3821",
      "motor": "Industria"
    },
    {
      "id": "128",
      "name": "4631 | Venta al por mayor de alimentos excepto para animales",
      "code": "4631",
      "motor": "Agroalimentario"
    },
    {
      "id": "129",
      "name": "4721 | Venta al por menor de alimentos en comercios especializados",
      "code": "4721",
      "motor": "Agroalimentario"
    },
    {
      "id": "130",
      "name": "4730 | Venta al por menor de combustibles para vehículos automotores y motocicletas (estaciones de servicios, bombas de gasolinas, etcétera)",
      "code": "4730",
      "motor": "Hidrocarburos"
    },
    {
      "id": "131",
      "name": "4761 | Venta al por menor de productos culturales y recreativos en comercios especializados",
      "code": "4761",
      "motor": "Economia Comunal, Social y Socialista"
    },
    {"id": "132", "name": "4510 | Venta de vehículos automotores", "code": "4510", "motor": "Automotriz"}
  ];
  return array.sort((a, b) => a.name.substr(7) < b.name.substr(7) ? -1 : +(a.name.substr(7) > b.name.substr(7)));
};

const UserDatosFormStep1 = (props) => {

  const [loading, setLoading] = useState(false);

  const intl = useIntl();
  const API_URL = `${process.env.REACT_APP_API_URL}`;

  const clasesEmpresa = listaClaseEmpresa();
  const actividades = listaActividad();
  const estatus = listaEstatus();

  const initialValues = {
    razon: "",
    nombrecomercial: "",
    clase: "",
    actividadeconomica: "",
    estatus: "",
    npatronal: "",
    ntrabajadores: ""
  };

  const customHandleChangeNumeroDeTrabajadores = (event) => {
    const value = event.currentTarget.value;

    if (value === '') {
      formik.setFieldValue('ntrabajadores', value);
    } else {
      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
      if (regex.test(value.toString())) {
        formik.setFieldValue('ntrabajadores', value);
      }
    }
  }

  const LoginSchema = Yup.object().shape({

    razon: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nombrecomercial: Yup.string()
      .min(8,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MIN_LENGTH",
        }, {min: 8})
      )
      .max(25,
        intl.formatMessage({
          id: "AUTH.VALIDATION.MAX_LENGTH",
        }, {max: 25})
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    clase: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    actividadeconomica: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    estatus: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    npatronal: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
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
          {name: 'Código de Verificación'})
      ),
    ntrabajadores: Yup
      .number().positive(
        intl.formatMessage({
          id: "AUTH.VALIDATION.POSITIVE",
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
          {name: 'Código de Verificación'})
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
    validationSchema: LoginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {

      setSubmitting(true);
      enableLoading();

      console.log("values", formik.values);


      const rif = localStorage.getItem('rif');
      const token = localStorage.getItem('authToken');

      const axiosConfig = {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      };

      const data = {
        jsonapi: {version: '1.0'},
        data: {
          type: "user",
          id: rif,
          attributes: formik.values
        }
      };

      axios.patch(`${API_URL}users/${rif}`, data, axiosConfig)
        .then(function (res) {

          setSubmitting(false);
          disableLoading();

          const attr = res.data.data.attributes;

          localStorage.set('name', attr.name);
          localStorage.set('surname', attr.surname);

          console.log("resFormStep1", res);
          alert('Guardado exitosamente');

          // if(stepForm == 5 ) {
          //   toastTop = $f7.toast.create({
          //     text: 'Datos guardados con éxito',
          //     position: 'top',
          //     horizontalPosition: 'center',
          //     closeTimeout: 2000
          //   });
          //
          //   toastTop.open();
          //
          //   if (parciales) {
          //     console.log('fechacontitucion ', fechacontitucion);
          //     if(validateMulta(new Date(fechacontitucion), new Date(formData.fecha_registro_inces)) > 45) {
          //       //procesar acto administrativo de la multa
          //       toastTop = $f7.toast.create({
          //         text: 'Se cargo multa según Artículo 35 del COT',
          //         position: 'top',
          //         horizontalPosition: 'center',
          //         closeTimeout: 2000
          //       });
          //       toastTop.open();
          //     }
          //   };
          //
          //   let arreglo = odb.get('groups');
          //   if(!arreglo.find(x => x === 'contribuyentes')) {
          //     arreglo.shift();
          //     arreglo.push('contribuyentes');
          //     odb.set('groups', arreglo);
          //   }
          //
          //   setTimeout(() => {
          //     window.location.href = '/dashboard';
          //     $update();
          //   }, 2000);
          //
          // } else {
          //   showStepContinuar();
          // }


        }).catch((err) => {
        console.log("errUserDatosFormStep1", err);
        setSubmitting(false);
        disableLoading();

        const responseText = err.response
          ? err.response.status === 409
            ? 'El usuario ya se encuentra registrado'
            : 'Error al registrar datos'
          : 'Error al registrar datos';

        alert(responseText);
      });


    },
  });

  return (
    <Card bg="primary" text="white">
      <Card.Body>
        <Card.Title>
          Datos de la Empresa
        </Card.Title>
        <Card.Body>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="razon">
                    <Form.Control size="lg" type="text" placeholder="Razon Social"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.razon}
                    />

                    {formik.touched.razon && formik.errors.razon ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.razon}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="nombrecomercial">
                    <Form.Control size="lg" type="text" placeholder="Nombre Comercial"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nombrecomercial}
                    />

                    {formik.touched.nombrecomercial && formik.errors.nombrecomercial ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.nombrecomercial}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="clase">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.clase}
                    >

                      <FormattedMessage id='AUTH.GENERAL.IDENTIFICATIONTYPE'>
                        {(message) => <option value="">{message}</option>}
                      </FormattedMessage>

                      {clasesEmpresa.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.clase && formik.errors.clase ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.clase}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="actividadeconomica">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.actividadeconomica}
                    >

                      <FormattedMessage id='AUTH.GENERAL.IDENTIFICATIONTYPE'>
                        {(message) => <option value="">{message}</option>}
                      </FormattedMessage>

                      {actividades.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.actividadeconomica && formik.errors.actividadeconomica ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.actividadeconomica}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="estatus">
                    <Form.Control as="select"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.estatus}
                    >

                      <FormattedMessage id='AUTH.GENERAL.IDENTIFICATIONTYPE'>
                        {(message) => <option value="">{message}</option>}
                      </FormattedMessage>

                      {estatus.map((elemento) =>
                        <option key={elemento.id} value={elemento.id}>{elemento.name}</option>
                      )}

                    </Form.Control>

                    {formik.touched.estatus && formik.errors.estatus ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.estatus}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>

                </Col>
              </Row>

              <br/>

              <Card.Subtitle>Datos de IVSS</Card.Subtitle>

              <br/>

              <Row>
                <Col md={6}>
                  <Form.Group as={Col} controlId="npatronal">
                    <Form.Control size="lg" type="text" placeholder="Número Patronal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.npatronal}
                    />

                    {formik.touched.npatronal && formik.errors.npatronal ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.npatronal}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group as={Col} controlId="ntrabajadores">
                    <Form.Control size="lg" type="text" placeholder="Número de Trabajadores"
                                  onChange={customHandleChangeNumeroDeTrabajadores}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ntrabajadores}
                    />

                    {formik.touched.ntrabajadores && formik.errors.ntrabajadores ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{formik.errors.ntrabajadores}</div>
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col md={4}>
                  <Button variant="success" size="lg" block
                          type="submit"
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                          }
                  >
                    Guardar
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" size="lg" block
                          type="button"
                  >
                    Anterior
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="secondary" size="lg" block
                          type="button"
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

export default UserDatosFormStep1;
