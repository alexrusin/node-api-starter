// https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/es6%20%26%20beyond/ch2.md#tagged-template-literals
class Logger {
  private processInput(strings: TemplateStringsArray, ...values: Array<any>) {
    var str = "";
    for (let i = 0; i < strings.length; i++) {
      if (i > 0) {
        if (values[i - 1] && typeof values[i - 1] == "object") {
          if (values[i - 1] instanceof Error) {
            if (values[i - 1].stack) {
              str += values[i - 1].stack;
              continue;
            }
          } else {
            try {
              str += JSON.stringify(values[i - 1]);
              continue;
            } catch (err) {}
          }
        }
        str += values[i - 1];
      }
      str += strings[i];
    }
    return str;
  }
  debug(strings: TemplateStringsArray, ...values: Array<any>) {
    console.info(`[DEBUG] ${this.processInput(strings, ...values)}`);
  }
  info(strings: TemplateStringsArray, ...values: Array<any>) {
    console.info(this.processInput(strings, ...values));
  }
  warning(strings: TemplateStringsArray, ...values: Array<any>) {
    console.warn(this.processInput(strings, ...values));
  }
  error(strings: TemplateStringsArray, ...values: Array<any>) {
    console.error(this.processInput(strings, ...values));
  }
}

const logger = new Logger();
export default logger;
