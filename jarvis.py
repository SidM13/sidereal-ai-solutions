import os
import sys
import time
import json
import platform
import datetime
import subprocess
import webbrowser
from pathlib import Path

import requests
import pyautogui
import pyttsx3
import speech_recognition as sr
from openai import OpenAI

# =========================
# JARVIS SETTINGS
# =========================

ASSISTANT_NAME = "Jarvis"

# You can change this model later if needed.
MODEL_NAME = os.getenv("JARVIS_MODEL", "gpt-5.5")

VOICE_REPLY = True
USE_MICROPHONE = True
REQUIRE_CONFIRMATION = True

# =========================
# OPENAI CLIENT
# =========================

# IMPORTANT: Do NOT commit secrets. Set your OpenAI API key in the environment
# before running: export OPENAI_API_KEY="sk-..."
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    # Client will be created later when API key is available to avoid accidental leaks
    client = None
else:
    client = OpenAI(api_key=API_KEY)

# =========================
# TEXT TO SPEECH
# =========================

def setup_speaker():
    try:
        engine = pyttsx3.init()
        engine.setProperty("rate", 175)
        engine.setProperty("volume", 1.0)
        return engine
    except Exception as e:
        print(f"Voice engine error: {e}")
        return None

speaker = setup_speaker()

def speak(text: str) -> None:
    """Prints and optionally speaks the given text."""
    print(f"\n{ASSISTANT_NAME}: {text}\n")
    if VOICE_REPLY and speaker:
        try:
            speaker.say(text)
            speaker.runAndWait()
        except Exception:
            pass

# =========================
# SPEECH TO TEXT
# =========================

def listen() -> str:
    """Listens for user input via microphone and returns transcribed text."""
    recognizer = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            print("Listening... Speak now.")
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio = recognizer.listen(source, timeout=6, phrase_time_limit=12)

        print("Recognizing...")
        text = recognizer.recognize_google(audio, language="en-US")
        print(f"You said: {text}")
        return text
    except sr.WaitTimeoutError:
        print("No voice detected.")
        return ""
    except sr.UnknownValueError:
        print("I could not understand the audio.")
        return ""
    except Exception as e:
        print(f"Microphone error: {e}")
        return ""

# =========================
# SAFETY CONFIRMATION
# =========================

def confirm(action_text: str) -> bool:
    """Asks the user for confirmation before performing certain actions."""
    if not REQUIRE_CONFIRMATION:
        return True
    print(f"\nJarvis wants to do this action: {action_text}")
    answer = input("Allow? Type yes or no: ").strip().lower()
    return answer in ["yes", "y"]

# =========================
# COMPUTER CONTROL FUNCTIONS
# =========================

def open_website(url: str) -> str:
    """Opens the specified website in the default web browser."""
    if not url.startswith("http"):
        url = "https://" + url
    if confirm(f"Open website: {url}"):
        webbrowser.open(url)
        return f"Opening {url}"
    return "Action cancelled."

def google_search(query: str) -> str:
    """Performs a Google search for the given query."""
    url = "https://www.google.com/search?q=" + requests.utils.quote(query)
    if confirm(f"Search Google for: {query}"):
        webbrowser.open(url)
        return f"Searching Google for {query}"
    return "Action cancelled."

def youtube_search(query: str) -> str:
    """Performs a YouTube search for the given query."""
    url = "https://www.youtube.com/results?search_query=" + requests.utils.quote(query)
    if confirm(f"Search YouTube for: {query}"):
        webbrowser.open(url)
        return f"Searching YouTube for {query}"
    return "Action cancelled."

def open_app(app_name: str) -> str:
    """Opens an application based on platform-specific commands."""
    system_name = platform.system().lower()
    app_name_clean = app_name.strip().lower()
    windows_apps = {
        "notepad": "notepad.exe",
        "calculator": "calc.exe",
        "paint": "mspaint.exe",
        "cmd": "cmd.exe",
        "command prompt": "cmd.exe",
        "powershell": "powershell.exe",
        "chrome": "chrome.exe",
        "edge": "msedge.exe",
        "word": "winword.exe",
        "excel": "excel.exe",
        "powerpoint": "powerpnt.exe",
    }
    mac_apps = {
        "chrome": "Google Chrome",
        "safari": "Safari",
        "notes": "Notes",
        "calculator": "Calculator",
        "terminal": "Terminal",
        "word": "Microsoft Word",
        "excel": "Microsoft Excel",
        "powerpoint": "Microsoft PowerPoint",
    }
    if not confirm(f"Open app: {app_name}"):
        return "Action cancelled."
    try:
        if "windows" in system_name:
            app_command = windows_apps.get(app_name_clean, app_name)
            subprocess.Popen(app_command, shell=True)
            return f"Opening {app_name}"
        elif "darwin" in system_name:
            app_command = mac_apps.get(app_name_clean, app_name)
            subprocess.Popen(["open", "-a", app_command])
            return f"Opening {app_name}"
        else:
            subprocess.Popen([app_name])
            return f"Opening {app_name}"
    except Exception as e:
        return f"I could not open {app_name}. Error: {e}"

def take_screenshot() -> str:
    """Takes a screenshot and saves it to the user's desktop."""
    if not confirm("Take a screenshot"):
        return "Action cancelled."
    try:
        desktop = Path.home() / "Desktop"
        filename = desktop / f"jarvis_screenshot_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
        screenshot = pyautogui.screenshot()
        screenshot.save(filename)
        return f"Screenshot saved to Desktop as {filename.name}"
    except Exception as e:
        return f"Screenshot failed. Error: {e}"

def type_text(text: str) -> str:
    """Types the given text on the user's computer."""
    if not confirm(f"Type this text on your computer: {text}"):
        return "Action cancelled."
    try:
        time.sleep(2)
        pyautogui.write(text, interval=0.02)
        return "Text typed successfully."
    except Exception as e:
        return f"Typing failed. Error: {e}"

def press_hotkey(keys: str) -> str:
    """Presses a hotkey combination such as 'ctrl+s'."""
    if not confirm(f"Press hotkey: {keys}"):
        return "Action cancelled."
    try:
        key_list = [k.strip().lower() for k in keys.split("+")]
        pyautogui.hotkey(*key_list)
        return f"Pressed hotkey: {keys}"
    except Exception as e:
        return f"Hotkey failed. Error: {e}"

def get_time_date() -> str:
    """Returns a formatted string with the current date and time."""
    now = datetime.datetime.now()
    return now.strftime("Today is %A, %B %d, %Y. The time is %I:%M %p.")

# =========================
# COMMAND DETECTION
# =========================

def handle_local_command(user_input: str) -> str | None:
    """Parses and handles commands that do not require ChatGPT."""
    text = user_input.strip().lower()
    if text in ["exit", "quit", "stop", "bye", "goodbye"]:
        speak("Goodbye Siddharth. Jarvis is shutting down.")
        sys.exit(0)
    if text in ["help", "what can you do", "commands"]:
        return (
            """
Here are examples of what you can ask me:

1. Open Google
2. Open YouTube
3. Open Notepad
4. Search Google for best laptops in Canada
5. Search YouTube for Python tutorial
6. Take a screenshot
7. Type hello my name is Siddharth
8. Press ctrl+s
9. What is the time?
10. What is today's date?
11. What is the latest news about AI?
12. Explain this topic in Hindi
13. Translate this into English
14. Write an email for my professor
15. Help me with my assignment
"""
        )
    if "time" in text or "date" in text:
        return get_time_date()
    if text.startswith("open website "):
        url = user_input.replace("open website", "", 1).strip()
        return open_website(url)
    if text.startswith("open "):
        target = user_input.replace("open", "", 1).strip()
        common_sites = {
            "google": "https://www.google.com",
            "youtube": "https://www.youtube.com",
            "gmail": "https://mail.google.com",
            "chatgpt": "https://chatgpt.com",
            "linkedin": "https://www.linkedin.com",
            "github": "https://github.com",
            "facebook": "https://www.facebook.com",
            "instagram": "https://www.instagram.com",
            "amazon": "https://www.amazon.ca",
        }
        if target.lower() in common_sites:
            return open_website(common_sites[target.lower()])
        return open_app(target)
    if text.startswith("search google for "):
        query = user_input.replace("search google for", "", 1).strip()
        return google_search(query)
    if text.startswith("google "):
        query = user_input.replace("google", "", 1).strip()
        return google_search(query)
    if text.startswith("search youtube for "):
        query = user_input.replace("search youtube for", "", 1).strip()
        return youtube_search(query)
    if text.startswith("youtube "):
        query = user_input.replace("youtube", "", 1).strip()
        return youtube_search(query)
    if "screenshot" in text:
        return take_screenshot()
    if text.startswith("type "):
        content = user_input.replace("type", "", 1).strip()
        return type_text(content)
    if text.startswith("press "):
        keys = user_input.replace("press", "", 1).strip()
        return press_hotkey(keys)
    return None

# =========================
# CHATGPT RESPONSE
# =========================

def ask_chatgpt(user_input: str) -> str:
    """Uses the OpenAI API to get a response from ChatGPT."""
    if client is None:
        return "OpenAI client not configured. Set OPENAI_API_KEY in the environment to enable ChatGPT features."

    instructions = f"""
You are {ASSISTANT_NAME}, a helpful AI assistant for Siddharth's computer.

Rules:
- Reply clearly and naturally.
- Use the same language as the user when possible.
- If the user asks in English, reply in English.
- If the user asks in Hindi, Punjabi, Spanish, French, or another language, reply in that language.
- You can help with assignments, emails, explanations, coding, summaries, translations, planning, and real‑time questions.
- For real‑time/current questions, use web search when needed.
- Do not claim you performed computer actions unless the local Python program handled them.
- Keep answers concise unless the user asks for detail.
"""
    try:
        response = client.responses.create(
            model=MODEL_NAME,
            instructions=instructions,
            tools=[{"type": "web_search"}],
            input=user_input,
        )
        return response.output_text
    except Exception as e:
        return f"I had an API error: {e}"

# =========================
# MAIN PROGRAM
# =========================

def main() -> None:
    """The main loop for interacting with the user."""
    speak("Hello Siddharth. Jarvis is online. Say help to see what I can do.")
    while True:
        print("\nChoose input method:")
        print("1. Speak")
        print("2. Type")
        print("3. Exit")
        choice = input("Enter 1, 2, or 3: ").strip()
        if choice == "3":
            speak("Goodbye Siddharth.")
            break
        if choice == "1" and USE_MICROPHONE:
            user_input = listen()
            if not user_input:
                user_input = input("Type your command instead: ").strip()
        else:
            user_input = input("You: ").strip()
        if not user_input:
            continue
        local_result = handle_local_command(user_input)
        if local_result:
            speak(local_result)
        else:
            answer = ask_chatgpt(user_input)
            speak(answer)

if __name__ == "__main__":
    main()
