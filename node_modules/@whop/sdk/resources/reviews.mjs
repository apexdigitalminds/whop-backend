// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../core/resource.mjs";
import { CursorPage } from "../core/pagination.mjs";
import { path } from "../internal/utils/path.mjs";
export class Reviews extends APIResource {
    /**
     * Retrieve a review by its ID
     */
    retrieve(id, options) {
        return this._client.get(path `/reviews/${id}`, options);
    }
    /**
     * List all reviews
     */
    list(query, options) {
        return this._client.getAPIList('/reviews', (CursorPage), { query, ...options });
    }
}
//# sourceMappingURL=reviews.mjs.map