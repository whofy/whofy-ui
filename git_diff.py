import subprocess
import os

try:
    result = subprocess.run(['git', 'diff', 'c32ae30..42a834b'], capture_output=True, text=True, cwd=r'c:\Users\chara\Desktop\whofy\whofy-ui')
    print(result.stdout)
except Exception as e:
    print(e)
