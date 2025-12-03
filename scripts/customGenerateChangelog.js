const {
  default: createGithubChangelog,
} = require('@changesets/changelog-github');

module.exports = async function changelog({ changesets, releases, options }) {
  const originalChangelog = await createGithubChangelog({
    changesets,
    releases,
    options,
  });

  const version = releases[0]?.name || 'unreleased';

  return `# Release ${version}\n\n${originalChangelog}`;
};
