export function sanitizacaoPaciente(pacienteData): any {
    const attributeSanitizations = {
      cpf: (value) => value.toString().replace(/[^0-9]/g, ''),
      nome: (value) => value.replace(/[^a-zA-ZÀ-ú\s]/g, ''),
      email: (value) => value.trim(),
      telefone: (value) => value.replace(/[^0-9]/g, ''),
      planosSaude: (value) => value,
      endereco: {
        cep: (value) => value.toString().replace(/[^0-9]/g, ''),
        rua: (value) => value.replace(/[^a-zA-ZÀ-ú\s]/g, ''),
        estado: (value) => value.trim(),
        complemento: (value) => value.replace(/[^a-zA-ZÀ-ú\s]/g, ''),
        numero: (value) => parseInt(value, 10),
      },
      // imagemUrl: (value) => {
      //   // Remove qualquer código JavaScript inserido na URL
      //   const sanitizedValue = value.replace(/javascript:/gi, '');
  
      //   // Verifica se a URL começa com "http://" ou "https://"
      //   if (!/^https?:\/\//i.test(sanitizedValue)) {
      //     // Caso não comece com "http://" ou "https://", adiciona "http://"
      //     return 'http://' + sanitizedValue;
      //   }
  
      //   return sanitizedValue;
      // }
    };
 
    const pacienteSanitizado = {}

    for (const key in pacienteData) {
     if (pacienteData.hasOwnProperty(key)) {
       const value = pacienteData[key];
       const sanizationRule = attributeSanitizations[key];
  
       if (sanizationRule) {
         if (typeof sanizationRule === 'object') {
           pacienteSanitizado[key] = {};
  
           for (const subKey in sanizationRule) {
             if (subKey in value) {
               pacienteSanitizado[key][subKey] = sanizationRule[subKey](value[subKey]);
             }
           }
         } else {
           pacienteSanitizado[key] = sanizationRule(value);
         }
       } else {
         pacienteSanitizado[key] = value;
       }
     }
   }
  
    return pacienteSanitizado;
}