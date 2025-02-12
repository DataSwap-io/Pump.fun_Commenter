import requests
import time

from solders.keypair import Keypair
from solders.signature import Signature
import base58
import json

def sign_message(message: str, private_key: bytes = None):
    """
    Sign a message using a Solana wallet with the Solders library
    
    Args:
        message (str): The message to sign
        private_key (bytes): Raw private key bytes. If None, generates new keypair
        
    Returns:
        dict: Contains public key, signature, and original message
    """
    # Create keypair from private key or generate new one
    if private_key:
        keypair = Keypair.from_bytes(private_key)
    else:
        keypair = Keypair()
    
    # Convert message to bytes and sign it
    message_bytes = bytes(message, 'utf-8')
    signature = keypair.sign_message(message_bytes)
    
    # Create result object
    result = {
        "public_key": str(keypair.pubkey()),
        "signature": str(signature),  # Solders handles base58 encoding
        "message": message
    }
    
    return result




cookies = {
    'fs_uid': '^#o-1YWTMD-na1^#488cd654-1427-4549-8781-65d79ae4c7c7:b2d179fd-95bb-4c3c-aac9-e6c3ec147568:1739285812036::1^#00e32f91^#/1770821815',
    '__cf_bm': 'mSoCbzFwA9edF4MqE9ArPdTSDqhPGIfUA2UkNZIIXIY-1739287912-1.0.1.1-UFstfs53_S9Rafs_wJb2e3sMjFtnv6uYUvNgPqAZZ4QNddNLu.J5yqITHxjNEuAacqo3y51CwQ12qsz9RRZNtQ',
    'dtCookieo4jkmc7x': 'v_4_srv_6_sn_783BB6DEB175564430DE8267C125E04E_perc_100000_ol_0_mul_1_app-3Ad06adcfae62e5e80_1',
    'fs_lua': '1.1739287913697',
    'cf_clearance': 'aLw3RC1GjSoJCHihygrHRUipnVlOotNCfLFu23ajsXo-1739285601-1.2.1.1-Yw4aGQp1GsHHboKSPR9R4vZIb.UfpsK6q55ORMKyJikihPmVskBwFwFTS5.2U4AN7935IN9ry087kcWfbQxP8LJf1I4Pus.1fy2aHjaWdXpDGSIRkWVB_DO0Pjvyh6vFiQUWznMluzNeV5aRS70FkcklKvgt.drR2YsWbSI0bsiedlg0V.YKHerb5MGzN.2M5wOOKLabdEItWPJ8Wtes6EEolGjblX9oMrYkp_aFuXE7OxE0EU6oQLStmqXFHMLzsLt4q6XIOt.NYI.KE12ogAzoPxmMEnxEvpZ9Y5T62Q4',
    '_fs_dwell_passed': '7640a329-5fe0-4c59-9e4e-8ae0e670f2f8',
    'aws-waf-token': 'ef279d14-5fc2-407e-82d7-f65fd878d01a:CQoAYddrkz9BAwAA:HD6+TJpoSFQGwtWqg0fILdSUClN77dOZH5JgVOKCDZqedm68PgC/764lIT6yEizMi1ziWYSJ5ymqJVQ0ZXQiL/Q41rG3t6xhFHeonJCkzjN3shAap9W3Va1mMloj2/iYou0ZyOMonhcDxal+tzsaOtz/77qlaW7Jmw/02tE6N4cNpKgMKphnueAnE2xDHlUJkx/Aa0ob4kTqMTskHspQXXOFffwGRHeA+Uxtrq9SfSa0dwtGy3pvrZcz9XSaTBd9vyrav5+X',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    # 'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Referer': 'https://pump.fun/',
    'Content-Type': 'application/json',
    'Origin': 'https://pump.fun',
    'Connection': 'keep-alive',
    # 'Cookie': 'fs_uid=^#o-1YWTMD-na1^#488cd654-1427-4549-8781-65d79ae4c7c7:b2d179fd-95bb-4c3c-aac9-e6c3ec147568:1739285812036::1^#00e32f91^#/1770821815; __cf_bm=mSoCbzFwA9edF4MqE9ArPdTSDqhPGIfUA2UkNZIIXIY-1739287912-1.0.1.1-UFstfs53_S9Rafs_wJb2e3sMjFtnv6uYUvNgPqAZZ4QNddNLu.J5yqITHxjNEuAacqo3y51CwQ12qsz9RRZNtQ; dtCookieo4jkmc7x=v_4_srv_6_sn_783BB6DEB175564430DE8267C125E04E_perc_100000_ol_0_mul_1_app-3Ad06adcfae62e5e80_1; fs_lua=1.1739287913697; cf_clearance=aLw3RC1GjSoJCHihygrHRUipnVlOotNCfLFu23ajsXo-1739285601-1.2.1.1-Yw4aGQp1GsHHboKSPR9R4vZIb.UfpsK6q55ORMKyJikihPmVskBwFwFTS5.2U4AN7935IN9ry087kcWfbQxP8LJf1I4Pus.1fy2aHjaWdXpDGSIRkWVB_DO0Pjvyh6vFiQUWznMluzNeV5aRS70FkcklKvgt.drR2YsWbSI0bsiedlg0V.YKHerb5MGzN.2M5wOOKLabdEItWPJ8Wtes6EEolGjblX9oMrYkp_aFuXE7OxE0EU6oQLStmqXFHMLzsLt4q6XIOt.NYI.KE12ogAzoPxmMEnxEvpZ9Y5T62Q4; _fs_dwell_passed=7640a329-5fe0-4c59-9e4e-8ae0e670f2f8; aws-waf-token=ef279d14-5fc2-407e-82d7-f65fd878d01a:CQoAYddrkz9BAwAA:HD6+TJpoSFQGwtWqg0fILdSUClN77dOZH5JgVOKCDZqedm68PgC/764lIT6yEizMi1ziWYSJ5ymqJVQ0ZXQiL/Q41rG3t6xhFHeonJCkzjN3shAap9W3Va1mMloj2/iYou0ZyOMonhcDxal+tzsaOtz/77qlaW7Jmw/02tE6N4cNpKgMKphnueAnE2xDHlUJkx/Aa0ob4kTqMTskHspQXXOFffwGRHeA+Uxtrq9SfSa0dwtGy3pvrZcz9XSaTBd9vyrav5+X',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'Priority': 'u=6',
    # Requests doesn't support trailers
    # 'TE': 'trailers',
}

timestamp = round(time.time())
msg = f'Sign in to pump.fun: {timestamp}'
signature = sign_message("msg" "4utZH7yWT3dJpDqPXLBVKuN1C4qHELfaxfoCQxPYyUwM6RJauQQDYgPYPo1SLmUhWQJ8qtFsC39u2h3JWrpUnuZx")["signature"]

print(f'Signature: {signature}')


#data = '{address:CLipWUuFDoAY9crTc4kPygkh8p1BGk77GmoHr8GbDDnW,signature:%s,timestamp:%s}' % (signature, timestamp)

data_json = {
    "address":"CLipWUuFDoAY9crTc4kPygkh8p1BGk77GmoHr8GbDDnW",
    "signature": signature,
    "timestamp": timestamp
}

#print(data)

response = requests.post('https://frontend-api-v3.pump.fun/auth/login', cookies=cookies, headers=headers, json=data_json)

print(response.json)
print(response.text)
print(response)
