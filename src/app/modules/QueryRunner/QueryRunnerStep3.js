import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import './QueryRunner.css';
import { CheckCircleOutlined, CloseCircleOutlined, FileTwoTone, FileTextTwoTone, 
  FileExcelTwoTone, FilePdfTwoTone, HourglassTwoTone } from '@ant-design/icons';
import { clientAxios, requestConfig } from '../../config/configAxios';
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import ReactExport from "react-export-excel";
import { CSVLink } from "react-csv";
import { Document, Page, Text, View, PDFDownloadLink, Image } from '@react-pdf/renderer';
import styles from './pdf-styles';
import Swal from "sweetalert2";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const QueryRunnerStep3 = (props) => {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [fileName, setFileName] = useState('');
  const [separator, setSeparator] = useState('');
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [tipo, setTipo] = useState('');
  const [ahora, setAhora] = useState('');
  const [ahoraStr, setAhoraStr] = useState('');
  const [colWidth, setColWidth] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    enableLoading();
    runQuery();
  }, [props.WhereFinal]);

  const runQuery = async () => {
    const valores = {
      campos: props.queryData.campos,
      mapa_campos: props.queryData.mapa_campos,
      joins: props.queryData.joins,
      agrupar: props.queryData.agrupar,
      orden: props.queryData.orden,
      direccion: props.queryData.direccion,
      offset: props.WhereFinal.limites.offset ? props.WhereFinal.limites.offset : -1,
      limit: props.WhereFinal.limites.limite ? props.WhereFinal.limites.limite : -1,
      where: props.WhereFinal.where
    };

    requestConfig.data.type = 'query';
    requestConfig.data.attributes = valores;
    requestConfig.data.id = '';

    let respuesta = {};

    try {
      respuesta = await clientAxios.post('/dynamic_query/exec/', requestConfig);
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Resultado de la operación",
        text: "Ocurrió un error ejecutando la consulta",
        icon: "error",
        timer: 1500
      }).then(() => {
        props.regresar();
      });
      return;
    }
    
    if (respuesta.data.data.attributes) {
      const innerType = props.WhereFinal.formato;
      const newDate = new Date();
      const isNow = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
      const isNowStr = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours()}.${newDate.getMinutes()}.${newDate.getSeconds()}`
      const dataSample = respuesta.data.data.attributes.records.length > 0 ?
        respuesta.data.data.attributes.records[0] : {};
      
      setAhora(isNow);
      setAhoraStr(isNowStr);
      setTipo(innerType);
      setHeaders(Object.keys(dataSample));
      setColWidth(95 / Object.keys(dataSample).length);

      if (['txt', 'csv'].includes(innerType)) setSeparator(innerType === 'txt' ? '\t' : ';');

      if (innerType != 'xlsx') setFileName(`${props.queryData.nombre}.${innerType}`);
      else setFileName(`${props.queryData.nombre}`);

      setData(respuesta.data.data.attributes.records);

      setResultado('success');
    }
    else {
      setResultado('error');
    }

    disableLoading();
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const afterDownload = () => {
    setDownloading(true);
    setTimeout(() => props.regresar(), 1500);
  };

  const getColor = (index) => {
    const rest = index % 2;
    return rest === 0 ? "#FFFFFF" : "#C2EFFF";
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={styles.title}>
            <Image src={toAbsoluteUrl("/media/logos/incesTransparente.png")}
            style={styles.image} />
            <Text style={styles.titleText}>{props.queryData.titulo}</Text>
            <Text style={styles.generated}>{ahora}</Text>
          </View>

          <View style={styles.headers}>
            {headers.map((elemento) =>
              <Text key={elemento} style={[styles.header, { width: `${colWidth}%`}]}>{elemento}</Text>
            )}
          </View>

          <View style={styles.content}>
            {data.map((valor, idx) =>
              <View key={idx} style={[styles.dataRow, {backgroundColor: `${getColor(idx)}`}]}>
                {headers.map((elemento) =>
                  <Text key={`${elemento}.${idx}`} style={[styles.data, { width: `${colWidth}%`}]}>
                    {valor[elemento]?.toString()}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <Card bg="default" text="success">
      <Card.Body>
        <Card.Title>
          Resultados
        </Card.Title>
        <Card.Body>
            <Container>
              <Row>
                  <Col md={12}>
                    {resultado === 'success' && 
                      <div className="result-container">
                        <CheckCircleOutlined style={{ color: '#52ae32', fontSize: '36px' }} />
                        <div className="success-title">
                          Su consulta se ha ejecutado exitosamente
                        </div>
                      </div>
                    }

                    {resultado === 'error' && 
                      <div className="result-container">
                        <CloseCircleOutlined style={{ color: '#e30425', fontSize: '36px' }} />
                        <div className="error-title">
                          Ocurrió un error ejecutando la consulta
                        </div>
                        <div className="error-text">
                          Por favor inténtelo de nuevo. Si el error persiste, consulte con uno de los
                          administradores
                        </div>
                      </div>
                    }
                  </Col>
              </Row>

              <br/>

              {['txt', 'csv'].includes(tipo) &&
                <Row>
                <Col md={12}>
                  <div className="download-link" hidden={downloading}>
                    <CSVLink
                    data={data}
                    separator={separator}
                    filename={fileName}
                    target="_blank"
                    onClick={afterDownload}>
                      <div className="download-wrapper">
                        <div className="circle-download">
                          {tipo === 'txt' && <FileTwoTone twoToneColor="#52c41a" />}
                          {tipo === 'csv' && <FileTextTwoTone twoToneColor="#52c41a" />}
                        </div>
                        Por favor descargue su archivo
                      </div>
                    </CSVLink>
                  </div>
                  <div className="download-link" hidden={!downloading}>
                    <div className="download-text">
                      Su archivo se está descargando, pronto será redireccionado al inicio.
                    </div>
                  </div>
                </Col>
              </Row>
              }

              {tipo === 'xlsx' &&
                <Row>
                <Col md={12}>
                  <div className="download-link" hidden={downloading}>
                    <ExcelFile element={<div className="download-wrapper" onClick={afterDownload}>
                        <div className="circle-download">
                          <FileExcelTwoTone twoToneColor="#52c41a" />
                        </div>
                        Por favor descargue su archivo
                      </div>
                    } filename={fileName}>
                      <ExcelSheet data={data} name={ahoraStr}>
                      {headers.map((elemento) =>
                        <ExcelColumn key={elemento} label={elemento} value={elemento} />
                      )}
                      </ExcelSheet>
                    </ExcelFile>
                  </div>
                  <div className="download-link" hidden={!downloading}>
                    <div className="download-text">
                      Su archivo se está descargando, pronto será redireccionado al inicio.
                    </div>
                  </div>
                </Col>
              </Row>
              }

              {tipo === 'pdf' &&
                <Row>
                <Col md={12}>
                  <div className="download-link" hidden={downloading}>
                    <PDFDownloadLink
                    document={MyDocument()}
                    fileName={fileName}>
                      {({ blob, url, loading, error }) =>
                        loading ? 
                        <div className="wait-file">
                          <HourglassTwoTone twoToneColor="#52c41a" spin />
                          <div className="download-text">
                            Su archivo se está generando, por favor espere.
                          </div>
                        </div> : 
                        <div className="download-wrapper" onClick={afterDownload}>
                          <div className="circle-download">
                          <FilePdfTwoTone twoToneColor="#52c41a" />
                          </div>
                          Por favor descargue su archivo
                        </div>
                      }
                    </PDFDownloadLink>
                  </div>
                  <div className="download-link" hidden={!downloading}>
                    <div className="download-text">
                      Su archivo se está descargando, pronto será redireccionado al inicio.
                    </div>
                  </div>
                </Col>
              </Row>
              }
            </Container>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryRunnerStep3;