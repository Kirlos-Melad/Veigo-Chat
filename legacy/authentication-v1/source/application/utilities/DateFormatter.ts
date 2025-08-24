import moment from "moment";

class DateFormatter {
    private readonly _DATE_FORMAT_SHORT: string;
    private readonly _DATE_FORMAT_LONG: string;

    public constructor(format?: { short?: string; long?: string }) {
        this._DATE_FORMAT_SHORT = format?.short || "YYYY/MM/DD";
        this._DATE_FORMAT_LONG =
            format?.long || `${this._DATE_FORMAT_SHORT} [at] hh:mm:ss a`;
    }

    public formatShort(date: moment.MomentInput): string {
        return moment(date).format(this._DATE_FORMAT_SHORT);
    }

    public formatLong(date: moment.MomentInput): string {
        return moment(date).format(this._DATE_FORMAT_LONG);
    }

    public validateFormatShort(date: moment.MomentInput): boolean {
        return moment(date, this._DATE_FORMAT_SHORT, true).isValid();
    }

    public validateFormatLong(date: moment.MomentInput): boolean {
        return moment(date, this._DATE_FORMAT_LONG, true).isValid();
    }
}

export { DateFormatter };
