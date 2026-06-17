# n8n-nodes-baidu-search-api

An [n8n](https://n8n.io/) community node that searches Baidu and returns structured organic results: position, title, link, and snippet. It is backed by the [Baidu Search API](https://apify.com/johnvc/Baidu-Search-Scraper?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns one item per organic result with the position, title, link, and snippet. It also works as an **AI Agent tool**, so an agent can run Baidu searches on demand. This is useful for **China-market SEO** and research.

- Search Baidu and get clean organic results
- Emulate desktop, mobile, or tablet
- Control results per page and how many pages to fetch
- Choose how much data to return per result: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-baidu-search-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Baidu Search** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**Search Result > Search** returns organic results for a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to search for. Required. |
| Device | Desktop, Mobile, or Tablet. |
| Results per Page | How many results to request per page. |
| Maximum Pages | How many result pages to fetch. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

Each organic result is returned as its own n8n item. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `position`, `title`, `link`, and `snippet`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns for each result, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `position` | integer | Rank of the result on the page |
| `title` | string | Result title |
| `link` | string | Result URL |
| `snippet` | string | Result snippet text |

## Example workflows

### 1. Track Baidu rankings for a keyword

1. **Schedule Trigger**: run daily.
2. **Baidu Search**: Search Query your keyword, Output `Simplified`.
3. **Filter**: keep the item whose `link` matches your domain; log its `position` over time.

### 2. Collect Baidu results into a sheet

1. **Manual Trigger**.
2. **Baidu Search**: your query, Maximum Pages `3`.
3. **Google Sheets**: append each result's `position`, `title`, and `link`.

### 3. Let an AI Agent search Baidu

1. **AI Agent** node.
2. Attach **Baidu Search** as a tool.
3. Ask the agent a question; it calls the node (in Simplified mode) and answers using live Baidu results.

## Pricing

This node calls the [Baidu Search API](https://apify.com/johnvc/Baidu-Search-Scraper?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/Baidu-Search-Scraper?fpr=9n7kx3) for current rates.

## Resources

- [Baidu Search API on Apify](https://apify.com/johnvc/Baidu-Search-Scraper?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-baidu-search-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
