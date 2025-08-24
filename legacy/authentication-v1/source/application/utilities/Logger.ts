import {
    Logform,
    createLogger,
    format,
    transports,
    Logger as winstonLogger,
} from "winston";
import wrapAnsi from "wrap-ansi";
import util from "util";

import { DateFormatter } from "@source/application/utilities/DateFormatter";

const { combine, colorize, printf } = format;

class Logger {
    private static _instance: Logger;

    private readonly _logger: winstonLogger;
    private readonly _dateFormatter: DateFormatter;

    private constructor(dateFormatter: DateFormatter) {
        this._dateFormatter = dateFormatter;
        this._logger = createLogger({
            level: "MESSAGE",
            levels: {
                ERROR: 0,
                WARNING: 1,
                INFORMATION: 2,
                MESSAGE: 3,
            },
            format: combine(
                this.splatMessage(),
                this.formatMessage(),
                this.addMessageHeader(),
            ),
            transports: [new transports.Console()],
        });
    }

    public static createInstance(dateFormatter: DateFormatter): Logger {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!Logger._instance) {
            Logger._instance = new Logger(dateFormatter);
        }

        return Logger._instance;
    }

    public static get instance(): Logger {
        return Logger._instance;
    }

    private splatMessage(): Logform.Format {
        return {
            transform: (
                info: Logform.TransformableInfo,
            ): Logform.TransformableInfo | boolean => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                info.message = util.format(...info[Symbol.for("splat")]);
                return info;
            },
        };
    }

    private formatMessage(): Logform.Format {
        return {
            transform: (
                info: Logform.TransformableInfo,
            ): Logform.TransformableInfo | boolean => {
                const indentation = " ".repeat(10);

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const wrappedMessage = wrapAnsi(info.message, 140, {
                    trim: false,
                    hard: true,
                    wordWrap: true,
                });

                const indentedMessage = wrappedMessage
                    .split("\n")
                    .map((line: string) => `${indentation}${line}`)
                    .join("\n");

                if (info.level === "MESSAGE") {
                    info.message = indentedMessage.substring(
                        0,
                        indentedMessage.length - 1,
                    );
                } else {
                    info.message = indentedMessage;
                }

                return info;
            },
        };
    }

    private addMessageHeader(): Logform.Format {
        return printf(({ level, message }) => {
            let headerMessage = `[${this._dateFormatter.formatLong(Date.now())}] `;
            headerMessage += `[${level}] `;
            headerMessage += "\n";

            return (
                colorize({
                    level: false,
                    message: true,
                    colors: {
                        ERROR: "bold red",
                        WARNING: "yellow",
                        INFORMATION: "green",
                        MESSAGE: "bold green",
                    },
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                }).colorize(level, headerMessage) + message
            );
        });
    }

    public information(...messages: unknown[]): void {
        this._logger.log("INFORMATION", "", ...messages);
    }

    public warning(...messages: unknown[]): void {
        this._logger.log("WARNING", "", ...messages);
    }

    public error(...messages: unknown[]): void {
        this._logger.log("ERROR", "", ...messages);
    }
}

export { Logger };
