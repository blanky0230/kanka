{ pkgs, lib, config, inputs, ... }:

{
  # Project name
  name = "mf-mocomation";

  # Environment variables
  env = { NODE_ENV = "development"; };

  # Required packages
  packages = with pkgs; [ bun biome git ];

  # Enable TypeScript language support
  languages.typescript.enable = true;

  # Helpful scripts
  scripts = { };

  # Welcome message and helpful information
  enterShell = ''
    echo "🚀 Kanka API Client development environment activated"
    echo "Available commands:"
    echo "  - bun: JavaScript/TypeScript runtime"
    echo "  - tsc: TypeScript compiler"
    git --version
  '';

  # Tests
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
    bun --version
    tsc --version
  '';

  # See full reference at https://devenv.sh/reference/options/
}
