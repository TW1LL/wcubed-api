const { Console } = console;

class Logger {
    private console: Console;
    
    constructor() {
        this.console = new Console(process.stdout, process.stderr);
    }
    public debug(text: any) {
        this.console.log(this.getTime, '>>', text);
    }
    public info(text: any) {
        this.console.info(this.getTime, '>>', text);
    }
    public error(text: any) {
        this.console.error(this.getTime, '>>', text);
    }
    public log(text: any) {
        this.console.log(this.getTime, '>>', text);
    }
    private get getTime() {
        return new Date().toLocaleString();
    }

}
export const logger = new Logger();
