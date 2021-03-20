**[Hacker Paste](https://hackerpaste.hns.siasky.net)** is a one-of-a-kind text snippet sharing tool, secure by design and built for the decentralized web.

* Hacker Paste is **entirely in-browser**. There is no central server. Your data is not submitted to any intermediary processors. Everything that goes on in the app can be viewed in the source code in your browser. The app and its operations are highly transparent.
* Hacker Paste stores snippets to [Skynet](https://siasky.net), a decentralized content delivery network. All pastes generated in Hacker Paste, and the Hacker Paste app itself, can be **accessed on any Skynet portal.**
* Hacker Paste **encrypts all data** with AES encryption prior to being uploaded, using a securely generated encryption key that is kept in the snippet URL. The existence of this document is not recorded anywhere other than your list of saved pastes. The existence of the document and its contents are only known to you and anyone you share the URL with.

Why this matters:
* Share documents privately and discreetly with anyone with just a URL, no complicated encryption tools required.
* Decentralized storage and delivery means resistence to censorship and deplatforming. While public portals like [siasky.net](https://siasky.net) and [skyportal.xyz](https://skyportal.xyz) are available for convenience, anyone can operate their own Skynet portal and use Hacker Paste that way.
* No central app server means the app can't go down.

See for yourself:
* [Example document](https://hackerpaste.hns.siasky.net/#AAB0AzZ2_C2-lM9IFRVeP9-rzJHNrTEvEMuG2mg7ri4ZrQIOdMV8pl2h8XtEMuMeIN)
* [The same document but accessed through a different portal](https://hackerpaste.hns.skyportal.xyz/#AAB0AzZ2_C2-lM9IFRVeP9-rzJHNrTEvEMuG2mg7ri4ZrQIOdMV8pl2h8XtEMuMeIN)
* [Raw, encrypted text stored on Skynet](https://siasky.net/AAB0AzZ2_C2-lM9IFRVeP9-rzJHNrTEvEMuG2mg7ri4ZrQ)

## Features

* Syntax highlighting in any programming language you can think of
* Save pastes:
  * As one-time snapshots (i.e. saving again generates a new URL), with or without HTML embed code
  * Or, log in with [SkyID](https://sky-id.hns.siasky.net) (no personal information required) and save pastes with re-usable URLs to your "My Pastes" list

## Build and deploy instructions

1. `git clone https://github.com/harej/hackerpaste && cd hackerpaste`
2. `npm install`
3. `npx webpack`
4. The remaining steps are manual. Copy the `dist` and `static` folders, as well as `index.html` and `site.webmanifest`, into a new folder, perhaps named `hackerpaste-dist`.
5. Upload to Skynet using a portal such as [siasky.net](https://siasky.net) or use . Be sure to select the directory upload option.
6. Optional: associate the app deployment with a [Handshake](https://handshake.org) domain by using the [SkyDB Manager](https://dbaz.hns.siasky.net/) to generate a "SkyNS" URL. Set that SkyNS URL as a `TXT` record in your DNS manager of choice. (If you use [Namebase](https://namebase.io) to manage your domain, you can do this within Namebase.) Whenever you upload a new version of the app, update the skylink in the SkyDB Manager. This will save you from having to pay Handshake blockchain fees every time you update.
