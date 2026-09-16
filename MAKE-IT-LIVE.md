# Make it live! 🚀

A super simple walkthrough. No jargon, no code reading. Just follow the numbers.

**What we're doing:** your website lives on one computer today (GitHub). We're
moving it to *your own server* and giving it a nice address like
`labs.your-website.page`. Coolify is the robot that does the hard part.

```
   your friends              your domain              your server
  ┌──────────────┐        ┌──────────────┐        ┌─────────────────┐
  │ open a link  │───────▶│ labs.        │───────▶│ Coolify builds  │
  │ in a browser │        │ yoursite.page│        │ & shows the app │
  └──────────────┘        └──────────────┘        └─────────────────┘
                          (you tell it     where        (you feed it the
                           the server is)               GitHub code once)
```

You will need: **15 minutes**. Nothing to install. Nothing to type in a terminal.

---

## Step 0 — Fill in your 3 blanks ✏️

Write these down. Every step below uses them.

| Blank | What it is | My answer |
| --- | --- | --- |
| **A** | Your website's name (the part you bought) | `________________.page` |
| **B** | The nickname for the new address (one short word) | `________________` |
| **C** | Your server's phone number (its IP address) | `________________` |

Then your finished address is: **`B.A`** → e.g. `labs.your-website.page`.

> **Where do I find C (my server's IP)?** Open Coolify → **Servers** → click
> your server → **General**. It says something like `203.0.113.10`. That's it.
> (Four numbers with dots between them.) Missing it? On the server itself type
> `curl ifconfig.me` and press Enter.

> **What is a "subdomain", really?** It's a free extra address on a domain you
> already own. You don't buy anything. Think of your domain like a street
> address: the subdomain is just an apartment number. Adding one **never**
> breaks your main website.

---

## Step 1 — Tell the internet where your server is 🌍

Do this first, because the internet needs a few minutes to spread the news.

1. Open the website where you bought your domain (Namecheap, GoDaddy,
   Cloudflare, Porkbun, Google Domains…). Log in.
2. Find **DNS** (sometimes called **DNS Records** or **Manage DNS**).
3. Click **Add Record** (or **Add New Record**).
4. Fill it in **exactly** like this:

   | Box on screen | Type this |
   | --- | --- |
   | **Type** | `A` |
   | **Name** / **Host** / **Hostname** | your blank **B** — just the short word, e.g. `labs` |
   | **Value** / **Points to** / **Target** / **Address** | your blank **C** — e.g. `203.0.113.10` |
   | **TTL** | leave it alone (or "Automatic") |

5. Click **Save**.

⚠️ **Two traps that catch everybody:**

- In the **Name** box, put **only** the short word (`labs`). If you type the
  whole address (`labs.your-website.page`) some registrars will create
  `labs.your-website.page.your-website.page` — a broken address nobody can visit.
  Just `labs`.
- **Don't touch the records you already have.** You're *adding* one record, not
  editing or deleting. Leave anything that mentions `@`, `www`, or your email
  exactly as it is.

✅ **You should see:** a new row in the list, looking like
`A | labs | 203.0.113.10`. No error, no warning.

---

## Step 2 — Put the good code on the `main` shelf 📚

Coolify copies your code from GitHub's `main` branch. Right now the fixed code
is on a different shelf, so we do one click.

1. Go to **https://github.com/PlanExServices/DelQuroLabs/pull/2**
2. Click the green **Merge pull request** button.
3. Click **Confirm merge**.

✅ **You should see:** a purple **Merged** badge.

> *Don't want to merge yet?* In Step 3, choose branch
> `arena/01a0abda-delqurolabs` instead of `main`. Everything else is identical.

---

## Step 3 — Tell Coolify about your website 🤖

1. Open Coolify and your project.
2. Click **+ New Resource** (or **+ Add Resource**).
3. Choose **Public Repository**.

   *(Because your code is public, no passwords or keys are needed. Nice.)*

4. Paste this in the repository box:

   ```
   https://github.com/PlanExServices/DelQuroLabs
   ```

5. Click **Continue** / **Check Repository**.
6. Set these two boxes:

   | Setting | Type this |
   | --- | --- |
   | **Branch** | `main` |
   | **Build Pack** | `Docker Compose` |

7. Look for **Docker Compose Location** and put:

   ```
   /docker-compose.coolify.yml
   ```

8. Leave **Base Directory** as `/`. Click **Continue**.

✅ **You should see:** a new page for your app, with tabs like
**Configuration**, **Deployments**, **Logs**.

---

## Step 4 — Type your new address 🏠

Still on that app page:

1. Click **Configuration** (sometimes shown as **General**).
2. Find the **Domains** area. Because this is a Compose app, Coolify shows one
   box per service. Find the row for the service named **`web`**.
3. In the **`web`** row, type your full address **with `https://` in front**:

   ```
   https://labs.your-website.page
   ```

   (Use your own blank **B** and **A**. Keep the `https://` — that's what makes
   Coolify turn on the padlock 🔒 for you.)

4. Click **Save**.

> If Coolify seems unsure which port to use, type it on the end instead:
> `https://labs.your-website.page:8080` — that just means "the app inside is
> listening on door 8080".

✅ **You should see:** the address saved in the box.

---

## Step 5 — Add two settings 📝

Same page, find **Environment Variables** (in the **Configuration** tab):

| Name | Value |
| --- | --- |
| `VITE_SITE_URL` | `https://labs.your-website.page/` *(your address, with a `/` at the end)* |
| `TZ` | `America/New_York` *(your time zone)* |

Click **Save** / **+ Add** after each one.

*(This one just makes the links inside the site point at your new home instead
of the old GitHub address. Nothing breaks if you skip it.)*

---

## Step 6 — Press the big button 🎉

1. Click **Deploy** (the button may say **Redeploy**).
2. Click **Deployments** (or **Logs**) to watch it work.

✅ **You should see,** after 1–3 minutes:

- Lines of text scrolling, then **Finished** / a green **Success** badge
- Status turning **Running** / **Healthy** (green)
- A clickable link next to your address

❌ **If it says Failed**, jump to [If it doesn't work](#if-it-doesnt-work-) at
the bottom. Don't panic — it's almost always one typo.

---

## Step 7 — Wait for the padlock 🔒

Coolify asks Let's Encrypt for a free certificate all by itself. This can take
**1 to 5 minutes** the first time.

Open your new address in a browser: **https://labs.your-website.page**

✅ **You should see:** a dark page with the words *"Everyday apps, obsessively
crafted."* and three phone pictures, and a 🔒 padlock in the address bar.

If it shows a scary "not secure" warning, wait 5 more minutes and refresh. If it
still does, see below.

---

## Step 8 — Check it properly ✔️

Open these two links:

1. `https://labs.your-website.page` → the purple DelQuro page loads, pictures
   and all.
2. `https://labs.your-website.page/healthz` → shows the two letters **`ok`**.

Then do the fun one: **send the link to a friend** and have them open it on
their phone. Different network, so you *know* it's really live.

---

## Step 9 — Turn off the old door 🚪

Right now the old GitHub copy is still serving a broken, half-finished version.
Close it so nobody lands there by accident.

1. Go to **https://github.com/PlanExServices/DelQuroLabs/settings/pages**
2. Under **Source**, choose **None**.
3. Click **Save**.

✅ **You should see:** a message that the site is no longer published. Your own
address keeps working — it doesn't live on GitHub anymore.

---

## Step 10 — Later, when you change something ✨

You don't touch Coolify again. It watches the repo.

1. Change the text or pictures.
2. Save it to the **`main`** branch on GitHub.
3. Coolify notices, rebuilds, and swaps in the new version by itself — usually
   in about a minute, with no downtime.

To see it happen: **Coolify → your app → Deployments**.

---

## If it doesn't work 😅

| What you see | What it means | The fix |
| --- | --- | --- |
| "This site can't be reached" / blank page | The internet hasn't learned your server's address yet, or the record has a typo | Wait 15 minutes. Then open **Step 1** and check: Type is `A`, Name is just `labs`, Value is your server IP |
| "not secure" / certificate warning | The padlock isn't ready yet | Wait 5 minutes, refresh. Still bad → Coolify has to reach your server on ports **80** and **443**; check your server's firewall isn't blocking them |
| Coolify says **Unhealthy** | The app inside started, but Coolify can't say hello | Open the **Domains** box and put `:8080` on the end of your address, then **Redeploy** |
| Coolify says **Failed** during build | Typo in the setup boxes | Check **Docker Compose Location** is exactly `/docker-compose.coolify.yml` — that leading `/` matters! |
| **502** / "no available server" | Coolify doesn't know which door to knock on | Add `:8080` to the end of your address in the **Domains** box, then **Redeploy** |
| Page loads but pictures are missing | The build used the wrong path | Make sure `VITE_BASE` is `/` in **Environment Variables**, then **Redeploy** |
| The main website broke! | You edited or deleted a record in Step 1 instead of adding one | Go back to DNS and put the old record back exactly as it was (`@` or `www`). Adding a subdomain can never break the main site |
| It worked, then stopped | Something on the server changed | **Coolify → your app → Deployments → Redeploy** usually fixes it |

**The one thing to remember:** after changing *any* setting in Coolify, press
**Redeploy**. Settings are baked in when the app is built, like baking a cake —
change the recipe, bake a new cake.

---

## Words other guides use (so you're not lost) 🧠

| Word | Plain meaning |
| --- | --- |
| **Subdomain** | A free extra address on a domain you own (`labs.yoursite.page`) |
| **DNS** | The internet's phone book: it turns a name into a server |
| **A record** | One line in that phone book: "this name → this server number" |
| **Deploy** | Build the app and put it on the server, live |
| **Redeploy** | Do it again (needed after changing a setting) |
| **Container** | A tidy sealed box holding just your app, plus everything it needs |
| **Traefik** | Coolify's doorman: sends visitors to the right box and does the padlock |
| **Build pack** | How Coolify should build your code — ours is Docker Compose |
| **Health check** | A tiny "are you awake?" ping, at `/healthz` |
| **Environment variable** | A named setting you type into Coolify instead of into code |

---

**Bigger, more technical version of this guide:** [DEPLOY.md](DEPLOY.md).
