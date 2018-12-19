# How to contribute

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free).
* Submit a GitHub Issue for your issue if one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.
* Fork the repository on GitHub.

## Making Changes

* Create a topic branch from where you want to base your work.
  * This is usually the develop branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on devekop, run `git flow feature start <feature_name>` for a new feature or `git flow bugfix start <feature_name>` for a bug fix. Please avoid working directly on the
    fix/master/my_contribution devekop`. Please avoid working directly on the
    `master` or `develop` branch.
  * Read more on Gitflow [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
* Make commits of logical and atomic units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format. If the commit
  addresses an issue filed in the [Github Issues](https://github.com/Christian-Seiler/ws3C/issues), start
  the first line of the commit with the issue number in parentheses.

  ```
      (PUP-1234) Make the example in CONTRIBUTING imperative and concrete

      Without this patch applied the example commit message in the CONTRIBUTING
      document is not a concrete example. This is a problem because the
      contributor is left to imagine what the commit message should look like
      based on a description rather than an example. This patch fixes the
      problem by making the example concrete and imperative.

      The first line is a real-life imperative statement with a ticket number
      from our issue tracker. The body describes the behavior without the patch,
      why this is a problem, and how the patch fixes the problem when applied.
  ```

When adding user-facing strings to your work, follow these guidelines:

* Use full sentences. Strings built up out of concatenated bits are hard to translate.
* Use string formatting instead of interpolation. Use the hash format and give good names to the placeholder values that can be used by translators to understand the meaning of the formatted values.
  For example: `_('Creating new user %{name}.') % { name: user.name }`
* Use `n_()` for pluralization. (see gettext gem docs linked above for details)

It is the responsibility of contributors and code reviewers to ensure that all
user-facing strings are marked in new PRs before merging.

## Making Trivial Changes

For changes of a trivial nature, it is not always necessary to create a new
issue. In this case, it is appropriate to start the first line of a
commit with one of  `(docs)`, `(maint)`, or `(packaging)` instead of an issue
number.

If an issue exists for the documentation commit, you can include it
after the `(docs)` token.

```
    (docs)(DOCUMENT-000) Add docs commit example to CONTRIBUTING

    There is no example for contributing a documentation commit
    to the Puppet repository. This is a problem because the contributor
    is left to assume how a commit of this nature may appear.

    The first line is a real-life imperative statement with '(docs)' in
    place of what would have been the PUP project ticket number in a
    non-documentation related commit. The body describes the nature of
    the new documentation or comments added.
```

For commits that address trivial repository maintenance tasks or packaging
issues, start the first line of the commit with `(maint)` or `(packaging)`,
respectively.

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the Christian Seiler Services organization.
* Update your Github Issuet to mark that you have submitted code and are ready
  for it to be reviewed (Status: Ready for Merge).
  * Include a link to the pull request in the ticket.
* After feedback has been given we expect responses within two days. After two
  days we may close the pull request if it isn't showing any activity.

### Summary

* Changes resulting in test pipeline failures will be reverted if they cannot
  be resolved within one business day.

## Additional Resources

* [General GitHub documentation](https://help.github.com/)
* [GitHub pull request documentation](https://help.github.com/articles/creating-a-pull-request/)
