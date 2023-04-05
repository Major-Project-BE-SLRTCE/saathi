const beautifySchemaErrorMsgs = (schemaErrors) => {
  try {
    console.log(schemaErrors);
    // error messages will be stored in an array
    const errorsArray = Object.values(schemaErrors.errors).map(
      (err) => err.message
    );

    // join all error messages into a single string
    // i.e. make a single sentence in the form of "Error one.\nError two."
    // const errorMsgs = errorsArray.join(";");

    // return errorMsgs;
    return errorsArray;
  } catch (error) {
    console.log("Beautify Schema Error Message's Error:\n", error);
    return "Something went wrong.";
  }
};

module.exports = beautifySchemaErrorMsgs;
