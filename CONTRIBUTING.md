# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

Install the toolchain and workspace dependencies from the repository root:

```sh
mise install
mise exec -- yarn install --immutable
mise exec -- yarn pod
```

Start Metro with `yarn dev`. In a second terminal, run `yarn ios --simulator "PencilKit iPad"` or substitute an iOS simulator name from `xcrun simctl list devices available`. Use `mise exec --` before each command if your shell does not activate mise. Edit the native library through `example/ios/PencilKitExample.xcworkspace`. JavaScript changes reload through Metro. Rebuild the app after changing native code.

Run `yarn lint` to check JavaScript, Objective-C++ formatting, and TypeScript. Run `yarn build` to generate CommonJS, ES modules, and type declarations.

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Changesets and publishing

Run `yarn changeset` to describe a library change and choose its version bump. Commit the generated Markdown file with the change. For an example-only or CI change, use `yarn changeset --empty`. The example workspace is private.

CI checks the release plan on pull requests to `main` and `next`. The Release workflow opens a version PR that updates the package version, changelog, and lockfiles. Merging that PR publishes the library to npm and creates a GitHub release. Stable releases use `main`. To start a beta cycle on `next`, run `yarn changeset pre enter beta` and commit the generated prerelease state. Run `yarn changeset pre exit` before promoting the beta to `main`.

Configure npm trusted publishing for `mym0404/react-native-pencil-kit`, GitHub Actions workflow `release.yml`, with direct publish permission. Set the repository secret `GH_TOKEN` to a token with contents, pull request, and workflow permissions so version PRs trigger CI and release tags can reference workflow changes.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
