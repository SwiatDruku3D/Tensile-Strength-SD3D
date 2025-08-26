import os
import shutil
from SCons.Script import Import

Import("env")

WEBAPP_DIR = os.path.join(os.getcwd(), "webapp")
DIST_DIR = os.path.join(WEBAPP_DIR, "dist")
DATA_DIR = os.path.join(os.getcwd(), "data")

def before_uploadfs(source, target, env):
    print(">>> Buduję webapp (React/Vite) <<<")
    if not os.path.exists(os.path.join(WEBAPP_DIR, "node_modules")):
        os.system(f"cd {WEBAPP_DIR} && npm install")
    os.system(f"cd {WEBAPP_DIR} && npm run build")

    print(">>> Kopiuję dist/ do data/ <<<")
    if os.path.exists(DATA_DIR):
        shutil.rmtree(DATA_DIR)
    shutil.copytree(DIST_DIR, DATA_DIR)

env.AddPreAction("uploadfs", before_uploadfs)
