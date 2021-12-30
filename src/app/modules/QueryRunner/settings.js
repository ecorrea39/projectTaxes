import AntdConfig from "react-awesome-query-builder/lib/config/antd";

const settings = AntdConfig.settings;
const conjunctions = AntdConfig.conjunctions;
const operators = AntdConfig.operators;
const widgets = AntdConfig.widgets;
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
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar'
    },
    removeGroupConfirmOptions: {
      title: '¿Seguro que desea eliminar éste grupo?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar'
    }
  },
  conjunctions: {
    ...conjunctions,
    AND: {
      ...conjunctions.AND,
      label: "Y"
    },
    OR: {
      ...conjunctions.OR,
      label: "O"
    }
  },
  operators: {
    ...operators,
    like: {
      ...operators.like,
      label: "Contiene"
    },
    not_like: {
      ...operators.not_like,
      label: "No contiene"
    },
    starts_with: {
      ...operators.starts_with,
      label: "Comienza con"
    },
    ends_with: {
      ...operators.ends_with,
      label: "Termina en"
    },
    between: {
      ...operators.between,
      label: "Entre"
    },
    not_between: {
      ...operators.not_between,
      label: "No entre"
    },
    is_empty: {
      ...operators.is_empty,
      label: "Vacío"
    },
    is_not_empty: {
      ...operators.is_not_empty,
      label: "No es vacío"
    },
    select_any_in: {
      ...operators.select_any_in,
      label: "Cualquiera en"
    },
    select_not_any_in: {
      ...operators.select_not_any_in,
      label: "Ninguno en"
    },
    multiselect_equals: {
      ...operators.multiselect_equals,
      label: "Igual"
    },
    multiselect_not_equals: {
      ...operators.multiselect_not_equals,
      label: "Distinto"
    },
    proximity: {
      ...operators.proximity,
      label: "Búsqueda aproximada"
    },
    some: {
      ...operators.some,
      label: "Alguno"
    },
    all: {
      ...operators.all,
      label: "Todos"
    },
    none: {
      ...operators.none,
      label: "Ninguno"
    }
  },
  widgets: {
    ...widgets,
    text: {
      ...widgets.text,
      valueLabel: "Texto",
      valuePlaceholder: "Introduzca el texto"
    },
    textarea: {
      ...widgets.textarea,
      valueLabel: "Texto",
      valuePlaceholder: "Introduzca el texto"
    },
    number: {
      ...widgets.number,
      valueLabel: "Número",
      valuePlaceholder: "Introduzca el número",
      valueLabels: [{
        label: "Desde",
        placeholder: "Número desde"
      }, {
        label: "Hasta",
        placeholder: "Número hasta"
      }]
    },
    slider: {
      ...widgets.slider,
      valueLabel: "Número",
      valuePlaceholder: "Indique el número o mueva el slider"
    },
    select: {
      ...widgets.select,
      valueLabel: "Valor",
      valuePlaceholder: "Seleccione el valor"
    },
    multiselect: {
      ...widgets.multiselect,
      valueLabel: "Valores",
      valuePlaceholder: "Seleccione los valores"
    },
    date: {
      ...widgets.date,
      // dateFormat: "DD.MM.YYYY",
      // valueFormat: "YYYY-MM-DD",
      dateFormat: "DD/MM/YYYY",
      valueFormat: "DD/MM/YYYY",
      valueLabel: "Fecha",
      valuePlaceholder: "Indique la fecha",
      valueLabels: [{
        label: "Desde",
        placeholder: "Fecha desde"
      }, {
        label: "Hasta",
        placeholder: "Fecha hasta"
      }]
    },
    time: {
      ...widgets.time,
      valueLabel: "Hora",
      valuePlaceholder: "Indique la hora",
      valueLabels: [{
        label: "Desde",
        placeholder: "Hora desde"
      }, {
        label: "Hasta",
        placeholder: "Hora hasta"
      }]
    },
    datetime: {
      ...widgets.datetime,
      // dateFormat: "DD.MM.YYYY",
      // valueFormat: "YYYY-MM-DD HH:mm:ss",
      dateFormat: "DD/MM/YYYY",
      valueFormat: "DD/MM/YYYY HH:mm:ss",
      valueLabel: "Fecha completa",
      valuePlaceholder: "Indique la fecha completa",
      valueLabels: [{
        label: "Desde",
        placeholder: "Fecha completa desde"
      }, {
        label: "Hasta",
        placeholder: "Fecha completa hasta"
      }]
    },
    "boolean": {
      ...widgets["boolean"],
      labelYes: "Verdadero",
      labelNo: "Falso"
    },
    field: {
      ...widgets.field,
      valueLabel: "Campo a comparar",
      valuePlaceholder: "Selecione el campo a comparar"
    },
    func: {
      ...widgets.func,
      valueLabel: "Función",
      valuePlaceholder: "Selecione la función"
    }
  }
};

export { InitialConfig };