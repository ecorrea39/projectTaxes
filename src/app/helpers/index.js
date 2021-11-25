export const regexNumber = /^[0-9]+$/;

export const regexNameGroup = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u;
export const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u;
export const textoAndNumber = /^[A-Za-z0-9\s]+$/g;
// Valida sin el codigo de area
export const regexPhoneNumber = /^([0-9]{7})/g;
// Validador de cedula con separador
export const regexCICSP = /^([VEP]{1}[\-]{1,2})([0-9]{6,8}$)/g;
// Validador de cedula sin separador
export const regexCI = /^([VEP]{1})([0-9]{6,8}$)/g;

export const formatearfecha = (f, formato) => {
    console.log(f)
    const ano = f.getFullYear();
    const mes = ("0" + (f.getMonth()+1)).substr(-2);
    const dia = ("0" + f.getDate()).substr(-2);

    let fecha;

    if(formato === 'DMY') fecha = `${dia}/${mes}/${ano}`
    else if(formato === 'YMD') fecha = `${ano}/${mes}/${dia}`;

    return fecha;
}