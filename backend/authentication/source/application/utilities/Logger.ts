import {
	Logform,
	createLogger,
	format,
	transports,
	Logger as winstonLogger,
} from "winston";
import wrapAnsi from "wrap-ansi";
import util from "util";

import DateFormatter from "@source/application/utilities/DateFormatter";

const { combine, colorize, printf } = format;

class Logger {
	private readonly mLogger: winstonLogger;

	public constructor() {
		this.mLogger = createLogger({
			level: "MESSAGE",
			levels: {
				ERROR: 0,
				WARNING: 1,
				INFORMATION: 2,
				MESSAGE: 3,
			},
			format: combine(
				this.SplatMessage(),
				this.FormatMessage(),
				this.AddMessageHeader(),
			),
			transports: [new transports.Console()],
		});
	}

	private SplatMessage(): Logform.Format {
		return {
			transform: (info: Logform.TransformableInfo) => {
				info.message = util.format(...info[Symbol.for("splat")]);
				return info;
			},
		};
	}

	private FormatMessage(): Logform.Format {
		return {
			transform: (info: Logform.TransformableInfo) => {
				const indentation = " ".repeat(10);

				const wrappedMessage = wrapAnsi(info.message, 140, {
					trim: false,
					hard: true,
					wordWrap: true,
				});

				const indentedMessage = wrappedMessage
					.split("\n")
					.map(
						(line: string) =>
							`${indentation}${line}`,
					)
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

	private AddMessageHeader(): Logform.Format {
		return printf(({ level, message }) => {
			let headerMessage = `[${DateFormatter.FormatLong(Date.now())}] `;
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
				}).colorize(level, headerMessage) + message
			);
		});
	}

	public information(...messages: any[]) {
		this.mLogger.log("INFORMATION", "", ...messages);
	}

	public warning(...messages: any[]) {
		this.mLogger.log("WARNING", "", ...messages);
	}

	public error(...messages: any[]) {
		this.mLogger.log("ERROR", "", ...messages);
	}
}

export default new Logger();
