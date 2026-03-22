import { defineConfig } from "astro/config";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repository.endsWith(".github.io");
const fallbackSite = isUserSite
  ? `https://${repository}`
  : repository
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${repository}`
    : "https://example.com";

function resolveSiteUrl(value) {
  if (!value) {
    return fallbackSite;
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return fallbackSite;
  }
}

const site = resolveSiteUrl(process.env.SITE_URL);
const base = process.env.BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : "/");

export default defineConfig({
  site,
  base,
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
