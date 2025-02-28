import { Schema } from "effect";

/**
 * Entity Event entity
 */
export interface KankaEntityEvent {
    /**
     * Entity Event ID
     */
    id: number;

    /**
     * Calendar ID the event belongs to
     */
    calendar_id: number;

    /**
     * Comment of the entity event
     */
    comment: string;

    /**
     * When the entity event was created
     */
    created_at: string;

    /**
     * User ID who created the entity event
     */
    created_by: number | null;

    /**
     * Date of the event in format "day-month-year"
     */
    date: string;

    /**
     * Entity ID the event belongs to
     */
    entity_id: number;

    /**
     * If the entity event is private
     */
    is_private: boolean;

    /**
     * If the event is recurring
     */
    is_recurring: boolean;

    /**
     * Periodicity of recurrence (yearly, monthly, or moon-based)
     */
    recurring_periodicity: string;

    /**
     * Duration in days of the event
     */
    length: number;

    /**
     * Year until the event reoccurs
     */
    recurring_until: number | null;

    /**
     * Type ID for special events (2 for birthday, 3 for death)
     */
    type_id: number | null;

    /**
     * When the entity event was last updated
     */
    updated_at: string;

    /**
     * User ID who last updated the entity event
     */
    updated_by: number | null;

    /**
     * Visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id: number;

    /**
     * Year of the event
     */
    year: number;
}

export const KankaEntityEventSchema = Schema.Struct({
    id: Schema.Number,
    calendar_id: Schema.Number,
    comment: Schema.String,
    created_at: Schema.String,
    created_by: Schema.Union(...[Schema.Number, Schema.Null]),
    date: Schema.String,
    entity_id: Schema.Number,
    is_private: Schema.Boolean,
    is_recurring: Schema.Boolean,
    recurring_periodicity: Schema.String,
    length: Schema.Number,
    recurring_until: Schema.Union(...[Schema.Number, Schema.Null]),
    type_id: Schema.Union(...[Schema.Number, Schema.Null]),
    updated_at: Schema.String,
    updated_by: Schema.Union(...[Schema.Number, Schema.Null]),
    visibility_id: Schema.Number,
    year: Schema.Number
});

/**
 * Parameters for creating an entity event
 */
export interface CreateEntityEventParams {
    /**
     * Name of the entity event
     */
    name: string;

    /**
     * Day on which the event takes place
     */
    day: number;

    /**
     * Month (id) on which the event takes place
     */
    month: number;

    /**
     * Year on which the event takes place
     */
    year: number;

    /**
     * Duration in days of the event
     */
    length: number;

    /**
     * The calendar's id
     */
    calendar_id: number;

    /**
     * Periodicity of recurrence (yearly, monthly, or moon-based)
     */
    recurring_periodicity?: string;

    /**
     * Year until the event reoccurs
     */
    recurring_until?: number;

    /**
     * Colour of the entity event in the calendar
     */
    colour?: string;

    /**
     * Comment of the entity event
     */
    comment?: string;

    /**
     * If the entity event is only visible to admin members of the campaign
     */
    is_private?: boolean;

    /**
     * Special field for calculating the age of a character (2 for birthday, 3 for death)
     */
    type_id?: number | null;

    /**
     * The visibility ID (1 for all, 2 self, 3 admin, 4 self-admin, 5 members)
     */
    visibility_id?: number;
}

/**
 * Parameters for updating an entity event
 */
export interface UpdateEntityEventParams extends Partial<CreateEntityEventParams> { }
