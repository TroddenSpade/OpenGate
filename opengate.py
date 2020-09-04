import requests
import os

print("   ____                      ______      __     ")
print("  / __ \____  ___  ____     / ____/___ _/ /____ ")
print(" / / / / __ \/ _ \/ __ \   / / __/ __ `/ __/ _ \\")
print("/ /_/ / /_/ /  __/ / / /  / /_/ / /_/ / /_/  __/")
print("\____/ .___/\___/_/ /_/   \____/\__,_/\__/\___/ ")
print("    /_/                                         ")
print("")

print("VPN Gate Academic Experiment Project is an online service as an academic research at Graduate School of University of Tsukuba, Japan.")
print("The purpose of this research is to expand the knowledge of 'Global Distributed Public VPN Relay Servers'.")
print()

"""
check wheter openvpn is installed !

"""
os.system('openvpn -v')


print('fetching data ...', end=" ")
r = requests.get('http://www.vpngate.net/api/iphone/')
if r.status_code == 403:
    print('vgpngate is blocked!')
    print('fetching data ... (from mirror list)', end="")
    r = requests.get('https://opengate-20.herokuapp.com/list')
print(" ")

print(r)