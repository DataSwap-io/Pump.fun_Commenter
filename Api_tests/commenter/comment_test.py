import requests
from wonderwords import RandomSentence
import time
import random

rs = RandomSentence()

url = 'https://client-proxy-server.pump.fun/comment'
#url2 = 'https://client-proxy-server.pump.fun/'
#url3 = 'https://frontend-api-v3.pump.fun/auth/my-profile'


headers = {
    "Host": "client-proxy-server.pump.fun",

    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",

    "x-aws-proxy-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJIYVEzd3Y3MXlzNkt0cmFhU1RqOXhtaDNrQmdiUUpRbUFtcjc2Y0pOcGYzNSIsIm9yaWdpbiI6Ijg0Ljg1LjExNy44MyIsImlhdCI6MTczOTI4NjA4MCwiZXhwIjoxNzQxODc4MDgwfQ.GSp0jd_EN286DQoBczTxglYC_Vn4qbC0yw8_yWsZIyc",
    "x-aws-waf-token": "4dc0c5a4-4c65-4a79-b072-a63e8045093c:CQoAg4tpH5VDAAAA:RgUQHRJuxP0skVRmb6j0I7oQTV78VXmc041kvhTfW3u6czPvkZG/j9AaNXQ6vN0gxE8AC73HQMxamSaGc2tw6EqHe0nl70V0aJXDXDnyXIoihaFWk6LLPOoBewr0PIKAyhKU5jSMGppwiifnwBODB33v9tMfS0v/fKHiUcM7tv2tVeg4Dt7Hax94nQ+ErnNtYQObodNPMo8Fk3pnNi6HSG4p5xT3i1dkGvdiNGXx2iHjgP8ZhjBta8GgzMy3GLqLrSPI9D7t"
}



data = {
    "text":rs.bare_bone_with_adjective(),
    "mint":"DKNWuWctLp3sczz4Psaf8nviTPdy81wENgg6jb1ipump"
}


response = requests.post(url, json=data, headers=headers)


print(response.text)
print(response)






