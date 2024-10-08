# Development

## fix.sh

If you want to use rbenv/pyenv/etc to manage versions of tools,
there's a `fix.sh` script which may be what you'd like to install
dependencies.

## Overcommit

This project uses [overcommit](https://github.com/sds/overcommit) for
quality checks.  `bundle exec overcommit --install` will install it.

## direnv

This project uses direnv to manage environment variables used during
development.  See the `.envrc` file for detail.

## Run Chrome extension from local checkout

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose the [dist/chrome-extension](./dist/chrome-extension) directory

{% if cookiecutter.asana_api == 'yes' -%}
## Interactive development with Asana API

1. Save off the configured Asana client object in asana-base.ts#fetchClient():
   ```TypeScript
   const w: any = window;
   w.savedClient = fetchedClient;
  ```
2. Open up Extensions | {{cookiecutter.project_name}}
3. Click reload icon
4. Invoke filer on something
5. Save off the client in the Chrome DevTools console before the background session expires:
   ```TypeScript
   client = savedClient;
   ```
6. You can now invoke the methods from [node-asana](https://github.com/Asana/node-asana/tree/master/lib/resources):
   ```TypeScript
   stories = await client.stories.getStoriesForTask('1234);
   ```
{%- endif %}

## Initial release to Chrome Web Store

1. `make clean && make`
1. Load resulting `dist/chrome-extension` directory into local [Chrome](chrome://extensions/) and test.
1. Finalize [promotional image](docs/{{cookiecutter.project_slug}}.paint).
1. Stage the .paint file in git.
1. File | Save As... | png | `{{cookiecutter.project_slug}}-440x280.png` | Save
1. Plan out what screenshots you'd like to have in the gallery
1. Generate 1280x800 (or scaled up) screenshots and save as
   `docs/screenshot-1-raw.png` and so on.
1. Stage the screenshot raw files in git.
1. Add any annotations and save `docs/screenshot-1.paint` and so on.
   Open a similar `.paint` from a sibling project to copy and paste
   the annotation text to keep to the same style.
1. Stage the screenshot paint files in git.
1. File | Save As... | png | `docs/screenshot-1.png` (and so on) | Save
1. Image | Adjust Size... | Scale proportionally ☑ | Resample image ☑
   | Get to 1280x800 (or just under if ratio isn't right) | OK
1. Use adjust size to add transparent border until exactly as 1200x800
   (don't 'Scale proportionally' or 'Resample image' this time) | OK
1. Stage `screenshot-1.png` (and so on) in git.
1. Ensure `docs/screenshot-1.png` is scaled to 1280x800 with `file` command
1. Upload [package.zip](./package.zip) to the [developer dashboard](https://chrome.google.com/u/1/webstore/devconsole/d34ba2e8-8b5a-4417-889e-4047c35522d0) as `apiology-cws` user and save as a draft.
1. Add Description based on README - manually translate from markdown
   to text, but adjust README as needed to try to keep the rest synced
   up.
1. Walk through 'Store listing' items.
1. Fill in answers in 'Privacy practices' section
1. Fill in answers in 'Payments & distribution' section
1. Save draft
1. ... | Preview
1. Review carefully
1. Fix any issues spotted and repeat
1. PR related changes in here
1. Submit for review
1. Wait for approval
1. Update README.md with CWS icon linking to listing after the first paragraph - example: `[![Available in the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png)](WEBSTORE LINK HERE)`
1. Move 'Installing' in README.md to 'Installing local version' in DEVELOPMENT.md
1. Update README.md with screenshots - example: `<img src="./docs/screenshot-1.png" alt="screenshot showing Asana task description and repeating above keystrokes" height="400"/>`
{% if cookiecutter.options == 'yes' -%}
1. Update options.html link in README.md
{% endif -%}
1. Drop this section

## Releasing to Chrome Web Store

1. Update screenshots in `docs/` for any new features
1. Update [README.md](./README.md) with new screenshots
1. PR screenshot updates in
1. `git stash && git checkout main && git pull`
1. Bump the version in `static/chrome-extension/manifest.json` locally.
1. `git commit -m "Bump version" static/chrome-extension/manifest.json`
1. `git push && make clean && make`
1. Update [package.zip](./package.zip) in [developer dashboard](https://chrome.google.com/u/1/webstore/devconsole/d34ba2e8-8b5a-4417-889e-4047c35522d0) as `apiology-cws` user.
1. Upload any new screenshots
1. Update description to match current README.md - manually translate
   from markdown to text.
1. Save draft
1. ... | Preview
1. [Publish](https://developer.chrome.com/docs/webstore/update/)
