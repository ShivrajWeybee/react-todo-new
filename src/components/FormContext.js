import React from "react";

const FormContext = React.createContext('Guest');

const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;

export { FormProvider, FormConsumer };
export default FormContext;