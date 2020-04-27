# OpenGate

Command-line Client for the [VPN Gate](https://www.vpngate.net/) Project.

![npm](https://img.shields.io/npm/dw/opengate-cli?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/opengate-cli?style=flat-square) ![NPM](https://img.shields.io/npm/l/opengate-cli?style=flat-square)

## Getting Started

### Prerequisites

- **Node** and **NPM** should be installed
- **Openvpn** CLI edition should be installed

```
apt install openvpn (ubuntu)

brew install openvpn (MacOs)
```

### Installing

- If you have **npm** installed

```
npm i -g opengate-cli
```

- You can use install script from the project

```
./install.sh
```

### Usage

```
$ opengate -h
Usage: opengate [options]

Options:
  --version, -v     Show version number                                [boolean]
  --help, -h        Show help                                          [boolean]
  --background, -b  run vpn in background
  --reconnect, -r   reconnect to last openvpn server
  --log, -l         openvpn logs
  --kill, -k        kill openvpn's backgound process

```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Authors

- **Parsa Samadnejad** - [TroddenSpade](https://github.com/troddenspade)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [VPN Gate](https://www.vpngate.net/) Project
