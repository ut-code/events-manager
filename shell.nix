{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = [
    pkgs.bun
    # workerd doesn't work in NixOS
    # pkgs.wrangler # ... cannot build on unstable
  ];
}
