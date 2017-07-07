const { Console } = console;

class Logger {
    private console: Console;
    
    constructor() {
        this.console = new Console(process.stdout, process.stderr);
    }
    public debug(text: string) {
        this.console.log(this.getTime, '>>', text);
    }
    public info(text: string) {
        this.console.info(this.getTime, '>>', text);
    }
    public error(text: string) {
        this.console.error(this.getTime, '>>', text);
    }
    public log(text: string) {
        this.console.log(this.getTime, '>>', text);
    }
    private get getTime() {
        return new Date().toLocaleString();
    }

}
export const logger = new Logger();
