// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Entries extends APIResource {
    /**
     * Retrieves an entry by ID
     *
     * Required permissions:
     *
     * - `plan:waitlist:read`
     * - `member:email:read`
     */
    retrieve(id, options) {
        return this._client.get(path `/entries/${id}`, options);
    }
    /**
     * Lists entries for a company
     *
     * Required permissions:
     *
     * - `plan:waitlist:read`
     * - `member:email:read`
     */
    list(query, options) {
        return this._client.getAPIList('/entries', (CursorPage), { query, ...options });
    }
    /**
     * Approve an entry
     *
     * Required permissions:
     *
     * - `plan:waitlist:manage`
     */
    approve(id, options) {
        return this._client.post(path `/entries/${id}/approve`, options);
    }
    /**
     * Deny an entry
     *
     * Required permissions:
     *
     * - `plan:waitlist:manage`
     * - `plan:basic:read`
     * - `member:email:read`
     */
    deny(id, options) {
        return this._client.post(path `/entries/${id}/deny`, options);
    }
}
//# sourceMappingURL=entries.mjs.map