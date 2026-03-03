# CLI Reference

## `validate`

```
lufa-ds-cli validate [theme-file] [options]

Arguments:
  theme-file                   Path to the theme CSS file to validate

Options:
  --a11y                       Run WCAG AA contrast check only
  --format                     Run format check only
  --completeness               Run completeness check only
  -d, --dir <directory>        Validate all *.css files in a directory
  -V, --version                Output the version number
  -h, --help                   Display help for command
```

When no option is passed, all three checks run (completeness + format + a11y).
Options `--a11y`, `--format`, and `--completeness` are mutually exclusive.

## `template`

```
lufa-ds-cli template [level] [options]

Arguments:
  level                        Template level: starter (default), extended, advanced

Options:
  -o, --output-name <name>     Output file name without the .css extension
                               Prompted interactively if not provided
  -h, --help                   Display help for command
```
