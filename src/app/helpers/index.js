export const regexNumber = /^[0-9]+$/;

export const regexNameGroup = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u;


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