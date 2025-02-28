import { Schema } from "effect";
import { TaggableEntity } from "./common.js";

/**
 * Calendar entity
 */
export interface Calendar extends TaggableEntity {
    /**
     * Entity ID
     */
    entity_id: number;

    /**
     * Calendar type
     */
    type?: string | null;

    /**
     * Current date in the format "year-month-day"
     */
    date?: string | null;

    /**
     * Calendar parameters (deprecated)
     */
    parameters?: string | null;

    /**
     * Calendar months
     */
    months?: CalendarMonth[];

    /**
     * Start offset for the first day of the week
     */
    start_offset?: number;

    /**
     * Weekday names
     */
    weekdays?: string[];

    /**
     * Named years
     */
    years?: Record<string, string>;

    /**
     * Seasons
     */
    seasons?: CalendarSeason[];

    /**
     * Moons
     */
    moons?: CalendarMoon[];

    /**
     * Year suffix (e.g., "BC", "AD")
     */
    suffix?: string | null;

    /**
     * Date format
     */
    format?: string | null;

    /**
     * Whether the calendar has leap years
     */
    has_leap_year?: boolean;

    /**
     * Number of days to add in a leap year
     */
    leap_year_amount?: number;

    /**
     * Month in which to add leap days
     */
    leap_year_month?: number;

    /**
     * Leap year offset (every X years)
     */
    leap_year_offset?: number;

    /**
     * Year from which leap years start
     */
    leap_year_start?: number;

    /**
     * Whether to skip year zero
     */
    skip_year_zero?: boolean;
}

/**
 * Calendar month
 */
export interface CalendarMonth {
    /**
     * Month name
     */
    name: string;

    /**
     * Month length in days
     */
    length: number;

    /**
     * Month type (standard or intercalary)
     */
    type: string;
}

/**
 * Calendar season
 */
export interface CalendarSeason {
    /**
     * Season name
     */
    name: string;

    /**
     * Month when the season starts
     */
    month: number;

    /**
     * Day when the season starts
     */
    day: number;
}

/**
 * Calendar reminder
 */
export interface CalendarReminder {
    /**
     * Calendar ID
     */
    calendar_id: number;

    /**
     * Reminder color
     */
    colour: string;

    /**
     * Reminder comment
     */
    comment: string | null;

    /**
     * Created at timestamp
     */
    created_at: string;

    /**
     * Created by user ID
     */
    created_by: number | null;

    /**
     * Date in the format "year-month-day"
     */
    date: string;

    /**
     * Day of the month
     */
    day: number;

    /**
     * Entity ID
     */
    entity_id: number | null;

    /**
     * Reminder ID
     */
    id: number;

    /**
     * Whether the reminder is private
     */
    is_private: boolean;

    /**
     * Whether the reminder is recurring
     */
    is_recurring: boolean;

    /**
     * Length of the reminder in days
     */
    length: number;

    /**
     * Month of the year
     */
    month: number;

    /**
     * Recurring periodicity (e.g., "month")
     */
    recurring_periodicity: string | null;

    /**
     * Recurring until date
     */
    recurring_until: string | null;

    /**
     * Type ID
     */
    type_id: number | null;

    /**
     * Updated at timestamp
     */
    updated_at: string;

    /**
     * Updated by user ID
     */
    updated_by: number | null;

    /**
     * Visibility ID
     */
    visibility_id: number;

    /**
     * Year
     */
    year: number;
}

/**
 * Calendar moon
 */
export interface CalendarMoon {
    /**
     * Moon name
     */
    name: string;

    /**
     * Days between full moons
     */
    fullmoon: string;

    /**
     * Offset for the first full moon
     */
    offset: number;

    /**
     * Moon color
     */
    colour: string;
}

export const CalendarMonthSchema = Schema.Struct({
    name: Schema.String,
    length: Schema.Number,
    type: Schema.String,
});

export const CalendarSeasonSchema = Schema.Struct({
    name: Schema.String,
    month: Schema.Number,
    day: Schema.Number,
});

export const CalendarMoonSchema = Schema.Struct({
    name: Schema.String,
    fullmoon: Schema.String,
    offset: Schema.Number,
    colour: Schema.String,
});

export const CalendarReminderSchema = Schema.Struct({
    calendar_id: Schema.Number,
    colour: Schema.String,
    comment: Schema.Union(...[Schema.String, Schema.Null]),
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    date: Schema.String,
    day: Schema.Number,
    entity_id: Schema.Union(...[Schema.Number, Schema.Null]),
    id: Schema.Number,
    is_private: Schema.Boolean,
    is_recurring: Schema.Boolean,
    length: Schema.Number,
    month: Schema.Number,
    recurring_periodicity: Schema.Union(...[Schema.String, Schema.Null]),
    recurring_until: Schema.Union(...[Schema.String, Schema.Null]),
    type_id: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    visibility_id: Schema.Number,
    year: Schema.Number,
});

export const CalendarSchema = Schema.Struct({
    // Base TaggableEntity fields
    id: Schema.Number,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    is_private: Schema.Boolean,
    name: Schema.String,
    entry: Schema.Union(...[Schema.String, Schema.Null]),
    image: Schema.Union(...[Schema.String, Schema.Null]),
    image_full: Schema.Union(...[Schema.String, Schema.Null]),
    image_thumb: Schema.Union(...[Schema.String, Schema.Null]),
    has_custom_image: Schema.Boolean,
    tags: Schema.Union(...[Schema.Array(Schema.Number), Schema.Null]),

    // Calendar-specific fields
    entity_id: Schema.Number,
    type: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    date: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    parameters: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    months: Schema.Union(...[Schema.Array(CalendarMonthSchema), Schema.Undefined]),
    start_offset: Schema.Union(...[Schema.Number, Schema.Undefined]),
    weekdays: Schema.Union(...[Schema.Array(Schema.String), Schema.Undefined]),
    years: Schema.Union(...[Schema.Record(Schema.String, Schema.String), Schema.Undefined]),
    seasons: Schema.Union(...[Schema.Array(CalendarSeasonSchema), Schema.Undefined]),
    moons: Schema.Union(...[Schema.Array(CalendarMoonSchema), Schema.Undefined]),
    suffix: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    format: Schema.Union(...[Schema.String, Schema.Null, Schema.Undefined]),
    has_leap_year: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
    leap_year_amount: Schema.Union(...[Schema.Number, Schema.Undefined]),
    leap_year_month: Schema.Union(...[Schema.Number, Schema.Undefined]),
    leap_year_offset: Schema.Union(...[Schema.Number, Schema.Undefined]),
    leap_year_start: Schema.Union(...[Schema.Number, Schema.Undefined]),
    skip_year_zero: Schema.Union(...[Schema.Boolean, Schema.Undefined]),
});

/**
 * Parameters for creating a calendar
 */
export interface CreateCalendarParams {
    /**
     * Name of the calendar
     */
    name: string;

    /**
     * The html description of the calendar
     */
    entry?: string;

    /**
     * The calendar's type
     */
    type?: string;

    /**
     * The current calendar year
     */
    current_year?: number;

    /**
     * The current calendar month
     */
    current_month?: number;

    /**
     * The current calendar day
     */
    current_day?: number;

    /**
     * Array of tag ids
     */
    tags?: number[];

    /**
     * Array of month names
     */
    month_name?: string[];

    /**
     * Array of month lengths
     */
    month_length?: number[];

    /**
     * Array of month types (standard or intercalary)
     */
    month_type?: string[];

    /**
     * Array of weekday names (min 2)
     */
    weekday: string[];

    /**
     * Array of year names
     */
    year_name?: string[];

    /**
     * Array of year numbers
     */
    year_number?: number[];

    /**
     * Array of moon names
     */
    moon_name?: string[];

    /**
     * Array of when (every how many days) a full moon occurs
     */
    moon_fullmoon?: string[];

    /**
     * Array of epoch names
     */
    epoch_name?: string[];

    /**
     * Array of season names
     */
    season_name?: string[];

    /**
     * Array of seasons month start
     */
    season_month?: number[];

    /**
     * Array of seasons day start
     */
    season_day?: number[];

    /**
     * The rendering format for the calendar dates
     */
    format?: string;

    /**
     * Whether the calendar has leap years
     */
    has_leap_year?: boolean;

    /**
     * The amount of leap days
     */
    leap_year_amount?: number;

    /**
     * Every how many years the leap days occur
     */
    leap_year_offset?: number;

    /**
     * The year from which the leap days start occurring
     */
    leap_year_start?: number;

    /**
     * Whether the calendar skips year zero to start in year one
     */
    skip_year_zero?: boolean;

    /**
     * Gallery image UUID for the entity image
     */
    entity_image_uuid?: string;

    /**
     * Gallery image UUID for the entity header (limited to premium campaigns)
     */
    entity_header_uuid?: string;

    /**
     * If the calendar is only visible to `admin` members of the campaign
     */
    is_private?: boolean;
}

/**
 * Parameters for updating a calendar
 */
export interface UpdateCalendarParams extends Partial<CreateCalendarParams> { }
