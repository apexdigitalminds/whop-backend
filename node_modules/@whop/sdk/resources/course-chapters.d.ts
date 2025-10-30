import { APIResource } from "../core/resource.js";
import { APIPromise } from "../core/api-promise.js";
import { CursorPage, type CursorPageParams, PagePromise } from "../core/pagination.js";
import { RequestOptions } from "../internal/request-options.js";
export declare class CourseChapters extends APIResource {
    /**
     * Creates a new course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.create({
     *   course_id: 'cors_xxxxxxxxxxxxx',
     * });
     * ```
     */
    create(body: CourseChapterCreateParams, options?: RequestOptions): APIPromise<CourseChapter>;
    /**
     * Retrieves a course chapter by ID
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.retrieve(
     *   'chap_xxxxxxxxxxxxx',
     * );
     * ```
     */
    retrieve(id: string, options?: RequestOptions): APIPromise<CourseChapter>;
    /**
     * Updates a course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.update(
     *   'chap_xxxxxxxxxxxxx',
     *   { title: 'title' },
     * );
     * ```
     */
    update(id: string, body: CourseChapterUpdateParams, options?: RequestOptions): APIPromise<CourseChapter>;
    /**
     * Lists chapters for a course
     *
     * Required permissions:
     *
     * - `courses:read`
     *
     * @example
     * ```ts
     * // Automatically fetches more pages as needed.
     * for await (const courseChapterListResponse of client.courseChapters.list(
     *   { course_id: 'cors_xxxxxxxxxxxxx' },
     * )) {
     *   // ...
     * }
     * ```
     */
    list(query: CourseChapterListParams, options?: RequestOptions): PagePromise<CourseChapterListResponsesCursorPage, CourseChapterListResponse>;
    /**
     * Deletes a course chapter
     *
     * Required permissions:
     *
     * - `courses:update`
     *
     * @example
     * ```ts
     * const courseChapter = await client.courseChapters.delete(
     *   'chap_xxxxxxxxxxxxx',
     * );
     * ```
     */
    delete(id: string, options?: RequestOptions): APIPromise<CourseChapterDeleteResponse>;
}
export type CourseChapterListResponsesCursorPage = CursorPage<CourseChapterListResponse>;
/**
 * A chapter from the courses app
 */
export interface CourseChapter {
    /**
     * The ID of the chapter. Looks like chap_XXX
     */
    id: string;
    /**
     * The lessons in this chapter
     */
    lessons: Array<CourseChapter.Lesson>;
    /**
     * The order of the chapter within its course
     */
    order: number;
    /**
     * The title of the chapter
     */
    title: string;
}
export declare namespace CourseChapter {
    /**
     * A lesson from the courses app
     */
    interface Lesson {
        /**
         * The ID of the lesson
         */
        id: string;
        /**
         * The order of the lesson within its chapter
         */
        order: number;
        /**
         * The title of the lesson
         */
        title: string;
    }
}
/**
 * A chapter from the courses app
 */
export interface CourseChapterListResponse {
    /**
     * The ID of the chapter. Looks like chap_XXX
     */
    id: string;
    /**
     * The order of the chapter within its course
     */
    order: number;
    /**
     * The title of the chapter
     */
    title: string;
}
/**
 * Represents `true` or `false` values.
 */
export type CourseChapterDeleteResponse = boolean;
export interface CourseChapterCreateParams {
    /**
     * The ID of the course to create the chapter in
     */
    course_id: string;
    /**
     * The title of the chapter
     */
    title?: string | null;
}
export interface CourseChapterUpdateParams {
    /**
     * The title of the chapter
     */
    title: string;
}
export interface CourseChapterListParams extends CursorPageParams {
    /**
     * The ID of the course
     */
    course_id: string;
    /**
     * Returns the elements in the list that come before the specified cursor.
     */
    before?: string | null;
    /**
     * Returns the first _n_ elements from the list.
     */
    first?: number | null;
    /**
     * Returns the last _n_ elements from the list.
     */
    last?: number | null;
}
export declare namespace CourseChapters {
    export { type CourseChapter as CourseChapter, type CourseChapterListResponse as CourseChapterListResponse, type CourseChapterDeleteResponse as CourseChapterDeleteResponse, type CourseChapterListResponsesCursorPage as CourseChapterListResponsesCursorPage, type CourseChapterCreateParams as CourseChapterCreateParams, type CourseChapterUpdateParams as CourseChapterUpdateParams, type CourseChapterListParams as CourseChapterListParams, };
}
//# sourceMappingURL=course-chapters.d.ts.map