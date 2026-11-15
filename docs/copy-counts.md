# Copy counts

Every click on **Copy** or **Copy for AI** in a component preview sends a small beacon to `/api/copy` (`src/pages/api/copy.ts`). The Worker writes one data point to the `hyperui_copies` [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) dataset. Nothing about the visitor is stored: no IP address, user agent or cookie.

| Column    | Value                                                               |
| --------- | ------------------------------------------------------------------- |
| `index1`  | `{category}/{slug}`, e.g. `marketing/footers`                       |
| `blob1`   | Category: `application`, `marketing`, `neobrutalism` or `templates` |
| `blob2`   | Slug, e.g. `footers`                                                |
| `blob3`   | Variant number, e.g. `3`                                            |
| `blob4`   | `light` or `dark`                                                   |
| `blob5`   | `html` (Copy) or `ai` (Copy for AI)                                 |
| `double1` | Always `1`                                                          |

Analytics Engine keeps data for three months, so export the counts each month if you want a longer history.

## Querying

Create an API token with the **Account Analytics: Read** permission, then use the SQL API. Analytics Engine can sample busy datasets, so count with `SUM(_sample_interval)`, not `COUNT()`.

Copies per variant over the last 30 days:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/analytics_engine/sql" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --data "SELECT blob1 AS category, blob2 AS slug, blob3 AS variant, SUM(_sample_interval) AS copies FROM hyperui_copies WHERE timestamp > NOW() - INTERVAL '30' DAY GROUP BY category, slug, variant ORDER BY copies DESC"
```

Copies per page, split by Copy and Copy for AI:

```sql
SELECT index1 AS page, blob5 AS kind, SUM(_sample_interval) AS copies
FROM hyperui_copies
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY page, kind
ORDER BY copies DESC
```

Copies during local development (`pnpm dev` or `wrangler dev`) go to a local dataset and never reach Cloudflare.
