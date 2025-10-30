import { APIResource } from "../core/resource.js";
import * as Shared from "./shared.js";
import { APIPromise } from "../core/api-promise.js";
import { CursorPage, type CursorPageParams, PagePromise } from "../core/pagination.js";
import { RequestOptions } from "../internal/request-options.js";
export declare class Forums extends APIResource {
    /**
     * Retrieves a forum
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    retrieve(id: string, options?: RequestOptions): APIPromise<Shared.Forum>;
    /**
     * Updates a forum
     *
     * Required permissions:
     *
     * - `forum:moderate`
     */
    update(id: string, body?: ForumUpdateParams | null | undefined, options?: RequestOptions): APIPromise<Shared.Forum>;
    /**
     * Lists forums inside a company
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    list(query: ForumListParams, options?: RequestOptions): PagePromise<ForumListResponsesCursorPage, ForumListResponse>;
}
export type ForumListResponsesCursorPage = CursorPage<ForumListResponse>;
/**
 * Represents a forum feed
 */
export interface ForumListResponse {
    /**
     * The unique identifier for the entity
     */
    id: string;
    /**
     * The email notification preference for this forum
     */
    email_notification_preference: Shared.EmailNotificationPreferences;
    /**
     * The experience for this forum
     */
    experience: ForumListResponse.Experience;
    /**
     * Who can comment on this forum
     */
    who_can_comment: Shared.WhoCanCommentTypes;
    /**
     * Who can post on this forum
     */
    who_can_post: Shared.WhoCanPostTypes;
}
export declare namespace ForumListResponse {
    /**
     * The experience for this forum
     */
    interface Experience {
        /**
         * The unique ID representing this experience
         */
        id: string;
        /**
         * The written name of the description.
         */
        name: string;
    }
}
export interface ForumUpdateParams {
    /**
     * Email notification preference option for a forum feed
     */
    email_notification_preference?: Shared.EmailNotificationPreferences | null;
    /**
     * Who can comment on a forum feed
     */
    who_can_comment?: Shared.WhoCanCommentTypes | null;
    /**
     * Who can post on a forum feed
     */
    who_can_post?: Shared.WhoCanPostTypes | null;
}
export interface ForumListParams extends CursorPageParams {
    /**
     * The ID of the company to list forums for
     */
    company_id: string;
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
    /**
     * If provided, only forums connected to this product are returned
     */
    product_id?: string | null;
}
export declare namespace Forums {
    export { type ForumListResponse as ForumListResponse, type ForumListResponsesCursorPage as ForumListResponsesCursorPage, type ForumUpdateParams as ForumUpdateParams, type ForumListParams as ForumListParams, };
}
//# sourceMappingURL=forums.d.ts.map