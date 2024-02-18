---
title: WSL Troubleshooting
date: 2020-12-01
published: true
tags: ["WSL"]
series: false
canonical_url: false
summary: Sequence of operations to find connection issues and fix them in WSL.
language: en
---

## Related Resources

- [[WSL2] Checkpoint VPN breaks network connectivity](https://github.com/microsoft/WSL/issues/4246)
- [Networking issues while using VPN](https://github.com/microsoft/WSL/issues/416)
- [No network connection in any distribution under WSL 2](https://github.com/microsoft/WSL/issues/5336)

## Introduction

This document is written in our company in order to solve the issues with WSL2, CheckPoint VPN and other self-hosted services. **You're welcome to suggest more fixes** in this subject to make this document more general.

## Network and DNS Troubleshooting

Try each command by their order to better find the correct problem.

### Try `ping 8.8.8.8`

If it failed it means that **you don’t have an internet connection** at all.

See [this video](https://www.youtube.com/watch?v=yR2NsssY7z8) and/or [[WSL2] Checkpoint VPN breaks network connectivity (comment)](https://github.com/microsoft/WSL/issues/4246#issuecomment-691561185) to solve this issue.

Probably the base thing is to connect to the _VPN_ before _WSL2 Network Adapter_.

1. Open your WSL Terminal.
2. Disconnect from the VPN (if connected)
3. Disable the _WSL2 Network Adapter_ by `netsh interface set interface "vEthernet (WSL)" disable` or by `Get-NetAdapter -Name "vEthernet (WSL)" | Disable-NetAdapter`
4. Please make sure it disabled by `$(Get-NetAdapter -Name "vEthernet (WSL)").Status` is `Disabled`
5. Connect to the VPN
6. Enable the _WSL2 Network Adapter_ by `netsh interface set interface "vEthernet (WSL)" enable` or `Get-NetAdapter -Name "vEthernet (WSL)" | Enable-NetAdapter`
7. Validate the ping 8.8.8.8 in WSL again.

### Try `ping google.com`

If it failed it means that you have a **problem with the DNS**. You need to update the `/etc/resolve.conf` with your DNS addresses.

Run this command in PowerShell: `Get-DnsClientServerAddress -AddressFamily IPv4 | Select-Object -ExpandPropert ServerAddresses`, then take the addresses from that command, clear the `resolve.conf` file and set the first line `search {your domain}` and then the next line will be `nameserver {ip}`.

**Source:** you can use [this script](https://gist.github.com/matthiassb/9c8162d2564777a70e3ae3cbee7d2e95) (from [Networking issues while using VPN (comment)](https://github.com/microsoft/WSL/issues/416#issuecomment-407075002)) to auto-update the `resolve.conf`.

### Try `ping {internalIP}`

If it failed it means that you have a **problem with the VPN**.

### Try `ping {internal hostname}`

If it failed it means that you have a **problem with the internal DNS**.  
 Make sure you configured the DNS by the instructions in 2.

## Other connection issues

### Clone a git repo by SSH

If you’re trying to clone a private repo, you need your credentials that usually configured in the Windows system.

My suggestion is to use SSH, here is an instruction to configure the SSH keys in TFS:

- Create an SSH key in WSL with `ssh-keygen -C your.name@company.com`, and paste the `~/.ssh/id_rsa.pub` in `{tfs-host}/tfs/_details/security/keys`

- If you are getting an error with `diffie-hellman-group1-sha1,diffie-hellman-group14-sha1` (I don’t remember the original error), create/edit the `~/.ssh/config` file with:

  ```
  Host tfs2018app
      KexAlgorithms diffie-hellman-group1-sha1,diffie-hellman-group14-sha1
  ```

- Get the SSH repository URL.

- Clone.

> You can try to use the [Windows Git Credential Manager](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-git#git-credential-manager-setup) with/instead of using SSH, and share the consequences in this document.

### npm network timeout

If you are getting the next error when you are trying to use `npm`, please share the solution with us:

```
npm ERR! network timeout at: https://registry.npmjs.org/@babel/plugin-proposal-optional-catch-binding/-/plugin-proposal-optional-catch-binding-7.10.4.tgz
```

You can try this:

- run `Get-NetIPInterface` on windows to find `MTU` value for VPN network adapter (mine was 1350)
- run `sudo ifconfig eth0 mtu 1350` or `sudo ip link set dev eth0 mtu 1350` inside WSL to match eth0 `MTU` value with vpn network adapter value
