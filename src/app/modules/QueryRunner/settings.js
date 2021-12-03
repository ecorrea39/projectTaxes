import AntdConfig from "react-awesome-query-builder/lib/config/antd";

const settings = AntdConfig.settings;
const InitialConfig = {
  ...AntdConfig,
  settings: {
    ...settings,
    valueSourcesInfo: {
      value: {
        label: "Valor"
      },
      field: {
        label: "Campo",
        widget: "campo",
      },
      func: {
          label: "Función",
          widget: "func",
      }
    },
    fieldPlaceholder: "Seleccione el campo",
    valueLabel: 'Valor',
    valuePlaceholder: 'Valor',
    fieldLabel: 'Campo',
    operatorLabel: 'Operador',
    funcLabel: 'Función',
    fieldPlaceholder: 'Seleccione el campo',
    funcPlaceholder: 'Seleccione la función',
    operatorPlaceholder: 'Seleccione el operador',
    lockLabel: 'Bloquear',
    lockedLabel: 'Bloqueado',
    addGroupLabel: 'Agregar grupo',
    addRuleLabel: 'Agregar condición',
    addSubRuleLabel: 'Agregar sub condición',
    notLabel: 'No',
    valueSourcesPopupTitle: 'Seleccione el valor de origen',
    removeRuleConfirmOptions: {
      title: '¿Seguro que desea eliminar ésta condición?',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'Cancelar'
    },
    removeGroupConfirmOptions: {
      title: '¿Seguro que desea eliminar éste grupo?',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'Cancelar'
    }
  }
};

export { InitialConfig };