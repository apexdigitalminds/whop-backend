// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Forums extends APIResource {
    /**
     * Retrieves a forum
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    retrieve(id, options) {
        return this._client.get(path `/forums/${id}`, options);
    }
    /**
     * Updates a forum
     *
     * Required permissions:
     *
     * - `forum:moderate`
     */
    update(id, body = {}, options) {
        return this._client.patch(path `/forums/${id}`, { body, ...options });
    }
    /**
     * Lists forums inside a company
     *
     * Required permissions:
     *
     * - `forum:read`
     */
    list(query, options) {
        return this._client.getAPIList('/forums', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=forums.mjs.map