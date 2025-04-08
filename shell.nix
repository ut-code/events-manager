{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = [
    pkgs.bun
    pkgs.nodejs-slim # drizzle errors for some random reason, if we don't have this
    # workerd doesn't work in NixOS
    # pkgs.wrangler # ... cannot build on unstable
    pkgs.litecli
  ];
}
