import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import './QueryRunner.css';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { clientAxios, requestConfig } from '../../config/configAxios';

const QueryRunnerStep3 = (props) => {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');

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

    const respuesta = await clientAxios.post('/dynamic_query/exec/', requestConfig);
    
    if (respuesta.data.data.attributes) setResultado('success');
    else setResultado('error');

    disableLoading();
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const submitSiguiente = () => {
    props.regresar();
  };

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
                        <div className="success-text">
                          por favor espere las instrucciones
                          de su navegador para proceder a descargar el archivo
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

              <Row>
                  <Col md={12}>
                      <Button variant="secondary" size="lg" block
                              type="button"
                              onClick={submitSiguiente}
                      >
                      Finalizar
                      </Button>
                  </Col>
              </Row>
            </Container>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default QueryRunnerStep3;