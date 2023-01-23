const beautifySchemaErrorMsgs = (schemaErrors) => {
  try {
    // error messages will be stored in an array
    const errorsArray = Object.values(schemaErrors.errors).map(
      (err) => err.message
    );

    // join all error messages into a single string
    // i.e. make a single sentence in the form of "Error one.\nError two."
    const errorMsgs = errorsArray.join("\n");

    return errorMsgs;
  } catch (error) {
    console.log("Beautify Schema Error Message's Error:\n", error);
    return "Something went wrong.";
  }
};

module.exports = beautifySchemaErrorMsgs;
