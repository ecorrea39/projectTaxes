import React, {useContext} from "react";
import {Card, Tab, Table, Tabs} from "react-bootstrap";

import AccountStatusContext from "../../context/accountStatus/accountStatusContext";
import {Formik} from "formik";

function DeudasEfectosCuentasPagar({ className }) {

    const { anos, trimestres, totalDeudaCxP, detalleDeudaCxP, filtarAccountStatus, formatNumber } = useContext(AccountStatusContext);
    const styleCard = { borderRadius: "5px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.15)", marginTop: "3%", marginBottom: "2%" }
    const detalleCxP = detalleDeudaCxP;

    return (
        <>
            {/* --- detalle de efectos y cuentas por pagar --- */}

            <div className={`card card-custom ${className}`} style={styleCard}>
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">Efectos y Cuentas por Pagar | Detalles</span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Efectos y Cuentas por Pagar</span>
                    </h3>
                    <div className="card-toolbar">
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">Total deuda: {formatNumber(totalDeudaCxP)} </span>
                    </div>
                </div>
                <div className="px-10 border-0 ">
                    <div>
                        <Formik
                            initialValues={{
                                ano_declaracion: "",
                                trimestre: "",
                            }}
                            onSubmit={(values) => { filtarAccountStatus(values, 'deudactasxpagar'); }}
                        >
                            {({
                                  values,
                                  handleSubmit,
                                  handleBlur,
                                  handleChange,
                                  setFieldValue,
                              }) => (
                                <form onSubmit={handleSubmit} className="form form-label-right">
                                    <div className="form-group row">
                                        <div className="col-lg-4">
                                            <select
                                                className="form-control"
                                                name="ano_declaracion"
                                                placeholder="Filtro por año"
                                                onChange={(e) => {
                                                    setFieldValue("ano_declaracion", e.target.value);
                                                    handleSubmit();
                                                }}
                                                onBlur={handleBlur}
                                                value={values.ano_declaracion}
                                            >
                                                <option value="" disabled>seleccione</option>
                                                <option value="">todos</option>
                                                {
                                                    anos.map((s, i) => {
                                                        return <option key={i} value={s}>{s}</option>
                                                    })
                                                }
                                            </select>
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por año
                                            </small>
                                        </div>
                                        <div className="col-lg-4">
                                            <select
                                                className="form-control"
                                                placeholder="Fitro por trimestre"
                                                name="trimestre"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    setFieldValue("trimestre", e.target.value);
                                                    handleSubmit();
                                                }}
                                                value={values.trimestre}
                                            >
                                                <option value="" disabled>seleccione</option>
                                                <option value="">todos</option>
                                                {
                                                    trimestres.map((s, i) => {
                                                        return <option key={s.id} value={s.id}>{s.name}</option>
                                                    })
                                                }
                                            </select>
                                            <small className="form-text text-muted">
                                                <b>Filtro</b> por trimestre
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="card-body pt-0 pb-3">
                    <div className="tab-content">
                        <div className="table-responsive">
                            <table className="table table-vertical-center table-head-bg">
                                <thead>
                                <tr className="text-left text-uppercase">
                                    <th style={{minWidth: "200px"}}>Concepto documento</th>
                                    <th style={{minWidth: "200px"}}>Componentes</th>
                                    <th style={{minWidth: "100px"}}>Fecha notificación</th>
                                    <th style={{minWidth: "50px"}}>Número giro</th>
                                    <th style={{minWidth: "50px"}}>Valor MMV</th>
                                    <th style={{minWidth: "50px"}}>Número veces MMV</th>
                                    <th style={{minWidth: "100px"}}>Monto</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    detalleCxP.map((s,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.concepto_pago_name}</span>
                                                    <span className="text-muted font-weight-bold">{s.numero_documento}</span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.componentes}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.fecha_documento}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.numero_giro}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.valor_mmv}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{s.nveces_mmv}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-sm">{formatNumber(s.monto)}</span>
                                                    <span className="text-muted font-weight-bold"></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    detalleCxP.length == 0 && (<span className="text-muted">sin información para mostrar</span>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeudasEfectosCuentasPagar;


